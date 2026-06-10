from .models import Employer, EmployerFinancialSnapshot
from rest_framework import serializers


class EmployerFinancialSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerFinancialSnapshot
        fields = "__all__"
class EmployerSerializer(serializers.ModelSerializer):
    financial = EmployerFinancialSnapshotSerializer(read_only=True)
    class Meta:
        model = Employer
        fields = "__all__"