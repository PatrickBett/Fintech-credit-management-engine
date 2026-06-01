from .models import Transaction, LoanStatus, LoanStage
from rest_framework import serializers




class LoanStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanStatus
        fields = "__all__"

class LoanStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanStage
        fields = "__all__"

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"