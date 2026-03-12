# accounts/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

# Field change tracking
from model_utils import FieldTracker


class AdminProfile(models.Model):
    """
    Extended profile information for admin users
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')
    
    # Personal Information
    phone = models.CharField(max_length=20, blank=True)
    profile_picture = models.ImageField(upload_to='admin_profiles/', null=True, blank=True)
    
    # Account Status
    is_active = models.BooleanField(default=True)
    last_active = models.DateTimeField(null=True, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Field tracker for change logging
    tracker = FieldTracker()
    
    class Meta:
        verbose_name = 'Admin Profile'
        verbose_name_plural = 'Admin Profiles'
    
    def __str__(self):
        return f"{self.user.username}'s Profile"


class AdminSession(models.Model):
    """
    Track admin user sessions for security monitoring
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='admin_sessions')
    session_token = models.CharField(max_length=255, unique=True)
    
    # Session info
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    device_info = models.CharField(max_length=255, blank=True)
    
    # Timestamps
    login_time = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    logout_time = models.DateTimeField(null=True, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = 'Admin Session'
        verbose_name_plural = 'Admin Sessions'
        ordering = ['-login_time']
    
    def __str__(self):
        return f"{self.user.username} - {self.login_time}"
    
    def end_session(self):
        """End this session"""
        self.is_active = False
        self.logout_time = timezone.now()
        self.save()


class AdminActionLog(models.Model):
    """
    Audit log for all admin actions
    """
    ACTION_TYPES = [
        ('CREATE', 'Create'),
        ('UPDATE', 'Update'),
        ('DELETE', 'Delete'),
        ('LOGIN', 'Login'),
        ('LOGOUT', 'Logout'),
        ('VIEW', 'View'),
        ('EXPORT', 'Export'),
        ('IMPORT', 'Import'),
        ('SETTINGS', 'Settings Change'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='action_logs')
    action_type = models.CharField(max_length=20, choices=ACTION_TYPES)
    
    # What was affected
    content_type = models.CharField(max_length=100)  # e.g., 'Service', 'PortfolioProject'
    object_id = models.CharField(max_length=50, blank=True)
    object_repr = models.CharField(max_length=200, blank=True)
    
    # Details
    description = models.TextField()
    data_before = models.JSONField(null=True, blank=True)
    data_after = models.JSONField(null=True, blank=True)
    
    # Request info
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    
    # Timestamp
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Admin Action Log'
        verbose_name_plural = 'Admin Action Logs'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user', '-timestamp']),
            models.Index(fields=['action_type']),
            models.Index(fields=['content_type', 'object_id']),
        ]
    
    def __str__(self):
        return f"{self.user} - {self.action_type} - {self.timestamp}"


class APIToken(models.Model):
    """
    Custom API tokens for admin access
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='api_tokens')
    token = models.CharField(max_length=64, unique=True, default=uuid.uuid4)
    name = models.CharField(max_length=100, help_text="e.g., 'Mobile App', 'Integration'")
    
    # Expiry
    expires_at = models.DateTimeField(null=True, blank=True)
    last_used = models.DateTimeField(null=True, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'API Token'
        verbose_name_plural = 'API Tokens'
    
    def __str__(self):
        return f"{self.user.username} - {self.name}"
    
    def is_valid(self):
        """Check if token is valid and not expired"""
        if not self.is_active:
            return False
        if self.expires_at and self.expires_at < timezone.now():
            return False
        return True


class LoginAttempt(models.Model):
    """
    Track login attempts for security
    """
    username = models.CharField(max_length=150)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    
    # Attempt info
    was_successful = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Login Attempt'
        verbose_name_plural = 'Login Attempts'
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.username} - {self.ip_address} - {self.timestamp}"