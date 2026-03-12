from django.urls import path
from .views import HomepageAPIView, CertificationListCreateView, CertificationDetailView

urlpatterns = [
    path("homepage/", HomepageAPIView.as_view(), name="homepage-api"),
    path("certifications/", CertificationListCreateView.as_view(), name="certifications-list"),
    path("certifications/<int:pk>/", CertificationDetailView.as_view(), name="certifications-detail"),
]
