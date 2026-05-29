from .models import Repayment
from rest_framework import serializers

class RepaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repayment
        fields = "__all__"