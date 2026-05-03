from django.contrib import admin

from .models import Category, MenuItem, Restaurant, UserProfile


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "rating", "category")
    list_filter = ("category",)
    search_fields = ("name", "category__name")


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "restaurant", "price", "is_veg")
    list_filter = ("is_veg", "restaurant")
    search_fields = ("name", "restaurant__name")


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "phone")
    search_fields = ("user__first_name", "user__email", "phone")
