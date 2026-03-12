"""
Admin Panel URL Configuration
All API endpoints for the admin panel
"""
from django.urls import path
from . import views
# Use accounts app for authentication - it properly creates AdminSession records
from accounts.views import LoginView as AccountsLoginView
from accounts.views import LogoutView as AccountsLogoutView
from accounts.views import CheckAuthView as AccountsCheckAuthView

urlpatterns = [
    # ==================== AUTHENTICATION ====================
    # Use accounts app LoginView which creates AdminSession in database
    path('auth/login/', AccountsLoginView.as_view(), name='admin-login'),
    path('auth/logout/', AccountsLogoutView.as_view(), name='admin-logout'),
    path('auth/check/', AccountsCheckAuthView.as_view(), name='admin-check-auth'),
    
    # ==================== DASHBOARD ====================
    path('dashboard/stats/', views.DashboardStatsView.as_view(), name='dashboard-stats'),
    path('dashboard/recent-messages/', views.RecentMessagesView.as_view(), name='recent-messages'),
    
    # ==================== MEDIA UPLOAD ====================
    path('media/upload/', views.MediaUploadView.as_view(), name='media-upload'),

    # ==================== HOMEPAGE ====================
    # Hero Section
    path('homepage/hero/', views.HeroSectionListCreateView.as_view(), name='hero-list'),
    path('homepage/hero/<int:pk>/', views.HeroSectionDetailView.as_view(), name='hero-detail'),
    
    # Hero Images
    path('homepage/hero-images/', views.HeroImageListCreateView.as_view(), name='hero-image-list'),
    path('homepage/hero-images/<int:pk>/', views.HeroImageDetailView.as_view(), name='hero-image-detail'),
    
    # Intro Section
    path('homepage/intro/', views.IntroSectionListCreateView.as_view(), name='intro-list'),
    path('homepage/intro/<int:pk>/', views.IntroSectionDetailView.as_view(), name='intro-detail'),
    
    # Service Highlights
    path('homepage/service-highlights/', views.ServiceHighlightListCreateView.as_view(), name='service-highlight-list'),
    path('homepage/service-highlights/<int:pk>/', views.ServiceHighlightDetailView.as_view(), name='service-highlight-detail'),
    
    # Company Profile
    path('homepage/company-profile/', views.CompanyProfileListCreateView.as_view(), name='company-profile-list'),
    path('homepage/company-profile/<int:pk>/', views.CompanyProfileDetailView.as_view(), name='company-profile-detail'),
    
    # Testimonials
    path('homepage/testimonials/', views.TestimonialListCreateView.as_view(), name='testimonial-list'),
    path('homepage/testimonials/<int:pk>/', views.TestimonialDetailView.as_view(), name='testimonial-detail'),
    
    # Featured Projects
    path('homepage/featured-projects/', views.FeaturedProjectListCreateView.as_view(), name='featured-project-list'),
    path('homepage/featured-projects/<int:pk>/', views.FeaturedProjectDetailView.as_view(), name='featured-project-detail'),
    
    # Certifications
    path('homepage/certifications/', views.CertificationListCreateView.as_view(), name='certification-list'),
    path('homepage/certifications/<int:pk>/', views.CertificationDetailView.as_view(), name='certification-detail'),
    
    # Call to Action
    path('homepage/cta/', views.CallToActionListCreateView.as_view(), name='cta-list'),
    path('homepage/cta/<int:pk>/', views.CallToActionDetailView.as_view(), name='cta-detail'),
    
    # Section Toggles
    path('homepage/sections/', views.HomepageSectionListCreateView.as_view(), name='homepage-section-list'),
    path('homepage/sections/<int:pk>/', views.HomepageSectionDetailView.as_view(), name='homepage-section-detail'),

    # ==================== ABOUT PAGE ====================
    # Company Profile Section
    path('about/company-profile/', views.CompanyProfileSectionListCreateView.as_view(), name='about-company-profile-list'),
    path('about/company-profile/<int:pk>/', views.CompanyProfileSectionDetailView.as_view(), name='about-company-profile-detail'),
    
    # Company History
    path('about/history/', views.CompanyHistoryListCreateView.as_view(), name='company-history-list'),
    path('about/history/<int:pk>/', views.CompanyHistoryDetailView.as_view(), name='company-history-detail'),
    
    # Team Members
    path('about/team/', views.TeamMemberListCreateView.as_view(), name='team-member-list'),
    path('about/team/<int:pk>/', views.TeamMemberDetailView.as_view(), name='team-member-detail'),
    
    # Company Values
    path('about/values/', views.CompanyValueListCreateView.as_view(), name='company-value-list'),
    path('about/values/<int:pk>/', views.CompanyValueDetailView.as_view(), name='company-value-detail'),
    
    # Company Impact
    path('about/impact/', views.CompanyImpactListCreateView.as_view(), name='company-impact-list'),
    path('about/impact/<int:pk>/', views.CompanyImpactDetailView.as_view(), name='company-impact-detail'),
    
    # Partners
    path('about/partners/', views.PartnerListCreateView.as_view(), name='partner-list'),
    path('about/partners/<int:pk>/', views.PartnerDetailView.as_view(), name='partner-detail'),
    
    # Section Toggles
    path('about/sections/', views.AboutPageSectionListCreateView.as_view(), name='about-section-list'),
    path('about/sections/<int:pk>/', views.AboutPageSectionDetailView.as_view(), name='about-section-detail'),

    # ==================== SERVICES PAGE ====================
    # Page Intro
    path('services/intro/', views.ServicesPageIntroListCreateView.as_view(), name='services-intro-list'),
    path('services/intro/<int:pk>/', views.ServicesPageIntroDetailView.as_view(), name='services-intro-detail'),
    
    # Service Categories
    path('services/categories/', views.ServiceCategoryListCreateView.as_view(), name='service-category-list'),
    path('services/categories/<int:pk>/', views.ServiceCategoryDetailView.as_view(), name='service-category-detail'),
    
    # Services
    path('services/', views.ServiceListCreateView.as_view(), name='service-list'),
    path('services/<int:pk>/', views.ServiceDetailView.as_view(), name='service-detail'),
    
    # Service Process Steps
    path('services/process-steps/', views.ServiceProcessStepListCreateView.as_view(), name='process-step-list'),
    path('services/process-steps/<int:pk>/', views.ServiceProcessStepDetailView.as_view(), name='process-step-detail'),
    
    # Call to Action
    path('services/cta/', views.ServicesCTAListCreateView.as_view(), name='services-cta-list'),
    path('services/cta/<int:pk>/', views.ServicesCTADetailView.as_view(), name='services-cta-detail'),
    
    # Section Toggles
    path('services/sections/', views.ServicesPageSectionListCreateView.as_view(), name='services-section-list'),
    path('services/sections/<int:pk>/', views.ServicesPageSectionDetailView.as_view(), name='services-section-detail'),

    # ==================== PORTFOLIO PAGE ====================
    # Page Intro
    path('portfolio/intro/', views.PortfolioIntroListCreateView.as_view(), name='portfolio-intro-list'),
    path('portfolio/intro/<int:pk>/', views.PortfolioIntroDetailView.as_view(), name='portfolio-intro-detail'),
    
    # Portfolio Categories
    path('portfolio/categories/', views.PortfolioCategoryListCreateView.as_view(), name='portfolio-category-list'),
    path('portfolio/categories/<int:pk>/', views.PortfolioCategoryDetailView.as_view(), name='portfolio-category-detail'),
    
    # Portfolio Projects
    path('portfolio/projects/', views.PortfolioProjectListCreateView.as_view(), name='portfolio-project-list'),
    path('portfolio/projects/<int:pk>/', views.PortfolioProjectDetailView.as_view(), name='portfolio-project-detail'),
    
    # Portfolio Project Images
    path('portfolio/projects/<int:project_id>/images/', views.PortfolioProjectImageListCreateView.as_view(), name='portfolio-image-list'),
    path('portfolio/images/<int:pk>/', views.PortfolioProjectImageDetailView.as_view(), name='portfolio-image-detail'),
    
    # Project Highlights
    path('portfolio/projects/<int:project_id>/highlights/', views.ProjectHighlightListCreateView.as_view(), name='project-highlight-list'),
    path('portfolio/highlights/<int:pk>/', views.ProjectHighlightDetailView.as_view(), name='project-highlight-detail'),
    
    # Call to Action
    path('portfolio/cta/', views.PortfolioCTAListCreateView.as_view(), name='portfolio-cta-list'),
    path('portfolio/cta/<int:pk>/', views.PortfolioCTADetailView.as_view(), name='portfolio-cta-detail'),
    
    # Section Toggles
    path('portfolio/sections/', views.PortfolioPageSectionListCreateView.as_view(), name='portfolio-section-list'),
    path('portfolio/sections/<int:pk>/', views.PortfolioPageSectionDetailView.as_view(), name='portfolio-section-detail'),

    # ==================== CONTACT PAGE ====================
    # Page Intro
    path('contact/intro/', views.ContactPageIntroListCreateView.as_view(), name='contact-intro-list'),
    path('contact/intro/<int:pk>/', views.ContactPageIntroDetailView.as_view(), name='contact-intro-detail'),
    
    # Contact Info
    path('contact/info/', views.ContactInfoListCreateView.as_view(), name='contact-info-list'),
    path('contact/info/<int:pk>/', views.ContactInfoDetailView.as_view(), name='contact-info-detail'),
    
    # Office Locations
    path('contact/locations/', views.OfficeLocationListCreateView.as_view(), name='office-location-list'),
    path('contact/locations/<int:pk>/', views.OfficeLocationDetailView.as_view(), name='office-location-detail'),
    
    # Contact Messages
    path('contact/messages/', views.ContactMessageListView.as_view(), name='contact-message-list'),
    path('contact/messages/<int:pk>/', views.ContactMessageDetailView.as_view(), name='contact-message-detail'),
    path('contact/messages/<int:pk>/mark-read/', views.MarkMessageAsReadView.as_view(), name='mark-message-read'),
    
    # Form Settings
    path('contact/settings/', views.ContactFormSettingsListCreateView.as_view(), name='contact-settings-list'),
    path('contact/settings/<int:pk>/', views.ContactFormSettingsDetailView.as_view(), name='contact-settings-detail'),
    
    # Call to Action
    path('contact/cta/', views.ContactCTAListCreateView.as_view(), name='contact-cta-list'),
    path('contact/cta/<int:pk>/', views.ContactCTADetailView.as_view(), name='contact-cta-detail'),
    
    # Section Toggles
    path('contact/sections/', views.ContactPageSectionListCreateView.as_view(), name='contact-section-list'),
    path('contact/sections/<int:pk>/', views.ContactPageSectionDetailView.as_view(), name='contact-section-detail'),

    # ==================== CERTIFICATIONS PAGE ====================
    # Page Intro
    path('certifications/intro/', views.CertificationPageIntroListCreateView.as_view(), name='cert-intro-list'),
    path('certifications/intro/<int:pk>/', views.CertificationPageIntroDetailView.as_view(), name='cert-intro-detail'),
    
    # Certification Notice
    path('certifications/notice/', views.CertificationNoticeListCreateView.as_view(), name='cert-notice-list'),
    path('certifications/notice/<int:pk>/', views.CertificationNoticeDetailView.as_view(), name='cert-notice-detail'),
    
    # Call to Action
    path('certifications/cta/', views.CertificationCTAListCreateView.as_view(), name='cert-cta-list'),
    path('certifications/cta/<int:pk>/', views.CertificationCTADetailView.as_view(), name='cert-cta-detail'),
    
    # Section Toggles
    path('certifications/sections/', views.CertificationPageSectionListCreateView.as_view(), name='cert-section-list'),
    path('certifications/sections/<int:pk>/', views.CertificationPageSectionDetailView.as_view(), name='cert-section-detail'),

    # ==================== QUOTES ====================
    path('quotes/', views.QuoteRequestListView.as_view(), name='quote-list'),
    path('quotes/<int:pk>/', views.QuoteRequestDetailView.as_view(), name='quote-detail'),
]

