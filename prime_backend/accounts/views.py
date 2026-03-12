# accounts/views.py
from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models import Count, Q
import hashlib
import uuid
from datetime import timedelta

from .models import (
    AdminProfile, AdminSession, AdminActionLog, APIToken,
    LoginAttempt
)
from .serializers import (
    UserSerializer, UserCreateSerializer, UserUpdateSerializer,
    ChangePasswordSerializer, AdminProfileSerializer, AdminProfileUpdateSerializer,
    AdminSessionSerializer, AdminActionLogSerializer, APITokenSerializer,
    LoginAttemptSerializer, LoginSerializer
)
from .permissions import IsAdminUser
from .authentication import SessionTokenAuthentication


# ==================== AUTHENTICATION VIEWS ====================

class LoginView(APIView):
    """
    Admin login endpoint with session tracking
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        remember_me = serializer.validated_data.get('remember_me', False)

        # Get client info
        ip_address = self.get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')

        # Authenticate user
        user = authenticate(username=username, password=password)

        # Log the attempt
        LoginAttempt.objects.create(
            username=username,
            ip_address=ip_address,
            user_agent=user_agent,
            was_successful=user is not None
        )

        if user is None or not user.is_staff:
            return Response(
                {'error': 'Invalid credentials or insufficient permissions'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Check if user is active
        try:
            profile = user.admin_profile
            if not profile.is_active:
                return Response(
                    {'error': 'Account is disabled'},
                    status=status.HTTP_403_FORBIDDEN
                )
        except AdminProfile.DoesNotExist:
            # Create profile if it doesn't exist
            profile = AdminProfile.objects.create(user=user)

        # Complete login
        return self.complete_login(request, user, remember_me, ip_address, user_agent)

    def complete_login(self, request, user, remember_me, ip_address, user_agent):
        """Complete the login process"""
        # Generate session token
        session_token = hashlib.sha256(
            f"{user.username}{timezone.now()}{uuid.uuid4()}".encode()
        ).hexdigest()

        # Create session record
        session = AdminSession.objects.create(
            user=user,
            session_token=session_token,
            ip_address=ip_address,
            user_agent=user_agent,
            device_info=self.get_device_info(user_agent)
        )

        # Update last active
        profile = user.admin_profile
        profile.last_active = timezone.now()
        profile.save()

        # Log the action
        AdminActionLog.objects.create(
            user=user,
            action_type='LOGIN',
            content_type='Auth',
            description=f"User logged in from {ip_address}",
            ip_address=ip_address,
            user_agent=user_agent
        )

        # Set token expiry
        expiry = timezone.now() + timedelta(days=30 if remember_me else 1)

        response_data = {
            'success': True,
            'token': session_token,
            'user': UserSerializer(user).data,
            'session_id': session.id,
            'expires_in': int(expiry.timestamp()),
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR', '')

    def get_device_info(self, user_agent):
        if 'Mobile' in user_agent:
            return 'Mobile Device'
        elif 'Tablet' in user_agent:
            return 'Tablet'
        else:
            return 'Desktop'


class LogoutView(APIView):
    """
    Admin logout endpoint
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if auth_header.startswith('Bearer '):
            token = auth_header[7:]

            try:
                session = AdminSession.objects.get(session_token=token, is_active=True)
                session.end_session()

                AdminActionLog.objects.create(
                    user=request.user,
                    action_type='LOGOUT',
                    content_type='Auth',
                    description="User logged out",
                    ip_address=self.get_client_ip(request),
                    user_agent=request.META.get('HTTP_USER_AGENT', '')
                )
            except AdminSession.DoesNotExist:
                pass

        logout(request)
        return Response({'success': True, 'message': 'Logged out successfully'})

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR', '')


class CheckAuthView(APIView):
    """
    Check if user is authenticated and get current user info
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Update last activity
        try:
            session = AdminSession.objects.get(
                user=request.user,
                session_token=request.auth,
                is_active=True
            )
            session.last_activity = timezone.now()
            session.save()

            profile = request.user.admin_profile
            profile.last_active = timezone.now()
            profile.save()
        except (AdminSession.DoesNotExist, AdminProfile.DoesNotExist):
            pass

        return Response({
            'authenticated': True,
            'user': UserSerializer(request.user).data,
            'profile': AdminProfileSerializer(request.user.admin_profile).data if hasattr(request.user, 'admin_profile') else None
        })


# ==================== USER MANAGEMENT VIEWS ====================

class UserListView(generics.ListCreateAPIView):
    """
    List and create users (admin only)
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAdminUser]
    queryset = User.objects.all().order_by('-date_joined')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        return UserSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user (admin only)
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserUpdateSerializer
        return UserSerializer

    def perform_destroy(self, instance):
        AdminActionLog.objects.create(
            user=self.request.user,
            action_type='DELETE',
            content_type='User',
            object_id=instance.id,
            object_repr=str(instance),
            description=f"Deleted user: {instance.username}",
            ip_address=self.get_client_ip(self.request)
        )
        instance.delete()

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR', '')


