from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    LoginView,
    LogoutView,
    MenuItemViewSet,
    ProfileView,
    RegisterView,
    RestaurantViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet)
router.register("restaurants", RestaurantViewSet)
router.register("menu-items", MenuItemViewSet)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("", include(router.urls)),
]
