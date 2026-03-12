from rest_framework import serializers
from .models import (
    ContactPageIntro,
    ContactInfo,
    OfficeLocation,
    ContactMessage,
    ContactFormSettings,
    ContactCTA,
    ContactPageSection,
)


class ContactPageIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPageIntro
        fields = ["id", "title", "subtitle", "is_active"]


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ["id", "phone", "email", "address", "business_hours", "is_active"]


class OfficeLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeLocation
        fields = [
            "id", "name", "address", "city", "state", "zip_code", "country",
            "latitude", "longitude", "phone", "email", "is_main", "is_active"
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "phone", "company", "subject", "message", "attachment", "created_at", "is_read"]
        read_only_fields = ["id", "created_at"]


class ContactFormSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactFormSettings
        fields = ["id", "require_phone", "allow_attachments", "max_attachment_size", "success_message", "is_active"]


class ContactCTASerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactCTA
        fields = ["id", "message", "button_text", "button_link", "is_active"]


class ContactPageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPageSection
        fields = ["id", "section_key", "display_name", "is_enabled", "display_order"]