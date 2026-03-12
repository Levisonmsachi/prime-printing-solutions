from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import (
    CertificationPageIntro,
    CertificationNotice,
    CertificationCTA,
    CertificationPageSection,
)
from .serializers import (
    CertificationSerializer,
    CertificationPageIntroSerializer,
    CertificationNoticeSerializer,
    CertificationCTASerializer,
    CertificationPageSectionSerializer,
)
from homepage.models import Certification


class CertificationPageDataView(APIView):
    """
    Returns all data needed for the certifications page
    """
    def get(self, request):
        # Get enabled sections
        enabled_sections = CertificationPageSection.objects.filter(is_enabled=True).order_by("display_order")

        data = {
            "sections": CertificationPageSectionSerializer(enabled_sections, many=True).data,
        }

        # Add data for each enabled section
        for section in enabled_sections:
            if section.section_key == "intro":
                intro = CertificationPageIntro.objects.filter(is_active=True).first()
                if intro:
                    data["intro"] = CertificationPageIntroSerializer(intro).data

            elif section.section_key == "certifications":
                certifications = Certification.objects.filter(is_active=True).order_by("-issue_date")
                data["certifications"] = CertificationSerializer(certifications, many=True, context={"request": request}).data

            elif section.section_key == "notice":
                notice = CertificationNotice.objects.filter(is_active=True).first()
                if notice:
                    data["notice"] = CertificationNoticeSerializer(notice).data

            elif section.section_key == "cta":
                cta = CertificationCTA.objects.filter(is_active=True).first()
                if cta:
                    data["cta"] = CertificationCTASerializer(cta).data

        return Response(data)


class CertificationPageIntroView(generics.RetrieveUpdateAPIView):
    queryset = CertificationPageIntro.objects.all()
    serializer_class = CertificationPageIntroSerializer

    def get_object(self):
        return CertificationPageIntro.objects.filter(is_active=True).first() or CertificationPageIntro.objects.create()


class CertificationNoticeView(generics.RetrieveUpdateAPIView):
    queryset = CertificationNotice.objects.all()
    serializer_class = CertificationNoticeSerializer

    def get_object(self):
        return CertificationNotice.objects.filter(is_active=True).first() or CertificationNotice.objects.create()


class CertificationCTAView(generics.RetrieveUpdateAPIView):
    queryset = CertificationCTA.objects.all()
    serializer_class = CertificationCTASerializer

    def get_object(self):
        return CertificationCTA.objects.filter(is_active=True).first() or CertificationCTA.objects.create()


class CertificationPageSectionListView(generics.ListCreateAPIView):
    queryset = CertificationPageSection.objects.all()
    serializer_class = CertificationPageSectionSerializer


class CertificationPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CertificationPageSection.objects.all()
    serializer_class = CertificationPageSectionSerializer
