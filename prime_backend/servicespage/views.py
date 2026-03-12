from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import (
    ServicesPageIntro,
    ServiceCategory,
    Service,
    ServiceProcessStep,
    ServicesCTA,
    ServicesPageSection,
)
from .serializers import (
    ServicesPageIntroSerializer,
    ServiceCategorySerializer,
    ServiceSerializer,
    ServiceProcessStepSerializer,
    ServicesCTASerializer,
    ServicesPageSectionSerializer,
)


class ServicesPageDataView(APIView):
    """
    Returns all data needed for the services page
    """
    def get(self, request):
        # Get enabled sections
        enabled_sections = ServicesPageSection.objects.filter(is_enabled=True).order_by("display_order")

        data = {
            "sections": ServicesPageSectionSerializer(enabled_sections, many=True).data,
        }

        # Add data for each enabled section
        for section in enabled_sections:
            if section.section_key == "intro":
                intro = ServicesPageIntro.objects.filter(is_active=True).first()
                if intro:
                    data["intro"] = ServicesPageIntroSerializer(intro).data

            elif section.section_key == "categories":
                categories = ServiceCategory.objects.filter(is_active=True).prefetch_related("services")
                data["categories"] = ServiceCategorySerializer(categories, many=True, context={"request": request}).data

            elif section.section_key == "featured_services":
                featured_services = Service.objects.filter(is_active=True, is_featured=True).select_related("category")
                data["featured_services"] = ServiceSerializer(featured_services, many=True, context={"request": request}).data

            elif section.section_key == "all_services":
                all_services = Service.objects.filter(is_active=True).select_related("category").prefetch_related("process_steps")
                data["all_services"] = ServiceSerializer(all_services, many=True, context={"request": request}).data

            elif section.section_key == "process":
                # Process steps are included in the service serializer
                pass

            elif section.section_key == "cta":
                cta = ServicesCTA.objects.filter(is_active=True).first()
                if cta:
                    data["cta"] = ServicesCTASerializer(cta).data

        return Response(data)


class ServicesPageIntroView(generics.RetrieveUpdateAPIView):
    queryset = ServicesPageIntro.objects.all()
    serializer_class = ServicesPageIntroSerializer

    def get_object(self):
        return ServicesPageIntro.objects.filter(is_active=True).first() or ServicesPageIntro.objects.create()


class ServiceCategoryListView(generics.ListCreateAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer


class ServiceCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer


class ServiceListView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ServiceProcessStepListView(generics.ListCreateAPIView):
    queryset = ServiceProcessStep.objects.all()
    serializer_class = ServiceProcessStepSerializer


class ServiceProcessStepDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServiceProcessStep.objects.all()
    serializer_class = ServiceProcessStepSerializer


class ServicesCTAView(generics.RetrieveUpdateAPIView):
    queryset = ServicesCTA.objects.all()
    serializer_class = ServicesCTASerializer

    def get_object(self):
        return ServicesCTA.objects.filter(is_active=True).first() or ServicesCTA.objects.create()


class ServicesPageSectionListView(generics.ListCreateAPIView):
    queryset = ServicesPageSection.objects.all()
    serializer_class = ServicesPageSectionSerializer


class ServicesPageSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServicesPageSection.objects.all()
    serializer_class = ServicesPageSectionSerializer
