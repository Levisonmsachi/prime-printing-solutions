"""
Admin Panel Serializers
Reuses serializers from other apps and creates admin-specific serializers
"""
from rest_framework import serializers

# ==================== HOMEPAGE SERIALIZERS ====================
from homepage.models import (
    HeroSection, HeroImage, IntroSection, ServiceHighlight,
    CompanyProfile, Testimonial, FeaturedProject,
    Certification, CallToAction, HomepageSection
)


class HeroImageAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroImage
        fields = ['id', 'image', 'display_order']


class HeroSectionAdminSerializer(serializers.ModelSerializer):
    images = HeroImageAdminSerializer(many=True, read_only=True)
    
    class Meta:
        model = HeroSection
        fields = [
            'id', 'title', 'subtitle', 'background_image',
            'message_1', 'message_2', 'message_3', 'is_active',
            'created_at', 'updated_at', 'images'
        ]


class IntroSectionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntroSection
        fields = [
            'id', 'content', 'delivered_projects', 'clients_satisfied',
            'years_experience', 'is_active', 'created_at', 'updated_at'
        ]


class ServiceHighlightAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceHighlight
        fields = [
            'id', 'title', 'description', 'icon', 'display_order',
            'is_active', 'created_at', 'updated_at'
        ]


class CompanyProfileAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = ['id', 'title', 'file', 'is_active', 'updated_at']


class TestimonialAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_role', 'company', 'quote',
            'avatar', 'default_avatar', 'rating', 'display_order',
            'is_active', 'created_at'
        ]


class FeaturedProjectAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedProject
        fields = [
            'id', 'title', 'description', 'image', 'project_link',
            'display_order', 'is_active', 'created_at'
        ]


class CertificationAdminSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Certification
        fields = [
            'id', 'title', 'issuer', 'logo', 'default_logo', 'logo_url',
            'issue_date', 'expiry_date', 'display_order', 'is_active'
        ]
    
    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.logo.url) if request else obj.logo.url
        if obj.default_logo:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.default_logo.url) if request else obj.default_logo.url
        return None


class CallToActionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallToAction
        fields = ['id', 'message', 'button_text', 'button_link', 'default_button_link', 'is_active']


class HomepageSectionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageSection
        fields = ['id', 'section_key', 'display_name', 'is_enabled', 'display_order']


# ==================== ABOUT PAGE SERIALIZERS ====================
from aboutpage.models import (
    CompanyProfileSection, CompanyHistory, TeamMember,
    CompanyValue, CompanyImpact, Partner, AboutPageSection
)


class CompanyProfileSectionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfileSection
        fields = '__all__'


class CompanyHistoryAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyHistory
        fields = '__all__'


class TeamMemberAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


class CompanyValueAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyValue
        fields = '__all__'


class CompanyImpactAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyImpact
        fields = '__all__'


class PartnerAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'


class AboutPageSectionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPageSection
        fields = '__all__'


# ==================== SERVICES PAGE SERIALIZERS ====================
from servicespage.models import (
    ServicesPageIntro, ServiceCategory, Service,
    ServiceProcessStep, ServicesCTA, ServicesPageSection
)


class ServiceProcessStepAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProcessStep
        fields = ['id', 'step_number', 'title', 'description', 'icon', 'estimated_time']


class ServiceAdminSerializer(serializers.ModelSerializer):
    process_steps = ServiceProcessStepAdminSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = [
            'id', 'category', 'name', 'short_description', 'full_description',
            'icon', 'image', 'features', 'pricing_info', 'turnaround_time',
            'display_order', 'is_featured', 'is_active', 'created_at', 'updated_at',
            'process_steps'
        ]


class ServiceCategoryAdminSerializer(serializers.ModelSerializer):
    services_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'icon', 'display_order', 'is_active', 'services_count']
    
    def get_services_count(self, obj):
        return obj.services.count()


class ServicesPageIntroAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesPageIntro
        fields = ['id', 'title', 'subtitle', 'is_active']


class ServicesCTAAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesCTA
        fields = ['id', 'message', 'button_text', 'button_link', 'is_active']


class ServicesPageSectionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesPageSection
        fields = '__all__'


# ==================== PORTFOLIO PAGE SERIALIZERS ====================
from portfoliopage.models import (
    PortfolioIntro, PortfolioCategory, PortfolioProject,
    PortfolioProjectImage, ProjectHighlight, PortfolioCTA, PortfolioPageSection
)


class ProjectHighlightAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectHighlight
        fields = '__all__'


class PortfolioProjectImageAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioProjectImage
        fields = '__all__'


class PortfolioProjectAdminSerializer(serializers.ModelSerializer):
    images = PortfolioProjectImageAdminSerializer(many=True, read_only=True)
    highlights = ProjectHighlightAdminSerializer(many=True, read_only=True)
    
    class Meta:
        model = PortfolioProject
        fields = '__all__'


class PortfolioCategoryAdminSerializer(serializers.ModelSerializer):
    projects_count = serializers.SerializerMethodField()
    
    class Meta:
        model = PortfolioCategory
        fields = ['id', 'name', 'slug', 'display_order', 'is_active', 'projects_count']
    
    def get_projects_count(self, obj):
        return obj.projects.count()


class PortfolioIntroAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioIntro
        fields = '__all__'


class PortfolioCTAAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioCTA
        fields = '__all__'


class PortfolioPageSectionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioPageSection
        fields = '__all__'


# ==================== CONTACT PAGE SERIALIZERS ====================
from contactpage.models import (
    ContactPageIntro, ContactInfo, OfficeLocation,
    ContactMessage, ContactFormSettings, ContactCTA, ContactPageSection
)


class ContactPageIntroAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPageIntro
        fields = '__all__'


class ContactInfoAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'


class OfficeLocationAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeLocation
        fields = '__all__'


class ContactMessageAdminSerializer(serializers.ModelSerializer):
    attachment_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'company', 'subject', 
                  'message', 'attachment', 'attachment_url', 'created_at', 'is_read']
    
    def get_attachment_url(self, obj):
        if obj.attachment:
            return obj.attachment.url
        return None


class ContactFormSettingsAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactFormSettings
        fields = '__all__'


class ContactCTAAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactCTA
        fields = '__all__'


class ContactPageSectionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPageSection
        fields = '__all__'


# ==================== CERTIFICATIONS SERIALIZERS ====================
from certifications.models import (
    CertificationPageIntro,
    CertificationNotice,
    CertificationCTA,
    CertificationPageSection
)


class CertificationPageIntroAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationPageIntro
        fields = '__all__'


class CertificationNoticeAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationNotice
        fields = '__all__'


class CertificationCTAAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationCTA
        fields = '__all__'


class CertificationPageSectionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationPageSection
        fields = '__all__'


# ==================== QUOTES SERIALIZERS ====================
from quotes.models import QuoteRequest, QuoteSettings


class QuoteRequestAdminSerializer(serializers.ModelSerializer):
    attachment_url = serializers.SerializerMethodField()
    
    class Meta:
        model = QuoteRequest
        fields = '__all__'
    
    def get_attachment_url(self, obj):
        if obj.attachment:
            return obj.attachment.url
        return None


# ==================== DASHBOARD SERIALIZERS ====================
class DashboardStatsSerializer(serializers.Serializer):
    total_messages = serializers.IntegerField()
    unread_messages = serializers.IntegerField()
    total_quotes = serializers.IntegerField()
    pending_quotes = serializers.IntegerField()
    total_testimonials = serializers.IntegerField()
    total_projects = serializers.IntegerField()
    total_services = serializers.IntegerField()
    total_team_members = serializers.IntegerField()


class RecentMessageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    subject = serializers.CharField()
    created_at = serializers.DateTimeField()
    is_read = serializers.BooleanField()
    message_type = serializers.CharField()  # 'contact' or 'quote'

