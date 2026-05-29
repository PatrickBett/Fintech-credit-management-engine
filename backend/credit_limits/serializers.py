from .models import CreditAccount
from rest_framework import serializers

class CreditAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditAccount
        fields = "__all__"