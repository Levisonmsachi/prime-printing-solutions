from django.contrib import admin
from .models import (
    ContactPageIntro,
    ContactInfo,
    OfficeLocation,
    ContactMessage,
    ContactFormSettings,
    ContactCTA,
    ContactPageSection,
)


@admin.register(ContactPageIntro)
class ContactPageIntroAdmin(admin.ModelAdmin):
    list_display = ["title", "is_active", "updated_at"]
    list_editable = ["is_active"]
    search_fields = ["title", "subtitle"]


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ["phone", "email", "is_active"]
    list_editable = ["is_active"]


@admin.register(OfficeLocation)
class OfficeLocationAdmin(admin.ModelAdmin):
    list_display = ["name", "city", "state", "is_main", "is_active"]
    list_editable = ["is_main", "is_active"]
    search_fields = ["name", "city", "state"]
    list_filter = ["is_main", "is_active"]


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "subject", "created_at", "is_read"]
    list_editable = ["is_read"]
    search_fields = ["name", "email", "subject"]
    list_filter = ["is_read", "created_at"]
    readonly_fields = ["created_at"]
    ordering = ["-created_at"]


@admin.register(ContactFormSettings)
class ContactFormSettingsAdmin(admin.ModelAdmin):
    list_display = ["require_phone", "allow_attachments", "max_attachment_size", "is_active"]
    list_editable = ["is_active"]


@admin.register(ContactCTA)
class ContactCTAAdmin(admin.ModelAdmin):
    list_display = ["message", "button_text", "button_link", "is_active"]
    list_editable = ["is_active", "button_link"]


@admin.register(ContactPageSection)
class ContactPageSectionAdmin(admin.ModelAdmin):
    list_display = ["display_name", "section_key", "is_enabled", "display_order"]
    list_editable = ["is_enabled", "display_order"]
    ordering = ["display_order"]

    def has_add_permission(self, request):
        # Prevent adding new sections - only allow editing existing ones
        return False

    def has_delete_permission(self, request, obj=None):
        # Prevent deleting sections
        return False
