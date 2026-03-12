from django.urls import path
from . import views

app_name = "certifications"

urlpatterns = [
    path("page-data/", views.CertificationPageDataView.as_view(), name="page-data"),
    path("intro/", views.CertificationPageIntroView.as_view(), name="intro"),
    path("notice/", views.CertificationNoticeView.as_view(), name="notice"),
    path("cta/", views.CertificationCTAView.as_view(), name="cta"),
    path("sections/", views.CertificationPageSectionListView.as_view(), name="sections"),
    path("sections/<int:pk>/", views.CertificationPageSectionDetailView.as_view(), name="section-detail"),
]