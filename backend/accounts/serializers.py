# accounts/serializers.py

from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from .models import CustomUser, UserRole
from patients.models import Customer


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )

    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "username",
            "password",
            "confirm_password",
            "role",
            "national_id",
        ]

    def validate(self, attrs):

        password = attrs.get("password")
        confirm_password = attrs.get("confirm_password")
        national_id = attrs.get("national_id")
        role = attrs.get("role")

        # passwords match
        if password != confirm_password:
            raise serializers.ValidationError({
                "password": "Passwords do not match."
            })

        # national id required for employees
        if role == UserRole.EMPLOYEE:

            if not national_id:
                raise serializers.ValidationError({
                    "national_id": "National ID is required."
                })

            # customer must exist
            try:
                customer = Customer.objects.get(
                    national_id=national_id
                )

            except Customer.DoesNotExist:
                raise serializers.ValidationError({
                    "national_id": "Customer record not found."
                })

            # prevent duplicate account
            if hasattr(customer, "user_account"):
                raise serializers.ValidationError({
                    "national_id": "This customer already has an account."
                })

            attrs["customer_instance"] = customer

        return attrs

    def create(self, validated_data):

        validated_data.pop("confirm_password")

        customer = validated_data.pop(
            "customer_instance",
            None
        )

        password = validated_data.pop("password")

        user = CustomUser(**validated_data)

        # link customer
        if customer:
            user.customer = customer

            # optional autofill
            user.first_name = customer.first_name
            user.last_name = customer.last_name

            if customer.email:
                user.email = customer.email

        user.set_password(password)

        user.save()

        return user