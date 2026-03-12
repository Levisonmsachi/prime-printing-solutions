# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import AdminProfile, AdminSession, AdminActionLog, APIToken, LoginAttempt


class UserSerializer(serializers.ModelSerializer):
    """
    Basic User serializer
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class UserCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new users (admin only)
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password2', 'email', 'first_name', 'last_name', 'is_staff']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating users
    """
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'is_staff']


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password2 = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "Password fields didn't match."})
        return attrs


class AdminProfileSerializer(serializers.ModelSerializer):
    """
    Admin Profile serializer
    """
    user_details = UserSerializer(source='user', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = AdminProfile
        fields = [
            'id', 'user', 'user_details', 'username', 'email',
            'phone', 'profile_picture',
            'is_active', 'last_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at', 'last_active']


class AdminProfileUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating admin profile
    """
    class Meta:
        model = AdminProfile
        fields = ['phone', 'profile_picture']


class AdminSessionSerializer(serializers.ModelSerializer):
    """
    Admin Session serializer
    """
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = AdminSession
        fields = [
            'id', 'user', 'username', 'session_token',
            'ip_address', 'user_agent', 'device_info',
            'login_time', 'last_activity', 'logout_time', 'is_active'
        ]
        read_only_fields = ['id', 'user', 'session_token', 'login_time']


class AdminActionLogSerializer(serializers.ModelSerializer):
    """
    Admin Action Log serializer
    """
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = AdminActionLog
        fields = [
            'id', 'user', 'username', 'action_type',
            'content_type', 'object_id', 'object_repr',
            'description', 'data_before', 'data_after',
            'ip_address', 'user_agent', 'timestamp'
        ]
        read_only_fields = ['id', 'timestamp']


class APITokenSerializer(serializers.ModelSerializer):
    """
    API Token serializer
    """
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = APIToken
        fields = [
            'id', 'user', 'username', 'token',
            'name', 'expires_at', 'last_used',
            'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'token', 'created_at', 'last_used']


class LoginAttemptSerializer(serializers.ModelSerializer):
    """
    Login Attempt serializer
    """
    class Meta:
        model = LoginAttempt
        fields = ['id', 'username', 'ip_address', 'user_agent', 'was_successful', 'timestamp']


# Authentication serializers
class LoginSerializer(serializers.Serializer):
    """
    Login serializer
    """
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, style={'input_type': 'password'})
    remember_me = serializers.BooleanField(default=False)


class LoginResponseSerializer(serializers.Serializer):
    """
    Login response serializer
    """
    token = serializers.CharField()
    user = UserSerializer()
    session_id = serializers.IntegerField()
    expires_in = serializers.IntegerField()