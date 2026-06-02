from .models import Payment, PaymentMethod, PaymentStatus, PaymentFor
from patients.models import Customer
from employers.models import Employer
from transactions.models import Transaction

from rest_framework import serializers
from transactions.serializers import TransactionSerializer, LoanStatusSerializer, LoanStageSerializer
from transactions.models import Transaction, LoanStatus, LoanStage
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
    loan = serializers.PrimaryKeyRelatedField(queryset=Transaction.objects.all())
    loan_detail = TransactionSerializer(
    source="loan",
    read_only=True
)
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    customer_detail = CustomerSerializer(
    source="customer",
    read_only=True
)
    group = serializers.PrimaryKeyRelatedField(queryset=Employer.objects.all())
    group_detail = EmployerSerializer(
    source="group",
    read_only=True
)
    # stage = serializers.PrimaryKeyRelatedField(queryset=LoanStage.objects.all())
    stage = LoanStageSerializer(read_only=True)
    stage_detail = LoanStageSerializer(
    source="stage",
    read_only=True
)


#     status = serializers.PrimaryKeyRelatedField(queryset=LoanStatus.objects.all())
#     status_detail = LoanStatusSerializer(
#     source="status",
#     read_only=True
# )


    payment_method = serializers.PrimaryKeyRelatedField(queryset=PaymentMethod.objects.all())
    payment_method_detail = PaymentMethodSerializer(
    source="payment_method",
    read_only=True
)
    status = serializers.PrimaryKeyRelatedField(queryset=PaymentStatus.objects.all())
    status_detail = PaymentStatusSerializer(source="status",
    read_only=True)

    payment_for = serializers.PrimaryKeyRelatedField(queryset=PaymentFor.objects.all())
    payment_for_detail = PaymentForSerializer(
    source="payment_for",
    read_only=True
)

    class Meta:
        model = Payment
        fields = "__all__"