from django.urls import path
from . import views

urlpatterns = [
    path('', views.PortfolioPageDataView.as_view(), name='portfolio-data'),
    path('sections/', views.PortfolioPageSectionListView.as_view(), name='portfolio-sections'),
    path('sections/<int:pk>/', views.PortfolioPageSectionDetailView.as_view(), name='portfolio-section-detail'),
    path('intro/', views.PortfolioIntroListView.as_view(), name='portfolio-intro'),
    path('intro/<int:pk>/', views.PortfolioIntroDetailView.as_view(), name='portfolio-intro-detail'),
    path('categories/', views.PortfolioCategoryListView.as_view(), name='portfolio-categories'),
    path('categories/<int:pk>/', views.PortfolioCategoryDetailView.as_view(), name='portfolio-category-detail'),
    path('projects/', views.PortfolioProjectListView.as_view(), name='portfolio-projects'),
    path('projects/<int:pk>/', views.PortfolioProjectDetailView.as_view(), name='portfolio-project-detail'),
    path('images/', views.PortfolioProjectImageListView.as_view(), name='portfolio-images'),
    path('images/<int:pk>/', views.PortfolioProjectImageDetailView.as_view(), name='portfolio-image-detail'),
    path('highlights/', views.ProjectHighlightListView.as_view(), name='project-highlights'),
    path('highlights/<int:pk>/', views.ProjectHighlightDetailView.as_view(), name='project-highlight-detail'),
    path('cta/', views.PortfolioCTAListView.as_view(), name='portfolio-cta'),
    path('cta/<int:pk>/', views.PortfolioCTADetailView.as_view(), name='portfolio-cta-detail'),
]