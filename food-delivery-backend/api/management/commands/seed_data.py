from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import Category, MenuItem, Restaurant


class Command(BaseCommand):
    help = "Seed clean realistic restaurant data"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Clear old data before seeding",
        )

    def handle(self, *args, **options):
        print("seeding started...")

        with transaction.atomic():
            if options.get("clear"):
                MenuItem.objects.all().delete()
                Restaurant.objects.all().delete()
                Category.objects.all().delete()

            categories = {
                "Biryani": Category.objects.get_or_create(name="Biryani")[0],
                "Pizza": Category.objects.get_or_create(name="Pizza")[0],
                "Burgers": Category.objects.get_or_create(name="Burgers")[0],
                "South Indian": Category.objects.get_or_create(name="South Indian")[0],
                "North Indian": Category.objects.get_or_create(name="North Indian")[0],
                "Chinese": Category.objects.get_or_create(name="Chinese")[0],
                "Desserts": Category.objects.get_or_create(name="Desserts")[0],
            }

            restaurant_images = {
    "Meghana Foods": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Empire Restaurant": "https://images.unsplash.com/photo-1681546898018-961e2a05c6fa?q=80&w=604&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Paradise Biryani": "https://images.unsplash.com/photo-1775039983787-3fe9b416c545?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Mani's Dum Biryani": "https://images.unsplash.com/photo-1755090154731-6b4f221490c3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Behrouz Biryani": "https://images.unsplash.com/photo-1696950169706-d4533c32f81a?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Dominos Pizza": "https://plus.unsplash.com/premium_photo-1667682942148-a0c98d1d70db?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Pizza Hut": "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=443&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Oven Story Pizza": "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Burger King": "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "KFC": "https://plus.unsplash.com/premium_photo-1683139916670-38113db90cb9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Truffles": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=894&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "A2B Adyar Ananda Bhavan": "https://images.unsplash.com/photo-1742281258189-3b933879867a?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "MTR": "https://images.unsplash.com/photo-1694849789325-914b71ab4075?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Udupi Upahar": "https://images.unsplash.com/photo-1680359871322-aabe6b33eff5?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Madurai Idly Shop": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Punjabi Rasoi": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Delhi Highway": "https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Shiv Sagar": "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Beijing Bites": "https://images.unsplash.com/photo-1617622141573-2e00d8818f3f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Mainland China": "https://plus.unsplash.com/premium_photo-1694670234085-4f38b261ce5b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Chung Wah": "https://plus.unsplash.com/premium_photo-1669742927923-32d9ee86887c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Corner House": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Cream Stone": "https://images.unsplash.com/photo-1702827402870-7c33dc7b67be?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Natural Ice Cream": "https://images.unsplash.com/photo-1633933358116-a27b902fad35?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Belgian Waffle Co": "https://images.unsplash.com/photo-1459789034005-ba29c5783491?q=80&w=638&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Smoor": "https://images.unsplash.com/photo-1650419424455-d0513aaf0dd6?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}

            restaurant_data = [
                ("Meghana Foods", "Biryani"),
                ("Empire Restaurant", "Biryani"),
                ("Paradise Biryani", "Biryani"),
                ("Mani's Dum Biryani", "Biryani"),
                ("Behrouz Biryani", "Biryani"),
                ("Dominos Pizza", "Pizza"),
                ("Pizza Hut", "Pizza"),
                ("Oven Story Pizza", "Pizza"),
                ("Burger King", "Burgers"),
                ("KFC", "Burgers"),
                ("Truffles", "Burgers"),
                ("A2B Adyar Ananda Bhavan", "South Indian"),
                ("MTR", "South Indian"),
                ("Udupi Upahar", "South Indian"),
                ("Madurai Idly Shop", "South Indian"),
                ("Punjabi Rasoi", "North Indian"),
                ("Delhi Highway", "North Indian"),
                ("Shiv Sagar", "North Indian"),
                ("Beijing Bites", "Chinese"),
                ("Mainland China", "Chinese"),
                ("Chung Wah", "Chinese"),
                ("Corner House", "Desserts"),
                ("Cream Stone", "Desserts"),
                ("Natural Ice Cream", "Desserts"),
                ("Belgian Waffle Co", "Desserts"),
                ("Smoor", "Desserts"),
            ]

            menu_map = {
                "Biryani": [
                    "Chicken Biryani",
                    "Mutton Biryani",
                    "Egg Biryani",
                    "Veg Biryani",
                ],
                "Pizza": [
                    "Margherita Pizza",
                    "Farmhouse Pizza",
                    "Paneer Pizza",
                    "Chicken Pizza",
                ],
                "Burgers": [
                    "Veg Burger",
                    "Chicken Burger",
                    "Cheese Burger",
                    "Fries",
                ],
                "South Indian": [
                    "Masala Dosa",
                    "Idli Vada",
                    "Rava Dosa",
                    "Uttapam",
                ],
                "North Indian": [
                    "Butter Chicken",
                    "Paneer Butter Masala",
                    "Dal Makhani",
                    "Naan",
                ],
                "Chinese": [
                    "Veg Noodles",
                    "Chicken Fried Rice",
                    "Chilli Paneer",
                    "Manchurian",
                ],
                "Desserts": [
                    "Ice Cream",
                    "Chocolate Brownie",
                    "Gulab Jamun",
                    "Waffle",
                ],
            }

            menu_images = {
    "Chicken Biryani": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Mutton Biryani": "https://images.unsplash.com/photo-1691170979035-27e5ec943205?q=80&w=411&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Egg Biryani": "https://images.unsplash.com/photo-1724331567780-8bcff2ca3ec9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Veg Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=510&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Margherita Pizza": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Farmhouse Pizza": "https://plus.unsplash.com/premium_photo-1733306588881-0411931d4fed?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Paneer Pizza": "https://images.unsplash.com/photo-1665033628673-7de125eb6b12?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Chicken Pizza": "https://images.unsplash.com/photo-1671106681075-5a7233268cbd?q=80&w=734&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Veg Burger": "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Chicken Burger": "https://images.unsplash.com/photo-1606149059549-6042addafc5a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Cheese Burger": "https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Fries": "https://plus.unsplash.com/premium_photo-1672774750509-bc9ff226f3e8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Masala Dosa": "https://images.unsplash.com/photo-1751560455942-f859f1215826?q=80&w=466&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Idli Vada": "https://images.unsplash.com/photo-1736239093796-68c998a84b96?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Rava Dosa": "https://images.unsplash.com/photo-1662174485500-6d32a13c060e?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Uttapam": "https://images.unsplash.com/photo-1725483990070-509319bc6ecc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Butter Chicken": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Paneer Butter Masala": "https://images.unsplash.com/photo-1772730064951-89b427965dbc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Dal Makhani": "https://images.unsplash.com/photo-1736680056444-02b10f16a245?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Naan": "https://images.unsplash.com/photo-1697155406014-04dc649b0953?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Veg Noodles": "https://plus.unsplash.com/premium_photo-1674511582428-58ce834ce172?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Chicken Fried Rice": "https://plus.unsplash.com/premium_photo-1695029503064-efb05b962169?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Chilli Paneer": "https://images.unsplash.com/photo-1604579659931-f42436a8368c?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Manchurian": "https://images.unsplash.com/photo-1750190624738-388a95f67131?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "Ice Cream": "https://images.unsplash.com/photo-1598268121084-c8f7126e0cef?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Chocolate Brownie": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Gulab Jamun": "https://almondhouse.com/cdn/shop/files/1_IMG_9491_1e1968b7-b144-49ba-a4ed-2659e95a3bcb.jpg?v=1703680462",
    "Waffle": "https://plus.unsplash.com/premium_photo-1664478254358-fb8ce668dca6?q=80&w=691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}

            for name, category_name in restaurant_data:
                print(f"Creating restaurant: {name}")

                restaurant = Restaurant.objects.create(
                    name=name,
                    category=categories[category_name],
                    rating=4.2,
                    image=restaurant_images.get(name, ""),
                )

                for item in menu_map.get(category_name, []):
                    MenuItem.objects.create(
                        name=item,
                        description=f"{item} from {name}",
                        price=Decimal("150.00"),
                        is_veg=not any(
                            keyword in item.lower()
                            for keyword in ["chicken", "mutton", "egg"]
                        ),
                        restaurant=restaurant,
                        image=menu_images.get(item, ""),
                    )

        self.stdout.write(self.style.SUCCESS("Clean realistic data inserted"))
