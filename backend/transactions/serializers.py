from .models import Transaction, LoanStatus, LoanStage
from rest_framework import serializers
from patients.models import Customer
from patients.serializers import CustomerSerializer



class LoanStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanStatus
        fields = "__all__"

class LoanStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanStage
        fields = "__all__"

class TransactionSerializer(serializers.ModelSerializer):
    status = LoanStatusSerializer(read_only=True)
    stage = LoanStageSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    class Meta:
        model = Transaction
        fields = "__all__"