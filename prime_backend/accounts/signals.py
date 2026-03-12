# accounts/signals.py
from django.db.models.signals import post_save, pre_delete, post_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.utils import timezone
from .models import AdminProfile, AdminActionLog, APIToken, AdminSession, LoginAttempt

@receiver(post_save, sender=User)
def create_admin_profile(sender, instance, created, **kwargs):
    """
    Automatically create an AdminProfile when a new User is created
    Only for staff users, but can be created for any user if needed
    """
    if created:
        # Create profile for all users (you can filter for staff only if preferred)
        AdminProfile.objects.get_or_create(user=instance)
        
        # Log the creation if it's a staff user
        if instance.is_staff:
            AdminActionLog.objects.create(
                user=instance,
                action_type='CREATE',
                content_type='User',
                object_id=instance.id,
                object_repr=str(instance),
                description=f"New admin user created: {instance.username}",
                ip_address='system',  # System-generated
                user_agent='System'
            )


@receiver(post_save, sender=User)
def save_admin_profile(sender, instance, **kwargs):
    """
    Ensure profile is saved when user is saved
    """
    try:
        if hasattr(instance, 'admin_profile'):
            instance.admin_profile.save()
    except AdminProfile.DoesNotExist:
        # Create profile if it doesn't exist
        AdminProfile.objects.create(user=instance)


@receiver(pre_delete, sender=User)
def log_user_deletion(sender, instance, **kwargs):
    """
    Log when a user is about to be deleted
    """
    # Create a log entry before deletion
    AdminActionLog.objects.create(
        user=instance,  # This will be set to null due to on_delete=SET_NULL
        action_type='DELETE',
        content_type='User',
        object_id=instance.id,
        object_repr=str(instance),
        description=f"User deleted: {instance.username}",
        ip_address='system',
        user_agent='System'
    )


@receiver(post_save, sender=AdminProfile)
def log_profile_updates(sender, instance, created, **kwargs):
    """
    Log when admin profiles are updated
    """
    if not created:
        changed_fields = instance.tracker.changed()
        if changed_fields:
            # Convert datetime objects to strings for JSON serialization
            def convert_to_json_serializable(value):
                if hasattr(value, 'isoformat'):  # datetime objects
                    return value.isoformat()
                return value
            
            data_before = {}
            data_after = {}
            for field in changed_fields:
                data_before[field] = convert_to_json_serializable(instance.tracker.previous(field))
                data_after[field] = convert_to_json_serializable(getattr(instance, field))
            
            AdminActionLog.objects.create(
                user=instance.user,
                action_type='UPDATE',
                content_type='AdminProfile',
                object_id=instance.id,
                object_repr=str(instance),
                description=f"Profile updated. Changed fields: {', '.join(changed_fields.keys())}",
                data_before=data_before,
                data_after=data_after,
                ip_address='system',
                user_agent='System'
            )


@receiver(post_save, sender=APIToken)
def log_api_token_creation(sender, instance, created, **kwargs):
    """
    Log when API tokens are created
    """
    if created:
        AdminActionLog.objects.create(
            user=instance.user,
            action_type='CREATE',
            content_type='APIToken',
            object_id=instance.id,
            object_repr=instance.name,
            description=f"API token created: {instance.name}",
            ip_address='system',
            user_agent='System'
        )


@receiver(pre_delete, sender=APIToken)
def log_api_token_deletion(sender, instance, **kwargs):
    """
    Log when API tokens are deleted
    """
    AdminActionLog.objects.create(
        user=instance.user,
        action_type='DELETE',
        content_type='APIToken',
        object_id=instance.id,
        object_repr=instance.name,
        description=f"API token deleted: {instance.name}",
        ip_address='system',
        user_agent='System'
    )


@receiver(post_save, sender=AdminSession)
def log_session_creation(sender, instance, created, **kwargs):
    """
    Log when sessions are created
    """
    if created:
        AdminActionLog.objects.create(
            user=instance.user,
            action_type='CREATE',
            content_type='AdminSession',
            object_id=instance.id,
            object_repr=f"Session from {instance.ip_address}",
            description=f"New session created from {instance.ip_address}",
            ip_address=instance.ip_address,
            user_agent=instance.user_agent
        )


@receiver(post_delete, sender=AdminSession)
def log_session_deletion(sender, instance, **kwargs):
    """
    Log when sessions are deleted
    """
    AdminActionLog.objects.create(
        user=instance.user,
        action_type='DELETE',
        content_type='AdminSession',
        object_id=instance.id,
        object_repr=f"Session from {instance.ip_address}",
        description=f"Session ended from {instance.ip_address}",
        ip_address=instance.ip_address,
        user_agent=instance.user_agent
    )


# Optional: Signal to clean up old sessions/tokens
@receiver(post_save, sender=User)
def cleanup_user_sessions(sender, instance, **kwargs):
    """
    When a user is deactivated, end all their sessions
    """
    if not instance.is_active:
        # End all active sessions
        AdminSession.objects.filter(user=instance, is_active=True).update(
            is_active=False,
            logout_time=timezone.now()
        )
        
        # Deactivate API tokens
        APIToken.objects.filter(user=instance, is_active=True).update(is_active=False)


# Optional: Signal for login attempt monitoring
@receiver(post_save, sender=LoginAttempt)
def check_suspicious_activity(sender, instance, created, **kwargs):
    """
    Check for suspicious login patterns
    """
    if created and not instance.was_successful:
        # Check for multiple failed attempts from same IP
        from django.utils import timezone
        from datetime import timedelta
        
        recent_failures = LoginAttempt.objects.filter(
            ip_address=instance.ip_address,
            was_successful=False,
            timestamp__gte=timezone.now() - timedelta(minutes=30)
        ).count()
        
        if recent_failures >= 5:
            # Log suspicious activity
            AdminActionLog.objects.create(
                user=None,
                action_type='VIEW',
                content_type='Security',
                description=f"Suspicious activity: {recent_failures} failed logins from IP {instance.ip_address}",
                ip_address=instance.ip_address,
                user_agent=instance.user_agent
            )