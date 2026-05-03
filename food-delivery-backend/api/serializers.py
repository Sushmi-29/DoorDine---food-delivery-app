from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Category, MenuItem, Restaurant, UserProfile


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class RestaurantSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Restaurant
        fields = '__all__'


class MenuItemSerializer(serializers.ModelSerializer):
    restaurant = RestaurantSerializer()

    class Meta:
        model = MenuItem
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="first_name")
    phone = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ("id", "name", "email", "phone")

    def get_phone(self, obj):
        profile = getattr(obj, "profile", None)
        return profile.phone if profile else ""


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=10)
    password = serializers.CharField(min_length=6, write_only=True)

    def validate_email(self, value):
        normalized_email = value.strip().lower()
        User = get_user_model()

        if User.objects.filter(email__iexact=normalized_email).exists():
            raise serializers.ValidationError("User already exists")

        return normalized_email

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number must be 10 digits")

        return value

    def create(self, validated_data):
        User = get_user_model()
        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            first_name=validated_data["name"],
            password=validated_data["password"],
        )
        UserProfile.objects.create(user=user, phone=validated_data["phone"])

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        User = get_user_model()
        email = attrs["email"].strip().lower()
        password = attrs["password"]
        user = User.objects.filter(email__iexact=email).first()

        if not user or not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")

        if not user.is_active:
            raise serializers.ValidationError("This account is disabled")

        attrs["user"] = user
        return attrs
