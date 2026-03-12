from django.contrib import admin
from .models import (
    PortfolioIntro, PortfolioCategory, PortfolioProject,
    PortfolioProjectImage, ProjectHighlight, PortfolioCTA, PortfolioPageSection
)


@admin.register(PortfolioIntro)
class PortfolioIntroAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'updated_at']


@admin.register(PortfolioCategory)
class PortfolioCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['display_order']


@admin.register(PortfolioProject)
class PortfolioProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'client_name', 'category', 'is_featured', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_featured', 'is_active']
    list_filter = ['category', 'is_featured', 'is_active']
    search_fields = ['title', 'client_name']
    ordering = ['display_order']


@admin.register(PortfolioProjectImage)
class PortfolioProjectImageAdmin(admin.ModelAdmin):
    list_display = ['project', 'caption', 'display_order']
    list_editable = ['display_order']
    list_filter = ['project']
    ordering = ['project', 'display_order']


@admin.register(ProjectHighlight)
class ProjectHighlightAdmin(admin.ModelAdmin):
    list_display = ['project', 'label', 'value']
    list_filter = ['project']


@admin.register(PortfolioCTA)
class PortfolioCTAAdmin(admin.ModelAdmin):
    list_display = ['message', 'button_text', 'is_active']


@admin.register(PortfolioPageSection)
class PortfolioPageSectionAdmin(admin.ModelAdmin):
    list_display = ['display_name', 'section_key', 'is_enabled', 'display_order']
    list_editable = ['is_enabled', 'display_order']
    ordering = ['display_order']
