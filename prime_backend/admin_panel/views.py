"""
Admin Panel Views
"""
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import BaseAuthentication, SessionAuthentication
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
import hashlib
import time
import json

# Models
from homepage.models import HeroSection, HeroImage, IntroSection, ServiceHighlight
from homepage.models import CompanyProfile, Testimonial, FeaturedProject
from homepage.models import Certification, CallToAction, HomepageSection

from aboutpage.models import CompanyProfileSection, CompanyHistory, TeamMember
from aboutpage.models import CompanyValue, CompanyImpact, Partner, AboutPageSection

from servicespage.models import ServicesPageIntro, ServiceCategory, Service
from servicespage.models import ServiceProcessStep, ServicesCTA, ServicesPageSection

from portfoliopage.models import PortfolioIntro, PortfolioCategory, PortfolioProject
from portfoliopage.models import PortfolioProjectImage, ProjectHighlight
from portfoliopage.models import PortfolioCTA, PortfolioPageSection

from contactpage.models import ContactPageIntro, ContactInfo, OfficeLocation
from contactpage.models import ContactMessage, ContactFormSettings, ContactCTA
from contactpage.models import ContactPageSection

from certifications.models import CertificationPageIntro, CertificationNotice
from certifications.models import CertificationCTA, CertificationPageSection

from quotes.models import QuoteRequest, QuoteSettings

# Serializers
from .serializers import (
    HeroSectionAdminSerializer, HeroImageAdminSerializer,
    IntroSectionAdminSerializer, ServiceHighlightAdminSerializer,
    CompanyProfileAdminSerializer, TestimonialAdminSerializer,
    FeaturedProjectAdminSerializer, CertificationAdminSerializer,
    CallToActionAdminSerializer, HomepageSectionAdminSerializer,
    CompanyProfileSectionAdminSerializer, CompanyHistoryAdminSerializer,
    TeamMemberAdminSerializer, CompanyValueAdminSerializer,
    CompanyImpactAdminSerializer, PartnerAdminSerializer,
    AboutPageSectionAdminSerializer, ServicesPageIntroAdminSerializer,
    ServiceCategoryAdminSerializer, ServiceAdminSerializer,
    ServiceProcessStepAdminSerializer, ServicesCTAAdminSerializer,
    ServicesPageSectionAdminSerializer, PortfolioIntroAdminSerializer,
    PortfolioCategoryAdminSerializer, PortfolioProjectAdminSerializer,
    PortfolioProjectImageAdminSerializer, ProjectHighlightAdminSerializer,
    PortfolioCTAAdminSerializer, PortfolioPageSectionAdminSerializer,
    ContactPageIntroAdminSerializer, ContactInfoAdminSerializer,
    OfficeLocationAdminSerializer, ContactMessageAdminSerializer,
    ContactFormSettingsAdminSerializer, ContactCTAAdminSerializer,
    ContactPageSectionAdminSerializer, CertificationPageIntroAdminSerializer,
    CertificationNoticeAdminSerializer, CertificationCTAAdminSerializer,
    CertificationPageSectionAdminSerializer, QuoteRequestAdminSerializer
)

# Import accounts authentication and permissions
from accounts.authentication import SessionTokenAuthentication
from accounts.permissions import IsAdminUser


class DashboardStatsView(APIView):
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            'total_messages': ContactMessage.objects.count(),
            'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
            'total_quotes': QuoteRequest.objects.count(),
            'total_testimonials': Testimonial.objects.count(),
            'total_projects': PortfolioProject.objects.count(),
            'total_services': Service.objects.count(),
            'total_team_members': TeamMember.objects.count(),
        }
        return Response(data)


class RecentMessagesView(APIView):
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        msgs = ContactMessage.objects.all().order_by('-created_at')[:10]
        quotes = QuoteRequest.objects.all().order_by('-created_at')[:10]
        results = []
        
        for m in msgs:
            results.append({
                'id': m.id, 'name': m.name, 'subject': m.subject,
                'created_at': m.created_at, 'is_read': m.is_read, 'message_type': 'contact'
            })
        for q in quotes:
            results.append({
                'id': q.id, 'name': q.name, 'subject': f"Quote: {q.project_type}",
                'created_at': q.created_at, 'is_read': True, 'message_type': 'quote'
            })
        
        results.sort(key=lambda x: x['created_at'], reverse=True)
        return Response(results[:10])


