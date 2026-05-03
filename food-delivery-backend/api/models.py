from django.conf import settings
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Restaurant(models.Model):
    name = models.CharField(max_length=150)
    image = models.URLField(max_length=500)
    rating = models.FloatField()
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="restaurants",
    )

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.URLField(max_length=500)
    is_veg = models.BooleanField()
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name="menu_items",
    )

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    phone = models.CharField(max_length=10)

    def __str__(self):
        return self.user.get_full_name() or self.user.email
