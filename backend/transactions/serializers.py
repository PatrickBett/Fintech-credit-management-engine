from .models import Transaction, LoanStatus, LoanStage,LoanOfficer, CreditOfficer, Collector
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
class LoanOfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanOfficer
        fields = "__all__"
class CreditOfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditOfficer
        fields = "__all__"
class CollectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collector
        fields = "__all__"

class TransactionSerializer(serializers.ModelSerializer):
    
    stage = LoanStageSerializer(read_only=True)
   
    stage_id = serializers.PrimaryKeyRelatedField(
        queryset=LoanStage.objects.all(),
        source="stage",
        write_only=True
    )
    customer = CustomerSerializer(read_only=True)
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(),
        source="customer",
        write_only=True
    )
    class Meta:
        model = Transaction
        fields = "__all__"