# Generic CRUD views - Homepage
class HeroSectionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class HeroSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class HeroImageListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = HeroImage.objects.all()
    serializer_class = HeroImageAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class HeroImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = HeroImage.objects.all()
    serializer_class = HeroImageAdminSerializer
    permission_classes = [IsAuthenticated]


class CompanyProfileListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class CompanyProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileAdminSerializer
    permission_classes = [IsAuthenticated]


class HomepageSectionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = HomepageSection.objects.all()
    serializer_class = HomepageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class HomepageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = HomepageSection.objects.all()
    serializer_class = HomepageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class IntroSectionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = IntroSection.objects.all()
    serializer_class = IntroSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class IntroSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = IntroSection.objects.all()
    serializer_class = IntroSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class ServiceHighlightListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServiceHighlight.objects.all()
    serializer_class = ServiceHighlightAdminSerializer
    permission_classes = [IsAuthenticated]


class ServiceHighlightDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServiceHighlight.objects.all()
    serializer_class = ServiceHighlightAdminSerializer
    permission_classes = [IsAuthenticated]


class TestimonialListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class TestimonialDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialAdminSerializer
    permission_classes = [IsAuthenticated]


class FeaturedProjectListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = FeaturedProject.objects.all()
    serializer_class = FeaturedProjectAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class FeaturedProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = FeaturedProject.objects.all()
    serializer_class = FeaturedProjectAdminSerializer
    permission_classes = [IsAuthenticated]


class CertificationListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = Certification.objects.all()
    serializer_class = CertificationAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class CertificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = Certification.objects.all()
    serializer_class = CertificationAdminSerializer
    permission_classes = [IsAuthenticated]


class CallToActionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CallToAction.objects.all()
    serializer_class = CallToActionAdminSerializer
    permission_classes = [IsAuthenticated]


class CallToActionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CallToAction.objects.all()
    serializer_class = CallToActionAdminSerializer
    permission_classes = [IsAuthenticated]


# About Page Views
class CompanyProfileSectionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyProfileSection.objects.all()
    serializer_class = CompanyProfileSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class CompanyProfileSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyProfileSection.objects.all()
    serializer_class = CompanyProfileSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class CompanyHistoryListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistoryAdminSerializer
    permission_classes = [IsAuthenticated]


class CompanyHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistoryAdminSerializer
    permission_classes = [IsAuthenticated]


class TeamMemberListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class TeamMemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberAdminSerializer
    permission_classes = [IsAuthenticated]


class CompanyValueListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyValue.objects.all()
    serializer_class = CompanyValueAdminSerializer
    permission_classes = [IsAuthenticated]


class CompanyValueDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyValue.objects.all()
    serializer_class = CompanyValueAdminSerializer
    permission_classes = [IsAuthenticated]


class CompanyImpactListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyImpact.objects.all()
    serializer_class = CompanyImpactAdminSerializer
    permission_classes = [IsAuthenticated]


class CompanyImpactDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CompanyImpact.objects.all()
    serializer_class = CompanyImpactAdminSerializer
    permission_classes = [IsAuthenticated]


class PartnerListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = Partner.objects.all()
    serializer_class = PartnerAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class PartnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = Partner.objects.all()
    serializer_class = PartnerAdminSerializer
    permission_classes = [IsAuthenticated]


class AboutPageSectionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = AboutPageSection.objects.all()
    serializer_class = AboutPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class AboutPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = AboutPageSection.objects.all()
    serializer_class = AboutPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


# Services Page Views
class ServicesPageIntroListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServicesPageIntro.objects.all()
    serializer_class = ServicesPageIntroAdminSerializer
    permission_classes = [IsAuthenticated]


class ServicesPageIntroDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServicesPageIntro.objects.all()
    serializer_class = ServicesPageIntroAdminSerializer
    permission_classes = [IsAuthenticated]


class ServiceCategoryListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategoryAdminSerializer
    permission_classes = [IsAuthenticated]


class ServiceCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategoryAdminSerializer
    permission_classes = [IsAuthenticated]


class ServiceListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = Service.objects.all()
    serializer_class = ServiceAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = Service.objects.all()
    serializer_class = ServiceAdminSerializer
    permission_classes = [IsAuthenticated]


class ServiceProcessStepListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServiceProcessStep.objects.all()
    serializer_class = ServiceProcessStepAdminSerializer
    permission_classes = [IsAuthenticated]


class ServiceProcessStepDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServiceProcessStep.objects.all()
    serializer_class = ServiceProcessStepAdminSerializer
    permission_classes = [IsAuthenticated]


class ServicesCTAListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServicesCTA.objects.all()
    serializer_class = ServicesCTAAdminSerializer
    permission_classes = [IsAuthenticated]


class ServicesCTADetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServicesCTA.objects.all()
    serializer_class = ServicesCTAAdminSerializer
    permission_classes = [IsAuthenticated]


class ServicesPageSectionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServicesPageSection.objects.all()
    serializer_class = ServicesPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class ServicesPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ServicesPageSection.objects.all()
    serializer_class = ServicesPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


# Portfolio Page Views
class PortfolioIntroListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioIntro.objects.all()
    serializer_class = PortfolioIntroAdminSerializer
    permission_classes = [IsAuthenticated]


class PortfolioIntroDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioIntro.objects.all()
    serializer_class = PortfolioIntroAdminSerializer
    permission_classes = [IsAuthenticated]


class PortfolioCategoryListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioCategory.objects.all()
    serializer_class = PortfolioCategoryAdminSerializer
    permission_classes = [IsAuthenticated]


class PortfolioCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioCategory.objects.all()
    serializer_class = PortfolioCategoryAdminSerializer
    permission_classes = [IsAuthenticated]


class PortfolioProjectListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioProject.objects.all()
    serializer_class = PortfolioProjectAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class PortfolioProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioProject.objects.all()
    serializer_class = PortfolioProjectAdminSerializer
    permission_classes = [IsAuthenticated]


class PortfolioProjectImageListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioProjectImage.objects.all()
    serializer_class = PortfolioProjectImageAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class PortfolioProjectImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioProjectImage.objects.all()
    serializer_class = PortfolioProjectImageAdminSerializer
    permission_classes = [IsAuthenticated]


class ProjectHighlightListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ProjectHighlight.objects.all()
    serializer_class = ProjectHighlightAdminSerializer
    permission_classes = [IsAuthenticated]


class ProjectHighlightDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ProjectHighlight.objects.all()
    serializer_class = ProjectHighlightAdminSerializer
    permission_classes = [IsAuthenticated]


class PortfolioCTAListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioCTA.objects.all()
    serializer_class = PortfolioCTAAdminSerializer
    permission_classes = [IsAuthenticated]


class PortfolioCTADetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioCTA.objects.all()
    serializer_class = PortfolioCTAAdminSerializer
    permission_classes = [IsAuthenticated]


class PortfolioPageSectionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioPageSection.objects.all()
    serializer_class = PortfolioPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class PortfolioPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = PortfolioPageSection.objects.all()
    serializer_class = PortfolioPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


# Contact Page Views
class ContactPageIntroListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactPageIntro.objects.all()
    serializer_class = ContactPageIntroAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactPageIntroDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactPageIntro.objects.all()
    serializer_class = ContactPageIntroAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactInfoListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactInfoDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoAdminSerializer
    permission_classes = [IsAuthenticated]


class OfficeLocationListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = OfficeLocation.objects.all()
    serializer_class = OfficeLocationAdminSerializer
    permission_classes = [IsAuthenticated]


class OfficeLocationDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = OfficeLocation.objects.all()
    serializer_class = OfficeLocationAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactMessageListView(generics.ListAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactMessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageAdminSerializer
    permission_classes = [IsAuthenticated]


class MarkMessageAsReadView(APIView):
    authentication_classes = [SessionTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            msg = ContactMessage.objects.get(pk=pk)
            msg.is_read = True
            msg.save()
            return Response({'status': 'success'})
        except ContactMessage.DoesNotExist:
            return Response({'status': 'error'}, status=status.HTTP_404_NOT_FOUND)


class ContactFormSettingsListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactFormSettings.objects.all()
    serializer_class = ContactFormSettingsAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactFormSettingsDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactFormSettings.objects.all()
    serializer_class = ContactFormSettingsAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactCTAListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactCTA.objects.all()
    serializer_class = ContactCTAAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactCTADetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactCTA.objects.all()
    serializer_class = ContactCTAAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactPageSectionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactPageSection.objects.all()
    serializer_class = ContactPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class ContactPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = ContactPageSection.objects.all()
    serializer_class = ContactPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


# Certifications Page Views
class CertificationPageIntroListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CertificationPageIntro.objects.all()
    serializer_class = CertificationPageIntroAdminSerializer
    permission_classes = [IsAuthenticated]


class CertificationPageIntroDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CertificationPageIntro.objects.all()
    serializer_class = CertificationPageIntroAdminSerializer
    permission_classes = [IsAuthenticated]


class CertificationNoticeListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CertificationNotice.objects.all()
    serializer_class = CertificationNoticeAdminSerializer
    permission_classes = [IsAuthenticated]


class CertificationNoticeDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CertificationNotice.objects.all()
    serializer_class = CertificationNoticeAdminSerializer
    permission_classes = [IsAuthenticated]


class CertificationCTAListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CertificationCTA.objects.all()
    serializer_class = CertificationCTAAdminSerializer
    permission_classes = [IsAuthenticated]


class CertificationCTADetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CertificationCTA.objects.all()
    serializer_class = CertificationCTAAdminSerializer
    permission_classes = [IsAuthenticated]


class CertificationPageSectionListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CertificationPageSection.objects.all()
    serializer_class = CertificationPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


class CertificationPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = CertificationPageSection.objects.all()
    serializer_class = CertificationPageSectionAdminSerializer
    permission_classes = [IsAuthenticated]


# Quotes Views
class QuoteRequestListView(generics.ListAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = QuoteRequest.objects.all().order_by('-created_at')
    serializer_class = QuoteRequestAdminSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class QuoteRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionTokenAuthentication]
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestAdminSerializer
    permission_classes = [IsAuthenticated]


# Media Upload
class MediaUploadView(APIView):
    authentication_classes = [SessionTokenAuthentication]
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'url': request.build_absolute_uri(f'/media/{file.name}'),
            'name': file.name,
            'size': file.size
        })


# Auth Views
class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []  # No authentication for login
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        try:
            if request.body:
                data = json.loads(request.body)
            else:
                data = request.POST
        except:
            data = request.POST
            
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None and user.is_staff:
            # Log the user in using Django's session
            from django.contrib.auth import login
            login(request, user)
            
            token = hashlib.sha256(f"{user.username}{time.time()}".encode()).hexdigest()[:32]
            return Response({
                'success': True,
                'token': token,
                'user': {'id': user.id, 'username': user.username, 'email': user.email}
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    def get(self, request):
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class LogoutView(APIView):
    permission_classes = [AllowAny]
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        return Response({'success': True})
    
    def get(self, request):
        return Response({'success': True})


class CheckAuthView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        auth = request.META.get('HTTP_AUTHORIZATION', '')
        if auth.startswith('Bearer '):
            token = auth[7:]
            if token:
                return Response({'authenticated': True})
        return Response({'authenticated': False}, status=status.HTTP_401_UNAUTHORIZED)


# Legacy function-based views (kept for reference)
@csrf_exempt
def admin_login(request):
    if request.method == 'POST':
        try:
            if request.body:
                data = json.loads(request.body)
            else:
                data = request.POST
        except:
            data = request.POST
            
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None and user.is_staff:
            token = hashlib.sha256(f"{user.username}{time.time()}".encode()).hexdigest()[:32]
            return JsonResponse({
                'success': True,
                'token': token,
                'user': {'id': user.id, 'username': user.username, 'email': user.email}
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def admin_logout(request):
    return JsonResponse({'success': True})


@csrf_exempt
def admin_check_auth(request):
    auth = request.META.get('HTTP_AUTHORIZATION', '')
    if auth.startswith('Bearer '):
        token = auth[7:]
        if token:
            return JsonResponse({'authenticated': True})
    return JsonResponse({'authenticated': False}, status=401)

