from django.contrib import admin

from .models import QuoteRequest, QuoteSettings

@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "project_type", "quantity", "deadline", "created_at")
    list_filter = ("project_type", "created_at")
    search_fields = ("name", "email", "project_type", "description")
    readonly_fields = ("created_at",)
