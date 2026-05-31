from .models import Customer, Product,  CreditProfile, CustomerKYC
from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]  # or first_name, last_name

class CustomerSerializer(serializers.ModelSerializer):
    added_by = UserMiniSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class CreditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditProfile
        fields = "__all__"

class CustomerKYCSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerKYC
        fields = "__all__"