from django.urls import path
from . import views

urlpatterns = [
    path('', views.AboutPageDataView.as_view(), name='about-data'),
    path('sections/', views.AboutPageSectionListView.as_view(), name='about-sections'),
    path('sections/<int:pk>/', views.AboutPageSectionDetailView.as_view(), name='about-section-detail'),
    path('profile/', views.CompanyProfileSectionListView.as_view(), name='company-profile'),
    path('profile/<int:pk>/', views.CompanyProfileSectionDetailView.as_view(), name='company-profile-detail'),
    path('history/', views.CompanyHistoryListView.as_view(), name='company-history'),
    path('history/<int:pk>/', views.CompanyHistoryDetailView.as_view(), name='company-history-detail'),
    path('team/', views.TeamMemberListView.as_view(), name='team-members'),
    path('team/<int:pk>/', views.TeamMemberDetailView.as_view(), name='team-member-detail'),
    path('values/', views.CompanyValueListView.as_view(), name='company-values'),
    path('values/<int:pk>/', views.CompanyValueDetailView.as_view(), name='company-value-detail'),
    path('impact/', views.CompanyImpactListView.as_view(), name='company-impact'),
    path('impact/<int:pk>/', views.CompanyImpactDetailView.as_view(), name='company-impact-detail'),
    path('partners/', views.PartnerListView.as_view(), name='partners'),
    path('partners/<int:pk>/', views.PartnerDetailView.as_view(), name='partner-detail'),
]