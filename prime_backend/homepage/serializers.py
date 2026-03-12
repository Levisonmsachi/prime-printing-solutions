from rest_framework import serializers
from .models import (
    HeroSection, HeroImage, IntroSection, ServiceHighlight,
    CompanyProfile, Testimonial, FeaturedProject,
    Certification, CallToAction
)


class HeroImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HeroImage
        fields = ["image_url", "display_order"]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class HeroSectionSerializer(serializers.ModelSerializer):
    images = HeroImageSerializer(many=True, read_only=True)
    background_image_url = serializers.SerializerMethodField()

    class Meta:
        model = HeroSection
        fields = ["title", "subtitle", "background_image_url", "images", "is_active", "message_1", "message_2", "message_3"]

    def get_background_image_url(self, obj):
        if obj.background_image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.background_image.url) if request else obj.background_image.url
        return None


class IntroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntroSection
        fields = ["content", "delivered_projects", "clients_satisfied", "years_experience"]


class ServiceHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceHighlight
        fields = ["title", "description", "icon"]


class TestimonialSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            "client_name",
            "client_role",
            "company",
            "quote",
            "rating",
            "avatar_url"
        ]

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.avatar.url) if request else obj.avatar.url
        if obj.default_avatar:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.default_avatar.url) if request else obj.default_avatar.url
        return None


class CompanyProfileSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = CompanyProfile
        fields = ['title', 'file_url', 'updated_at']
    
    def get_file_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.file.url) if request else obj.file.url
        return None


class FeaturedProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = FeaturedProject
        fields = ['title', 'description', 'image_url', 'project_link']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

class CertificationSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = '__all__'
        extra_kwargs = {
            'default_logo': {'required': False},
        }

    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.logo.url) if request else obj.logo.url
        if obj.default_logo:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.default_logo.url) if request else obj.default_logo.url
        return None


class CallToActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallToAction
        fields = ["message", "button_text", "button_link"]
