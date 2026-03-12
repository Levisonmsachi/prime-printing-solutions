"""
Admin Panel Permissions
Custom permissions for admin API access
"""
from rest_framework.permissions import BasePermission, IsAuthenticated, IsAdminUser


class IsAdminOrReadOnly(BasePermission):
    """
    Allows read access to any user, but write access only to admin users.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any request
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        
        # Write permissions only for authenticated admin users
        return request.user and request.user.is_staff


class IsSuperUser(BasePermission):
    """
    Allows access only to superusers.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser


class AdminPanelPermissions(BasePermission):
    """
    Comprehensive permission class for admin panel.
    - GET (list/retrieve): Any authenticated user
    - POST/PUT/PATCH/DELETE: Only admin users (is_staff=True)
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        # Allow all authenticated users to read
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        
        # Only staff users can modify
        return request.user.is_staff
    
    def has_object_permission(self, request, view, obj):
        # Admin users can do anything
        if request.user.is_staff:
            return True
        
        return False

