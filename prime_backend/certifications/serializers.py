from rest_framework import serializers
from .models import (
    CertificationPageIntro,
    CertificationNotice,
    CertificationCTA,
    CertificationPageSection,
)
from homepage.models import Certification


class CertificationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    name = serializers.CharField(source='title')
    issuing_authority = serializers.CharField(source='issuer')
    image = serializers.ImageField(source='logo')

    class Meta:
        model = Certification
        fields = ["id", "name", "issuing_authority", "issue_date", "expiry_date", "image", "image_url", "is_active"]

    def get_image_url(self, obj):
        if obj.logo:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None


class CertificationPageIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationPageIntro
        fields = ["id", "title", "subtitle", "is_active"]


class CertificationNoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationNotice
        fields = ["id", "message", "is_active"]


class CertificationCTASerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationCTA
        fields = ["id", "message", "button_text", "button_link", "is_active"]


class CertificationPageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationPageSection
        fields = ["id", "section_key", "display_name", "is_enabled", "display_order"]