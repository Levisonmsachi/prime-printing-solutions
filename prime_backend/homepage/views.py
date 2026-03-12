from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    HeroSection, IntroSection, ServiceHighlight,
    Testimonial, Certification, CallToAction,
    HomepageSection, FeaturedProject, CompanyProfile
)
from .serializers import (
    HeroSectionSerializer,
    IntroSectionSerializer,
    ServiceHighlightSerializer,
    TestimonialSerializer,
    CertificationSerializer,
    CallToActionSerializer,
    CompanyProfileSerializer,
    FeaturedProjectSerializer
)


class HomepageAPIView(APIView):
    def get(self, request):
        sections = HomepageSection.objects.filter(
            is_enabled=True
        ).order_by("display_order")

        data = {}

        for section in sections:
            key = section.section_key

            if key == "hero":
                hero = HeroSection.objects.filter(is_active=True).first()
                data["hero"] = HeroSectionSerializer(hero, context={'request': request}).data if hero else None

            elif key == "intro":
                intro = IntroSection.objects.filter(is_active=True).first()
                data["intro"] = IntroSectionSerializer(intro).data if intro else None

            elif key == "service":
                services = ServiceHighlight.objects.filter(is_active=True)
                data["services"] = ServiceHighlightSerializer(services, many=True).data

            elif key == "testimonials":
                testimonials = Testimonial.objects.filter(is_active=True)
                data["testimonials"] = TestimonialSerializer(testimonials, many=True, context={'request': request}).data

            elif key == "featured_projects":
                projects = FeaturedProject.objects.filter(is_active=True)
                data["featured_projects"] = FeaturedProjectSerializer(projects, many=True, context={'request': request}).data

            elif key == "company_profile":
                profile = CompanyProfile.objects.filter(is_active=True).first()
                data["company_profile"] = CompanyProfileSerializer(profile, context={'request': request}).data if profile else None

            elif key == "certifications":
                certifications = Certification.objects.filter(is_active=True)
                data["certifications"] = CertificationSerializer(certifications, many=True, context={'request': request}).data

            elif key == "cta":
                cta = CallToAction.objects.filter(is_active=True).first()
                data["cta"] = CallToActionSerializer(cta).data if cta else None

        return Response(data)


class CertificationListCreateView(generics.ListCreateAPIView):
    queryset = Certification.objects.all().order_by('display_order')
    serializer_class = CertificationSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class CertificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

