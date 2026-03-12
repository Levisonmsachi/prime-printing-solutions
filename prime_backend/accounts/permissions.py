# accounts/permissions.py
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework import permissions


class IsPublicUser(BasePermission):
    """
    Permission for public users (unauthenticated) to perform safe operations
    like viewing content, submitting contact forms, requesting quotes.
    """
    def has_permission(self, request, view):
        # Allow unauthenticated users to:
        # - View content (GET, HEAD, OPTIONS)
        # - Submit forms (POST for contact, quote requests)
        if request.method in SAFE_METHODS + ('POST',):
            # For POST, we need to check if it's a public submission endpoint
            if request.method == 'POST':
                # List of public POST endpoints
                public_post_paths = [
                    '/api/contact/messages/',
                    '/api/quotes/',
                    '/api/newsletter/subscribe/',
                ]
                # Check if the request path matches any public endpoint
                path = request.path
                return any(path.endswith(endpoint) for endpoint in public_post_paths)
            return True
        return False


class IsAdminUser(BasePermission):
    """
    Allows access only to admin users (staff or superuser)
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)

    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_staff)


class IsAdminOrReadOnlyForPublic(BasePermission):
    """
    - Public users: Can view content and submit forms
    - Admin users: Full CRUD operations
    """
    def has_permission(self, request, view):
        # Always allow GET, HEAD, OPTIONS for everyone
        if request.method in SAFE_METHODS:
            return True
        
        # Allow POST for contact/quote submissions from public
        if request.method == 'POST':
            # Get the view name or path to determine if it's a public submission
            view_name = getattr(view, 'get_view_name', lambda: '')()
            path = request.path
            
            # Public submission endpoints
            if any([
                'contact' in path and 'message' in path,
                'quotes' in path,
                'newsletter' in path,
            ]):
                return True
        
        # All other operations require admin authentication
        return request.user and request.user.is_staff

    def has_object_permission(self, request, view, obj):
        # Object-level permissions only matter for non-safe methods
        if request.method in SAFE_METHODS:
            return True
        
        # For modifications, only admin users
        return request.user and request.user.is_staff


class CanManageContent(BasePermission):
    """
    Granular permission for different content types
    Useful if you want different admins to manage different sections
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        # Superusers can do everything
        if request.user.is_superuser:
            return True
        
        # Get the content type from the view
        content_type = getattr(view, 'content_type', None)
        
        # Map view names to permission requirements
        content_permissions = {
            'homepage': request.user.has_perm('homepage.can_edit'),
            'about': request.user.has_perm('aboutpage.can_edit'),
            'services': request.user.has_perm('servicespage.can_edit'),
            'portfolio': request.user.has_perm('portfoliopage.can_edit'),
            'contact': request.user.has_perm('contactpage.can_edit'),
            'certifications': request.user.has_perm('certifications.can_edit'),
            'quotes': request.user.has_perm('quotes.can_manage'),
        }
        
        if content_type in content_permissions:
            return content_permissions[content_type]
        
        # Default to staff access
        return request.user.is_staff


class IsContentOwnerOrAdmin(BasePermission):
    """
    For user-submitted content (messages, quotes) - 
    Admins can see all, users can only see their own
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True
        
        # For public users, check if they own the object
        # This would require storing session ID or user identifier
        if hasattr(obj, 'session_key'):
            return obj.session_key == request.session.session_key
        
        return False


# Combined permission classes for viewsets
class PublicViewPermission(BasePermission):
    """
    For public-facing views: Anyone can view, only admins can modify
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class PublicSubmissionPermission(BasePermission):
    """
    For contact forms and quote requests: Anyone can submit, only admins can view/list
    """
    def has_permission(self, request, view):
        # Allow POST for anyone (submitting forms)
        if request.method == 'POST':
            return True
        
        # For other methods (GET, PUT, DELETE), require admin
        if request.method in SAFE_METHODS:
            return request.user and request.user.is_staff
        
        return request.user and request.user.is_staff


class AdminOnlyPermission(BasePermission):
    """
    Strict admin-only access for sensitive operations
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

    def has_object_permission(self, request, view, obj):
        return request.user and request.user.is_staff


# Example of a custom permission for specific actions
class CanExportData(BasePermission):
    """
    Permission for exporting data (requires superuser)
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser


# For API key authentication (if you have external services)
class HasAPIKey(BasePermission):
    """
    Permission for API key authenticated requests
    """
    def has_permission(self, request, view):
        api_key = request.headers.get('X-API-Key')
        if not api_key:
            return False
        
        # Validate API key
        from .models import APIToken
        try:
            token = APIToken.objects.get(token=api_key, is_active=True)
            if token.is_valid():
                # You could attach the token to request for later use
                request.api_token = token
                return True
        except APIToken.DoesNotExist:
            pass
        
        return False