from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    PortfolioIntro, PortfolioCategory, PortfolioProject,
    PortfolioProjectImage, ProjectHighlight, PortfolioCTA, PortfolioPageSection
)
from .serializers import (
    PortfolioIntroSerializer, PortfolioCategorySerializer, PortfolioProjectSerializer,
    PortfolioProjectImageSerializer, ProjectHighlightSerializer, PortfolioCTASerializer, PortfolioPageSectionSerializer
)


class PortfolioPageDataView(APIView):
    def get(self, request):
        # Get enabled sections in order
        sections = PortfolioPageSection.objects.filter(is_enabled=True).order_by('display_order')

        data = {
            'sections': PortfolioPageSectionSerializer(sections, many=True).data,
        }

        # Add data for each section if enabled
        for section in sections:
            if section.section_key == 'intro':
                intro = PortfolioIntro.objects.filter(is_active=True).first()
                if intro:
                    data['intro'] = PortfolioIntroSerializer(intro).data
            elif section.section_key == 'categories':
                categories = PortfolioCategory.objects.filter(is_active=True).order_by('display_order')
                data['categories'] = PortfolioCategorySerializer(categories, many=True).data
            elif section.section_key == 'projects':
                projects = PortfolioProject.objects.filter(is_active=True).order_by('display_order')
                data['projects'] = PortfolioProjectSerializer(projects, many=True).data
            elif section.section_key == 'cta':
                cta = PortfolioCTA.objects.filter(is_active=True).first()
                if cta:
                    data['cta'] = PortfolioCTASerializer(cta).data

        return Response(data)


class PortfolioPageSectionListView(generics.ListCreateAPIView):
    queryset = PortfolioPageSection.objects.all()
    serializer_class = PortfolioPageSectionSerializer


class PortfolioPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PortfolioPageSection.objects.all()
    serializer_class = PortfolioPageSectionSerializer


class PortfolioIntroListView(generics.ListCreateAPIView):
    queryset = PortfolioIntro.objects.all()
    serializer_class = PortfolioIntroSerializer


class PortfolioIntroDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PortfolioIntro.objects.all()
    serializer_class = PortfolioIntroSerializer


class PortfolioCategoryListView(generics.ListCreateAPIView):
    queryset = PortfolioCategory.objects.all()
    serializer_class = PortfolioCategorySerializer


class PortfolioCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PortfolioCategory.objects.all()
    serializer_class = PortfolioCategorySerializer


class PortfolioProjectListView(generics.ListCreateAPIView):
    queryset = PortfolioProject.objects.all()
    serializer_class = PortfolioProjectSerializer


class PortfolioProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PortfolioProject.objects.all()
    serializer_class = PortfolioProjectSerializer


class PortfolioProjectImageListView(generics.ListCreateAPIView):
    queryset = PortfolioProjectImage.objects.all()
    serializer_class = PortfolioProjectImageSerializer


class PortfolioProjectImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PortfolioProjectImage.objects.all()
    serializer_class = PortfolioProjectImageSerializer


class ProjectHighlightListView(generics.ListCreateAPIView):
    queryset = ProjectHighlight.objects.all()
    serializer_class = ProjectHighlightSerializer


class ProjectHighlightDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectHighlight.objects.all()
    serializer_class = ProjectHighlightSerializer


class PortfolioCTAListView(generics.ListCreateAPIView):
    queryset = PortfolioCTA.objects.all()
    serializer_class = PortfolioCTASerializer


class PortfolioCTADetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PortfolioCTA.objects.all()
    serializer_class = PortfolioCTASerializer
