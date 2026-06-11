from .models import Customer, Product,  CreditProfile, CustomerKYC, Referee
from employers.models import Employer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from employers.serializers import EmployerSerializer


User = get_user_model()


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]  # or first_name, last_name

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class CreditProfileSerializer(serializers.ModelSerializer):
    product_details= ProductSerializer(source="product", read_only=True)
    class Meta:
        model = CreditProfile
        fields = "__all__"

class CustomerKYCSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerKYC
        fields = "__all__"
class RefereeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referee
        fields = "__all__"
class CustomerSerializer(serializers.ModelSerializer):
    added_by = UserMiniSerializer(read_only=True)
    employer = serializers.PrimaryKeyRelatedField(
        queryset=Employer.objects.all(),
        required=False,
        allow_null=True
    )
    

    employer_detail = EmployerSerializer(source="employer", read_only=True)
    customerkyc = serializers.PrimaryKeyRelatedField(
        queryset=CustomerKYC.objects.all(),
        required=False,
        allow_null=True
    )
    

    customerkyc_details = CustomerKYCSerializer(source="customerkyc", read_only=True)
    creditprofile_details = CreditProfileSerializer(source="creditprofile", read_only=True)
    # transactions_details = serializers.SerializerMethodField()
    class Meta:
        model = Customer
        fields = "__all__"
   