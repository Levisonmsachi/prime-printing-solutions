from rest_framework import serializers
from .models import (
    CompanyProfileSection, CompanyHistory, TeamMember,
    CompanyValue, CompanyImpact, Partner, AboutPageSection
)


class CompanyProfileSectionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CompanyProfileSection
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None


class CompanyHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyHistory
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = '__all__'

    def get_avatar_url(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return None


class CompanyValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyValue
        fields = '__all__'


class CompanyImpactSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyImpact
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Partner
        fields = '__all__'

    def get_logo_url(self, obj):
        if obj.logo:
            return obj.logo.url
        return None


class AboutPageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPageSection
        fields = '__all__'


class AboutPageSerializer(serializers.Serializer):
    profile = CompanyProfileSectionSerializer()
    history = CompanyHistorySerializer()
    team = TeamMemberSerializer(many=True)
    values = CompanyValueSerializer(many=True)
    impact = CompanyImpactSerializer()
    partners = PartnerSerializer(many=True)