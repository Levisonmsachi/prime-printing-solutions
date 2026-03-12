from django.contrib import admin
from .models import (
    CertificationPageIntro,
    CertificationNotice,
    CertificationCTA,
    CertificationPageSection,
)
from homepage.models import Certification


@admin.register(CertificationPageIntro)
class CertificationPageIntroAdmin(admin.ModelAdmin):
    list_display = ["title", "is_active", "updated_at"]
    list_editable = ["is_active"]
    search_fields = ["title", "subtitle"]


@admin.register(CertificationNotice)
class CertificationNoticeAdmin(admin.ModelAdmin):
    list_display = ["message", "is_active"]
    list_editable = ["is_active"]


@admin.register(CertificationCTA)
class CertificationCTAAdmin(admin.ModelAdmin):
    list_display = ["message", "button_text", "button_link", "is_active"]
    list_editable = ["is_active", "button_link"]


@admin.register(CertificationPageSection)
class CertificationPageSectionAdmin(admin.ModelAdmin):
    list_display = ["display_name", "section_key", "is_enabled", "display_order"]
    list_editable = ["is_enabled", "display_order"]
    ordering = ["display_order"]

    def has_add_permission(self, request):
        # Prevent adding new sections - only allow editing existing ones
        return False

    def has_delete_permission(self, request, obj=None):
        # Prevent deleting sections
        return False
