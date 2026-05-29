from .models import Customer, Product,  CreditProfile, CustomerKYC
from rest_framework import serializers

class CustomerSerializer(serializers.ModelSerializer):
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