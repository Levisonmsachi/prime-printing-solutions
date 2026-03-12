from django.contrib import admin
from .models import (
    HeroSection, HeroImage, IntroSection, ServiceHighlight,
    CompanyProfile, Testimonial, FeaturedProject,
    Certification, CallToAction, HomepageSection
)


# ---------- Inline Hero Images ----------
class HeroImageInline(admin.TabularInline):
    model = HeroImage
    extra = 1


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle",  "is_active", "created_at")
    inlines = [HeroImageInline]
    list_editable = ("is_active",)
    ordering = ("-created_at",)

    fieldsets = (
        (None, {
            "fields": ("title", "subtitle", "background_image", "message_1", "message_2", "message_3")
        }),
    )


@admin.register(IntroSection)
class IntroSectionAdmin(admin.ModelAdmin):
    list_display = ("content_short", "is_active", "created_at")
    list_editable = ("is_active",)
    ordering = ("-created_at",)

    def content_short(self, obj):
        return obj.content[:50] + "..."


@admin.register(ServiceHighlight)
class ServiceHighlightAdmin(admin.ModelAdmin):
    list_display = ("title", "display_order", "is_active")
    list_editable = ("display_order", "is_active")
    ordering = ("display_order",)


@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ("title", "file", "is_active")
    list_editable = ("is_active",)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("client_name", "company", "rating", "display_order", "is_active")
    list_editable = ("display_order", "is_active")
    ordering = ("display_order",)


@admin.register(FeaturedProject)
class FeaturedProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "display_order", "is_active")
    list_editable = ("display_order", "is_active")
    ordering = ("display_order",)

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "display_order", "is_active")
    list_editable = ("display_order", "is_active")
    ordering = ("display_order",)


@admin.register(CallToAction)
class CallToActionAdmin(admin.ModelAdmin):
    list_display = ("button_text", "message", "button_link", "is_active")
    list_editable = ("is_active", "button_link")


@admin.register(HomepageSection)
class HomepageSectionAdmin(admin.ModelAdmin):
    list_display = ("display_name", "is_enabled", "display_order", "default_enabled", "default_order")
    list_editable = ("is_enabled", "display_order")

    actions = ["reset_sections_to_default"]

    def reset_sections_to_default(self, request, queryset):
        for section in queryset:
            section.reset_to_default()
        self.message_user(request, "Selected sections have been reset to default.")
    reset_sections_to_default.short_description = "Reset selected sections to default"
