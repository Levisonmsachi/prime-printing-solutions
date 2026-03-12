from rest_framework import serializers
from .models import (
    ServicesPageIntro,
    ServiceCategory,
    Service,
    ServiceProcessStep,
    ServicesCTA,
    ServicesPageSection,
)


class ServiceProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProcessStep
        fields = ["id", "step_number", "title", "description", "icon", "estimated_time"]


class ServiceSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    process_steps = ServiceProcessStepSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Service
        fields = [
            "id", "category", "category_name", "name", "short_description", "full_description",
            "icon", "image", "image_url", "features", "pricing_info", "turnaround_time",
            "display_order", "is_featured", "is_active", "process_steps"
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ServiceCategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    services_count = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = ["id", "name", "description", "icon", "display_order", "is_active", "services", "services_count"]

    def get_services_count(self, obj):
        return obj.services.filter(is_active=True).count()


class ServicesPageIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesPageIntro
        fields = ["id", "title", "subtitle", "is_active"]


class ServicesCTASerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesCTA
        fields = ["id", "message", "button_text", "button_link", "is_active"]


class ServicesPageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesPageSection
        fields = ["id", "section_key", "display_name", "is_enabled", "display_order"]