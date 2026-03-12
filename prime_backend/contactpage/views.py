from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import (
    ContactPageIntro,
    ContactInfo,
    OfficeLocation,
    ContactMessage,
    ContactFormSettings,
    ContactCTA,
    ContactPageSection,
)
from .serializers import (
    ContactPageIntroSerializer,
    ContactInfoSerializer,
    OfficeLocationSerializer,
    ContactMessageSerializer,
    ContactFormSettingsSerializer,
    ContactCTASerializer,
    ContactPageSectionSerializer,
)


class ContactPageDataView(APIView):
    """
    Returns all data needed for the contact page
    """
    def get(self, request):
        # Get enabled sections
        enabled_sections = ContactPageSection.objects.filter(is_enabled=True).order_by("display_order")

        data = {
            "sections": ContactPageSectionSerializer(enabled_sections, many=True).data,
        }

        # Add data for each enabled section
        for section in enabled_sections:
            if section.section_key == "intro":
                intro = ContactPageIntro.objects.filter(is_active=True).first()
                if intro:
                    data["intro"] = ContactPageIntroSerializer(intro).data

            elif section.section_key == "info":
                info = ContactInfo.objects.filter(is_active=True).first()
                if info:
                    data["info"] = ContactInfoSerializer(info).data

            elif section.section_key == "locations":
                locations = OfficeLocation.objects.filter(is_active=True).order_by("-is_main")
                data["locations"] = OfficeLocationSerializer(locations, many=True).data

            elif section.section_key == "form":
                settings = ContactFormSettings.objects.filter(is_active=True).first()
                if settings:
                    data["form_settings"] = ContactFormSettingsSerializer(settings).data

            elif section.section_key == "map":
                # Map data will be derived from locations
                locations = OfficeLocation.objects.filter(is_active=True, latitude__isnull=False, longitude__isnull=False)
                data["map_locations"] = OfficeLocationSerializer(locations, many=True).data

            elif section.section_key == "cta":
                cta = ContactCTA.objects.filter(is_active=True).first()
                if cta:
                    data["cta"] = ContactCTASerializer(cta).data

        return Response(data)


class ContactPageIntroView(generics.RetrieveUpdateAPIView):
    queryset = ContactPageIntro.objects.all()
    serializer_class = ContactPageIntroSerializer

    def get_object(self):
        return ContactPageIntro.objects.filter(is_active=True).first() or ContactPageIntro.objects.create()


class ContactInfoView(generics.RetrieveUpdateAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer

    def get_object(self):
        return ContactInfo.objects.filter(is_active=True).first() or ContactInfo.objects.create()


class OfficeLocationListView(generics.ListCreateAPIView):
    queryset = OfficeLocation.objects.all()
    serializer_class = OfficeLocationSerializer


class OfficeLocationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OfficeLocation.objects.all()
    serializer_class = OfficeLocationSerializer


class ContactMessageListView(generics.ListCreateAPIView):
    queryset = ContactMessage.objects.all().order_by("-created_at")
    serializer_class = ContactMessageSerializer
    parser_classes = [MultiPartParser, FormParser] 
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class ContactMessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer


class ContactFormSettingsView(generics.RetrieveUpdateAPIView):
    queryset = ContactFormSettings.objects.all()
    serializer_class = ContactFormSettingsSerializer

    def get_object(self):
        return ContactFormSettings.objects.filter(is_active=True).first() or ContactFormSettings.objects.create()


class ContactCTAView(generics.RetrieveUpdateAPIView):
    queryset = ContactCTA.objects.all()
    serializer_class = ContactCTASerializer

    def get_object(self):
        return ContactCTA.objects.filter(is_active=True).first() or ContactCTA.objects.create()


class ContactPageSectionListView(generics.ListCreateAPIView):
    queryset = ContactPageSection.objects.all()
    serializer_class = ContactPageSectionSerializer


class ContactPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactPageSection.objects.all()
    serializer_class = ContactPageSectionSerializer
