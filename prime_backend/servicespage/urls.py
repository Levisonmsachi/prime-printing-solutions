from django.urls import path
from . import views

app_name = "servicespage"

urlpatterns = [
    path("page-data/", views.ServicesPageDataView.as_view(), name="page-data"),
    path("intro/", views.ServicesPageIntroView.as_view(), name="intro"),
    path("categories/", views.ServiceCategoryListView.as_view(), name="categories"),
    path("categories/<int:pk>/", views.ServiceCategoryDetailView.as_view(), name="category-detail"),
    path("services/", views.ServiceListView.as_view(), name="services"),
    path("services/<int:pk>/", views.ServiceDetailView.as_view(), name="service-detail"),
    path("process-steps/", views.ServiceProcessStepListView.as_view(), name="process-steps"),
    path("process-steps/<int:pk>/", views.ServiceProcessStepDetailView.as_view(), name="process-step-detail"),
    path("cta/", views.ServicesCTAView.as_view(), name="cta"),
    path("sections/", views.ServicesPageSectionListView.as_view(), name="sections"),
    path("sections/<int:pk>/", views.ServicesPageSectionDetailView.as_view(), name="section-detail"),
]