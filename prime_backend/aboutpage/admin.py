from django.contrib import admin
from .models import (
    CompanyProfileSection, CompanyHistory, TeamMember,
    CompanyValue, CompanyImpact, Partner, AboutPageSection
)


@admin.register(CompanyProfileSection)
class CompanyProfileSectionAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'is_active', 'updated_at']
    search_fields = ['company_name', 'tagline']


@admin.register(CompanyHistory)
class CompanyHistoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    search_fields = ['title']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'role', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['full_name', 'role']
    ordering = ['display_order']


@admin.register(CompanyValue)
class CompanyValueAdmin(admin.ModelAdmin):
    list_display = ['title', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['title']
    ordering = ['display_order']


@admin.register(CompanyImpact)
class CompanyImpactAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active']
    search_fields = ['title']


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'website', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['name']
    ordering = ['display_order']


@admin.register(AboutPageSection)
class AboutPageSectionAdmin(admin.ModelAdmin):
    list_display = ['display_name', 'section_key', 'is_enabled', 'display_order']
    list_editable = ['is_enabled', 'display_order']
    ordering = ['display_order']
