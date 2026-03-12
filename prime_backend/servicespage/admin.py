from django.contrib import admin
from .models import (
    ServicesPageIntro,
    ServiceCategory,
    Service,
    ServiceProcessStep,
    ServicesCTA,
    ServicesPageSection,
)


class ServiceProcessStepInline(admin.TabularInline):
    model = ServiceProcessStep
    extra = 0
    ordering = ["step_number"]


class ServiceInline(admin.TabularInline):
    model = Service
    extra = 0
    ordering = ["display_order"]


@admin.register(ServicesPageIntro)
class ServicesPageIntroAdmin(admin.ModelAdmin):
    list_display = ["title", "is_active", "updated_at"]
    list_editable = ["is_active"]
    search_fields = ["title", "subtitle"]


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "display_order", "is_active"]
    list_editable = ["display_order", "is_active"]
    search_fields = ["name", "description"]
    inlines = [ServiceInline]


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "is_featured", "display_order", "is_active"]
    list_editable = ["is_featured", "display_order", "is_active"]
    search_fields = ["name", "short_description"]
    list_filter = ["category", "is_featured", "is_active"]
    inlines = [ServiceProcessStepInline]


@admin.register(ServiceProcessStep)
class ServiceProcessStepAdmin(admin.ModelAdmin):
    list_display = ["service", "step_number", "title"]
    search_fields = ["service__name", "title"]
    list_filter = ["service"]
    ordering = ["service", "step_number"]


@admin.register(ServicesCTA)
class ServicesCTAAdmin(admin.ModelAdmin):
    list_display = ["message", "button_text", "button_link", "is_active"]
    list_editable = ["is_active", "button_link"]


@admin.register(ServicesPageSection)
class ServicesPageSectionAdmin(admin.ModelAdmin):
    list_display = ["display_name", "section_key", "is_enabled", "display_order"]
    list_editable = ["is_enabled", "display_order"]
    ordering = ["display_order"]

    def has_add_permission(self, request):
        # Prevent adding new sections - only allow editing existing ones
        return False

    def has_delete_permission(self, request, obj=None):
        # Prevent deleting sections
        return False
