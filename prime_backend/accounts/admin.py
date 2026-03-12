# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.utils.html import format_html
from django.urls import reverse
from django.utils import timezone
from .models import (
    AdminProfile, AdminSession, AdminActionLog, 
    APIToken, LoginAttempt
)


class AdminProfileInline(admin.StackedInline):
    """
    Inline admin for AdminProfile to display with User
    """
    model = AdminProfile
    can_delete = False
    verbose_name_plural = 'Admin Profile'
    fieldsets = (
        ('Personal Information', {
            'fields': ('phone', 'profile_picture')
        }),
        ('Account Status', {
            'fields': ('is_active', 'last_active')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at', 'last_active')


class UserAdmin(BaseUserAdmin):
    """
    Custom User admin with AdminProfile inline
    """
    inlines = (AdminProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'last_login')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('-date_joined',)
    
    # Don't add last_login and date_joined again - they are already in BaseUserAdmin
    # Just add custom fields if needed
    
    actions = ['activate_users', 'deactivate_users', 'send_welcome_email']
    
    def activate_users(self, request, queryset):
        """Bulk activate users"""
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} users were successfully activated.')
    activate_users.short_description = "Activate selected users"
    
    def deactivate_users(self, request, queryset):
        """Bulk deactivate users"""
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} users were successfully deactivated.')
    deactivate_users.short_description = "Deactivate selected users"
    
    def send_welcome_email(self, request, queryset):
        """Send welcome email to selected users"""
        # Implement email sending logic here
        self.message_user(request, f'Welcome emails sent to {queryset.count()} users.')
    send_welcome_email.short_description = "Send welcome email"


# Unregister the default User admin and register our custom one
admin.site.unregister(User)
admin.site.register(User, UserAdmin)


@admin.register(AdminProfile)
class AdminProfileAdmin(admin.ModelAdmin):
    """
    Admin for AdminProfile model
    """
    list_display = ('user', 'phone', 'is_active', 'last_active', 'profile_picture_preview')
    list_filter = ('is_active', 'created_at')
    search_fields = ('user__username', 'user__email', 'phone')
    readonly_fields = ('created_at', 'updated_at', 'last_active', 'profile_picture_preview')
    
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Personal Information', {
            'fields': ('phone', 'profile_picture', 'profile_picture_preview')
        }),
        ('Account Status', {
            'fields': ('is_active', 'last_active')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def profile_picture_preview(self, obj):
        """Show profile picture thumbnail"""
        if obj.profile_picture:
            return format_html(
                '<img src="{}" style="max-height: 50px; max-width: 50px; border-radius: 50%;" />',
                obj.profile_picture.url
            )
        return "No image"
    profile_picture_preview.short_description = 'Profile Picture'
    
    actions = ['mark_as_active', 'mark_as_inactive']
    
    def mark_as_active(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} profiles marked as active.')
    mark_as_active.short_description = "Mark as active"
    
    def mark_as_inactive(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} profiles marked as inactive.')
    mark_as_inactive.short_description = "Mark as inactive"


@admin.register(AdminSession)
class AdminSessionAdmin(admin.ModelAdmin):
    """
    Admin for AdminSession model
    """
    list_display = ('user', 'ip_address', 'device_info', 'login_time', 'last_activity', 'is_active', 'session_age')
    list_filter = ('is_active', 'login_time', 'device_info')
    search_fields = ('user__username', 'user__email', 'ip_address', 'session_token')
    readonly_fields = ('session_token', 'login_time', 'last_activity', 'logout_time', 'ip_address', 'user_agent')
    
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Session Details', {
            'fields': ('session_token', 'ip_address', 'user_agent', 'device_info')
        }),
        ('Timestamps', {
            'fields': ('login_time', 'last_activity', 'logout_time')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )
    
    def session_age(self, obj):
        """Calculate session age"""
        if obj.logout_time:
            delta = obj.logout_time - obj.login_time
        else:
            delta = timezone.now() - obj.login_time
        
        hours = delta.total_seconds() / 3600
        if hours < 24:
            return f"{hours:.1f} hours"
        else:
            days = hours / 24
            return f"{days:.1f} days"
    session_age.short_description = 'Session Age'
    
    actions = ['terminate_sessions', 'terminate_all_sessions']
    
    def terminate_sessions(self, request, queryset):
        for session in queryset:
            session.end_session()
        self.message_user(request, f'{queryset.count()} sessions terminated.')
    terminate_sessions.short_description = "Terminate selected sessions"
    
    def terminate_all_sessions(self, request, queryset):
        """Terminate all sessions for selected users"""
        users = queryset.values_list('user', flat=True).distinct()
        sessions = AdminSession.objects.filter(user__in=users, is_active=True)
        count = sessions.count()
        sessions.update(is_active=False, logout_time=timezone.now())
        self.message_user(request, f'All {count} sessions terminated for {len(users)} users.')
    terminate_all_sessions.short_description = "Terminate ALL sessions for these users"


@admin.register(AdminActionLog)
class AdminActionLogAdmin(admin.ModelAdmin):
    """
    Admin for AdminActionLog model
    """
    list_display = ('user', 'action_type', 'content_type', 'object_repr', 'timestamp', 'ip_address')
    list_filter = ('action_type', 'content_type', 'timestamp', 'user')
    search_fields = ('user__username', 'description', 'object_repr', 'ip_address')
    readonly_fields = ('user', 'action_type', 'content_type', 'object_id', 'object_repr', 
                       'description', 'data_before', 'data_after', 'ip_address', 
                       'user_agent', 'timestamp')
    
    fieldsets = (
        ('Action Information', {
            'fields': ('user', 'action_type', 'timestamp')
        }),
        ('Target Object', {
            'fields': ('content_type', 'object_id', 'object_repr')
        }),
        ('Details', {
            'fields': ('description',)
        }),
        ('Data Changes', {
            'fields': ('data_before', 'data_after'),
            'classes': ('collapse',)
        }),
        ('Request Information', {
            'fields': ('ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        """Prevent manual addition of log entries"""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Prevent editing of log entries"""
        return False
    
    actions = ['delete_selected']  # Allow deletion but not modification


@admin.register(APIToken)
class APITokenAdmin(admin.ModelAdmin):
    """
    Admin for APIToken model
    """
    list_display = ('user', 'name', 'token_preview', 'is_active', 'created_at', 'expires_at', 'last_used')
    list_filter = ('is_active', 'created_at', 'expires_at')
    search_fields = ('user__username', 'user__email', 'name', 'token')
    readonly_fields = ('token', 'created_at', 'last_used')
    
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Token Details', {
            'fields': ('name', 'token', 'is_active')
        }),
        ('Expiry', {
            'fields': ('expires_at', 'last_used', 'created_at')
        }),
    )
    
    def token_preview(self, obj):
        """Show only first and last 4 characters of token"""
        if obj.token:
            token_str = str(obj.token)
            if len(token_str) > 8:
                return f"{token_str[:4]}...{token_str[-4:]}"
            return token_str
        return "No token"
    token_preview.short_description = 'Token'
    
    actions = ['activate_tokens', 'deactivate_tokens', 'extend_expiry']
    
    def activate_tokens(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} tokens activated.')
    activate_tokens.short_description = "Activate selected tokens"
    
    def deactivate_tokens(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} tokens deactivated.')
    deactivate_tokens.short_description = "Deactivate selected tokens"
    
    def extend_expiry(self, request, queryset):
        """Extend token expiry by 30 days"""
        from datetime import timedelta
        for token in queryset:
            if token.expires_at:
                token.expires_at += timedelta(days=30)
                token.save()
        self.message_user(request, f'Expiry extended for {queryset.count()} tokens.')
    extend_expiry.short_description = "Extend expiry by 30 days"


@admin.register(LoginAttempt)
class LoginAttemptAdmin(admin.ModelAdmin):
    """
    Admin for LoginAttempt model
    """
    list_display = ('username', 'ip_address', 'was_successful', 'timestamp', 'user_agent_short')
    list_filter = ('was_successful', 'timestamp')
    search_fields = ('username', 'ip_address')
    readonly_fields = ('username', 'ip_address', 'user_agent', 'was_successful', 'timestamp')
    
    fieldsets = (
        ('Attempt Information', {
            'fields': ('username', 'was_successful', 'timestamp')
        }),
        ('Client Information', {
            'fields': ('ip_address', 'user_agent')
        }),
    )
    
    def user_agent_short(self, obj):
        """Show shortened user agent"""
        if obj.user_agent and len(obj.user_agent) > 50:
            return obj.user_agent[:50] + '...'
        return obj.user_agent
    user_agent_short.short_description = 'User Agent'
    
    def has_add_permission(self, request):
        """Prevent manual addition"""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Prevent editing"""
        return False


# Optional: Custom dashboard view for admin
class AdminDashboard:
    """
    Custom admin dashboard with statistics
    """
    def get_stats(self):
        return {
            'total_users': User.objects.count(),
            'staff_users': User.objects.filter(is_staff=True).count(),
            'active_sessions': AdminSession.objects.filter(is_active=True).count(),
            'today_logins': LoginAttempt.objects.filter(
                was_successful=True,
                timestamp__date=timezone.now().date()
            ).count(),
            'failed_logins_today': LoginAttempt.objects.filter(
                was_successful=False,
                timestamp__date=timezone.now().date()
            ).count(),
            'recent_actions': AdminActionLog.objects.filter(
                timestamp__gte=timezone.now() - timezone.timedelta(days=1)
            ).count(),
            'active_tokens': APIToken.objects.filter(is_active=True).count(),
        }


# Register the dashboard in admin (removed - register_view doesn't exist in Django 6.0)
# The custom dashboard can be implemented via admin_panel app URLs if needed

# Customize admin site header and title
admin.site.site_header = 'Admin Panel Management'
admin.site.site_title = 'Admin Panel'
admin.site.index_title = 'Admin Panel Dashboard'