from .models import Payment, PaymentMethod, PaymentStatus, PaymentFor
from rest_framework import serializers
from transactions.serializers import TransactionSerializer, LoanStatusSerializer, LoanStageSerializer
from transactions.models import Transaction
from patients.serializers import CustomerSerializer
from employers.serializers import EmployerSerializer



class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = "__all__"
class PaymentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentStatus
        fields = "__all__"
class PaymentForSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentFor
        fields = "__all__"
class PaymentSerializer(serializers.ModelSerializer):
    loan = TransactionSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    group = EmployerSerializer(read_only=True)
    stage = LoanStageSerializer(read_only=True)
    status = LoanStatusSerializer(read_only=True)
    payment_method = PaymentMethodSerializer(read_only=True)
    payment_status = PaymentStatusSerializer(read_only=True)
    payment_for = PaymentForSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = "__all__"