# accounts/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tokens', views.APITokenViewSet, basename='api-token')

urlpatterns = [
    # Authentication
    path('auth/login/', views.LoginView.as_view(), name='auth-login'),
    path('auth/logout/', views.LogoutView.as_view(), name='auth-logout'),
    path('auth/check/', views.CheckAuthView.as_view(), name='auth-check'),
    path('auth/change-password/', views.ChangePasswordView.as_view(), name='auth-change-password'),
    
    # User Management
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    
    # Profile
    path('profile/', views.AdminProfileView.as_view(), name='admin-profile'),
    
    # Sessions
    path('sessions/', views.UserSessionsView.as_view(), name='user-sessions'),
    path('sessions/<int:session_id>/terminate/', views.TerminateSessionView.as_view(), name='terminate-session'),
    path('sessions/terminate-all/', views.TerminateAllSessionsView.as_view(), name='terminate-all-sessions'),
    
    # API Tokens (via router)
    path('', include(router.urls)),
    
    # Audit Logs
    path('audit-logs/', views.AdminActionLogListView.as_view(), name='audit-logs'),
    
    # Dashboard
    path('dashboard/', views.AdminDashboardView.as_view(), name='admin-dashboard'),
]