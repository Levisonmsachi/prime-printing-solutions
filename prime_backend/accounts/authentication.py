# accounts/authentication.py
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils import timezone
from .models import AdminSession, APIToken

class SessionTokenAuthentication(BaseAuthentication):
    """
    Custom authentication using session tokens
    """
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if not auth_header.startswith('Bearer '):
            return None

        token = auth_header[7:]

        try:
            # Try to find active session
            session = AdminSession.objects.select_related('user').get(
                session_token=token,
                is_active=True
            )

            # Update last activity
            session.last_activity = timezone.now()
            session.save()

            # Update profile last active
            if hasattr(session.user, 'admin_profile'):
                session.user.admin_profile.last_active = timezone.now()
                session.user.admin_profile.save()

            return (session.user, token)

        except AdminSession.DoesNotExist:
            # Try API token as fallback
            try:
                api_token = APIToken.objects.select_related('user').get(
                    token=token,
                    is_active=True
                )

                if not api_token.is_valid():
                    raise AuthenticationFailed('Token expired')

                # Update last used
                api_token.last_used = timezone.now()
                api_token.save()

                return (api_token.user, token)

            except APIToken.DoesNotExist:
                return None

    def authenticate_header(self, request):
        return 'Bearer'


class OptionalAuthentication(BaseAuthentication):
    """
    Authentication that returns None if no credentials are provided
    Useful for views that can be accessed by both authenticated and unauthenticated users
    """
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if not auth_header.startswith('Bearer '):
            return None

        token = auth_header[7:]

        try:
            session = AdminSession.objects.select_related('user').get(
                session_token=token,
                is_active=True
            )
            return (session.user, token)
        except AdminSession.DoesNotExist:
            try:
                api_token = APIToken.objects.select_related('user').get(
                    token=token,
                    is_active=True
                )
                if api_token.is_valid():
                    return (api_token.user, token)
            except APIToken.DoesNotExist:
                pass
        
        return None


class MultipleTokenAuthentication(BaseAuthentication):
    """
    Authentication that accepts multiple token formats
    Supports: Bearer <token> or Token <token>
    """
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if not auth_header:
            return None

        # Handle both 'Bearer' and 'Token' prefixes
        if auth_header.startswith('Bearer '):
            token = auth_header[7:]
        elif auth_header.startswith('Token '):
            token = auth_header[6:]
        else:
            return None

        # Try session authentication
        try:
            session = AdminSession.objects.select_related('user').get(
                session_token=token,
                is_active=True
            )
            session.last_activity = timezone.now()
            session.save()
            return (session.user, token)
        except AdminSession.DoesNotExist:
            pass

        # Try API token authentication
        try:
            api_token = APIToken.objects.select_related('user').get(
                token=token,
                is_active=True
            )
            if api_token.is_valid():
                api_token.last_used = timezone.now()
                api_token.save()
                return (api_token.user, token)
        except APIToken.DoesNotExist:
            pass

        return None


class APIKeyAuthentication(BaseAuthentication):
    """
    Simple API key authentication for external services
    Expects API key in X-API-Key header
    """
    def authenticate(self, request):
        api_key = request.META.get('HTTP_X_API_KEY')
        
        if not api_key:
            return None

        try:
            api_token = APIToken.objects.select_related('user').get(
                token=api_key,
                is_active=True
            )
            
            if not api_token.is_valid():
                raise AuthenticationFailed('API key expired')

            # Update last used
            api_token.last_used = timezone.now()
            api_token.save()

            return (api_token.user, api_key)

        except APIToken.DoesNotExist:
            return None

    def authenticate_header(self, request):
        return 'X-API-Key'