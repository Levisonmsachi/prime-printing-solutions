from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    CompanyProfileSection, CompanyHistory, TeamMember,
    CompanyValue, CompanyImpact, Partner, AboutPageSection
)
from .serializers import (
    CompanyProfileSectionSerializer, CompanyHistorySerializer, TeamMemberSerializer,
    CompanyValueSerializer, CompanyImpactSerializer, PartnerSerializer, AboutPageSectionSerializer
)


class AboutPageDataView(APIView):
    def get(self, request):
        # Get enabled sections in order
        sections = AboutPageSection.objects.filter(is_enabled=True).order_by('display_order')

        data = {
            'sections': AboutPageSectionSerializer(sections, many=True).data,
        }

        # Add data for each section if enabled
        for section in sections:
            if section.section_key == 'profile':
                profile = CompanyProfileSection.objects.filter(is_active=True).first()
                if profile:
                    data['profile'] = CompanyProfileSectionSerializer(profile).data
            elif section.section_key == 'history':
                history = CompanyHistory.objects.filter(is_active=True).first()
                if history:
                    data['history'] = CompanyHistorySerializer(history).data
            elif section.section_key == 'team':
                team = TeamMember.objects.filter(is_active=True).order_by('display_order')
                data['team'] = TeamMemberSerializer(team, many=True).data
            elif section.section_key == 'values':
                values = CompanyValue.objects.filter(is_active=True).order_by('display_order')
                data['values'] = CompanyValueSerializer(values, many=True).data
            elif section.section_key == 'impact':
                impacts = CompanyImpact.objects.filter(is_active=True).order_by('display_order')
                data['impact'] = CompanyImpactSerializer(impacts, many=True).data
            elif section.section_key == 'partners':
                partners = Partner.objects.filter(is_active=True).order_by('display_order')
                data['partners'] = PartnerSerializer(partners, many=True).data

        return Response(data)


class AboutPageSectionListView(generics.ListCreateAPIView):
    queryset = AboutPageSection.objects.all()
    serializer_class = AboutPageSectionSerializer


class AboutPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AboutPageSection.objects.all()
    serializer_class = AboutPageSectionSerializer


class CompanyProfileSectionListView(generics.ListCreateAPIView):
    queryset = CompanyProfileSection.objects.all()
    serializer_class = CompanyProfileSectionSerializer


class CompanyProfileSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CompanyProfileSection.objects.all()
    serializer_class = CompanyProfileSectionSerializer


class CompanyHistoryListView(generics.ListCreateAPIView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer


class CompanyHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer


class TeamMemberListView(generics.ListCreateAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class TeamMemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class CompanyValueListView(generics.ListCreateAPIView):
    queryset = CompanyValue.objects.all()
    serializer_class = CompanyValueSerializer


class CompanyValueDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CompanyValue.objects.all()
    serializer_class = CompanyValueSerializer


class CompanyImpactListView(generics.ListCreateAPIView):
    queryset = CompanyImpact.objects.all()
    serializer_class = CompanyImpactSerializer


class CompanyImpactDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CompanyImpact.objects.all()
    serializer_class = CompanyImpactSerializer


class PartnerListView(generics.ListCreateAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer


class PartnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
