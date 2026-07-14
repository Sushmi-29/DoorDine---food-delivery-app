from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters 
from django_filters.rest_framework import DjangoFilterBackend

from .authentication import JWTAuthentication, create_jwt_for_user
from .models import Category, MenuItem, Restaurant
from .serializers import (
    CategorySerializer,
    LoginSerializer,
    MenuItemSerializer,
    RegisterSerializer,
    RestaurantSerializer,
    UserSerializer,
)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {
                "message": "Registration successful",
                "user": UserSerializer(user).data,
            },
            status=201,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        return Response(
            {
                "message": "Login successful",
                "token": create_jwt_for_user(user),
                "user": UserSerializer(user).data,
            }
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # JWT logout is handled on the client by deleting the stored token.
        return Response({"message": "Logout successful"})


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer



class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.select_related("category").all().order_by("name")
    serializer_class = RestaurantSerializer

    # 🔥 ADD THIS
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'category__name']

    @action(detail=True, methods=['get'])
    def menu(self, request, pk=None):
        items = MenuItem.objects.filter(restaurant_id=pk)
        serializer = MenuItemSerializer(items, many=True)
        return Response(serializer.data)




class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.select_related("restaurant").all().order_by("name")
    serializer_class = MenuItemSerializer

    # 🔥 ADD THIS
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_veg']