class ChangePasswordView(APIView):
    """
    Change user password
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {'old_password': 'Wrong password'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(serializer.validated_data['new_password'])
        user.save()

        AdminActionLog.objects.create(
            user=user,
            action_type='UPDATE',
            content_type='User',
            object_id=user.id,
            object_repr=str(user),
            description="Password changed",
            ip_address=self.get_client_ip(request)
        )

        return Response({'success': True, 'message': 'Password updated successfully'})

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR', '')


# ==================== PROFILE VIEWS ====================

class AdminProfileView(APIView):
    """
    Get and update current user's admin profile
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.admin_profile
        except AdminProfile.DoesNotExist:
            profile = AdminProfile.objects.create(user=request.user)

        serializer = AdminProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        try:
            profile = request.user.admin_profile
        except AdminProfile.DoesNotExist:
            profile = AdminProfile.objects.create(user=request.user)

        serializer = AdminProfileUpdateSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            AdminActionLog.objects.create(
                user=request.user,
                action_type='UPDATE',
                content_type='AdminProfile',
                object_id=profile.id,
                description="Profile updated",
                ip_address=self.get_client_ip(request)
            )

            return Response(AdminProfileSerializer(profile).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR', '')


# ==================== SESSION MANAGEMENT ====================

class UserSessionsView(generics.ListAPIView):
    """
    List sessions for current user
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = AdminSessionSerializer

    def get_queryset(self):
        return AdminSession.objects.filter(
            user=self.request.user
        ).order_by('-login_time')


class TerminateSessionView(APIView):
    """
    Terminate a specific session
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, session_id):
        try:
            session = AdminSession.objects.get(id=session_id)

            if session.user != request.user and not request.user.is_staff:
                return Response(
                    {'error': 'Permission denied'},
                    status=status.HTTP_403_FORBIDDEN
                )

            session.end_session()

            AdminActionLog.objects.create(
                user=request.user,
                action_type='UPDATE',
                content_type='AdminSession',
                object_id=session.id,
                description=f"Session terminated for {session.user.username}",
                ip_address=self.get_client_ip(request)
            )

            return Response({'success': True, 'message': 'Session terminated'})

        except AdminSession.DoesNotExist:
            return Response(
                {'error': 'Session not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR', '')


class TerminateAllSessionsView(APIView):
    """
    Terminate all sessions for current user except current one
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_token = request.auth

        sessions = AdminSession.objects.filter(
            user=request.user,
            is_active=True
        ).exclude(session_token=current_token)

        count = sessions.count()
        for session in sessions:
            session.end_session()

        AdminActionLog.objects.create(
            user=request.user,
            action_type='UPDATE',
            content_type='AdminSession',
            description=f"Terminated {count} other sessions",
            ip_address=self.get_client_ip(request)
        )

        return Response({
            'success': True,
            'message': f'Terminated {count} other sessions'
        })

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR', '')


# ==================== API TOKEN MANAGEMENT ====================

class APITokenViewSet(viewsets.ModelViewSet):
    """
    ViewSet for API token management
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = APITokenSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return APIToken.objects.all()
        return APIToken.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        token = serializer.save(user=self.request.user)
        
        AdminActionLog.objects.create(
            user=self.request.user,
            action_type='CREATE',
            content_type='APIToken',
            object_id=token.id,
            object_repr=token.name,
            description=f"Created API token: {token.name}",
            ip_address=self.get_client_ip(self.request)
        )

    def perform_destroy(self, instance):
        AdminActionLog.objects.create(
            user=self.request.user,
            action_type='DELETE',
            content_type='APIToken',
            object_id=instance.id,
            object_repr=instance.name,
            description=f"Deleted API token: {instance.name}",
            ip_address=self.get_client_ip(self.request)
        )
        instance.delete()

    @action(detail=True, methods=['post'])
    def regenerate(self, request, pk=None):
        """Regenerate token value"""
        token = self.get_object()
        token.token = uuid.uuid4()
        token.save()

        AdminActionLog.objects.create(
            user=request.user,
            action_type='UPDATE',
            content_type='APIToken',
            object_id=token.id,
            object_repr=token.name,
            description="Regenerated API token",
            ip_address=self.get_client_ip(request)
        )

        return Response(APITokenSerializer(token).data)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR', '')


# ==================== AUDIT LOG VIEWS ====================

class AdminActionLogListView(generics.ListAPIView):
    """
    List admin action logs (admin only)
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAdminUser]
    serializer_class = AdminActionLogSerializer

    def get_queryset(self):
        queryset = AdminActionLog.objects.all().order_by('-timestamp')

        # Filter by user
        user_id = self.request.query_params.get('user_id')
        if user_id:
            queryset = queryset.filter(user_id=user_id)

        # Filter by action type
        action_type = self.request.query_params.get('action_type')
        if action_type:
            queryset = queryset.filter(action_type=action_type)

        # Filter by date range
        start_date = self.request.query_params.get('start_date')
        if start_date:
            queryset = queryset.filter(timestamp__date__gte=start_date)

        end_date = self.request.query_params.get('end_date')
        if end_date:
            queryset = queryset.filter(timestamp__date__lte=end_date)

        return queryset


# ==================== DASHBOARD VIEWS ====================

class AdminDashboardView(APIView):
    """
    Get admin dashboard statistics
    """
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Basic stats
        total_admins = User.objects.filter(is_staff=True).count()
        active_sessions = AdminSession.objects.filter(is_active=True).count()
        recent_logins = LoginAttempt.objects.filter(
            was_successful=True,
            timestamp__gte=timezone.now() - timedelta(days=1)
        ).count()
        failed_logins = LoginAttempt.objects.filter(
            was_successful=False,
            timestamp__gte=timezone.now() - timedelta(hours=24)
        ).count()

        # Get counts from other apps
        try:
            from contactpage.models import ContactMessage
            pending_messages = ContactMessage.objects.filter(is_read=False).count()
        except:
            pending_messages = 0

        try:
            from quotes.models import QuoteRequest
            pending_quotes = QuoteRequest.objects.filter(status='pending').count()
        except:
            pending_quotes = 0

        return Response({
            'total_admins': total_admins,
            'active_sessions': active_sessions,
            'recent_logins': recent_logins,
            'failed_logins_24h': failed_logins,
            'pending_messages': pending_messages,
            'pending_quotes': pending_quotes,
            'last_activity': timezone.now()
        })