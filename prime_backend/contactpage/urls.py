from django.urls import path
from . import views

app_name = "contactpage"

urlpatterns = [
    path("page-data/", views.ContactPageDataView.as_view(), name="page-data"),
    path("intro/", views.ContactPageIntroView.as_view(), name="intro"),
    path("info/", views.ContactInfoView.as_view(), name="info"),
    path("locations/", views.OfficeLocationListView.as_view(), name="locations"),
    path("locations/<int:pk>/", views.OfficeLocationDetailView.as_view(), name="location-detail"),
    path("messages/", views.ContactMessageListView.as_view(), name="messages"),
    path("messages/<int:pk>/", views.ContactMessageDetailView.as_view(), name="message-detail"),
    path("form-settings/", views.ContactFormSettingsView.as_view(), name="form-settings"),
    path("cta/", views.ContactCTAView.as_view(), name="cta"),
    path("sections/", views.ContactPageSectionListView.as_view(), name="sections"),
    path("sections/<int:pk>/", views.ContactPageSectionDetailView.as_view(), name="section-detail"),
]