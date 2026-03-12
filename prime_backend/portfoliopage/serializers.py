from rest_framework import serializers
from .models import (
    PortfolioIntro, PortfolioCategory, PortfolioProject,
    PortfolioProjectImage, ProjectHighlight, PortfolioCTA, PortfolioPageSection
)


class PortfolioIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioIntro
        fields = '__all__'


class PortfolioCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioCategory
        fields = '__all__'


class ProjectHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectHighlight
        fields = '__all__'


class PortfolioProjectImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = PortfolioProjectImage
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None


class PortfolioProjectSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()
    images = PortfolioProjectImageSerializer(many=True, read_only=True)
    highlights = ProjectHighlightSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = PortfolioProject
        fields = '__all__'

    def get_cover_image_url(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None


class PortfolioCTASerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioCTA
        fields = '__all__'


class PortfolioPageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioPageSection
        fields = '__all__'