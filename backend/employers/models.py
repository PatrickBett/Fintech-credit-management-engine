from decimal import Decimal
from django.db import models
from core.models import TimeStampedModel


class EmployerStatus(models.TextChoices):
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"
    CLOSED = "CLOSED"


class RiskTier(models.TextChoices):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class DeductionCycle(models.TextChoices):
    MONTHLY = "MONTHLY"
    WEEKLY = "WEEKLY"
    BIWEEKLY = "BIWEEKLY"


class Employer(TimeStampedModel):
    """
    Core Employer / Group / SACCO entity
    """

    name = models.CharField(max_length=255, unique=True)
    code = models.CharField(max_length=50, unique=True)

    # Basic group info (matches your UI)
    description = models.TextField(null=True, blank=True)
    branch = models.CharField(max_length=100, null=True, blank=True)
    chairman = models.CharField(max_length=255, null=True, blank=True)
    contact_phone = models.CharField(max_length=20, null=True, blank=True)

    status = models.CharField(
        max_length=20,
        choices=EmployerStatus.choices,
        default=EmployerStatus.ACTIVE
    )

    risk_tier = models.CharField(
        max_length=20,
        choices=RiskTier.choices,
        default=RiskTier.MEDIUM
    )

    deduction_cycle = models.CharField(
        max_length=20,
        choices=DeductionCycle.choices,
        default=DeductionCycle.MONTHLY
    )

    max_exposure = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    contact_email = models.EmailField(null=True, blank=True)

    def available_exposure(self):
        return (self.max_exposure or Decimal("0.00"))

    def __str__(self):
        return f"{self.name} ({self.code})"

class EmployerFinancialSnapshot(models.Model):
    """
    THIS POWERS UI DASHBOARD
    """

    employer = models.OneToOneField(
        Employer,
        on_delete=models.CASCADE,
        related_name="financial"
    )

    total_members = models.IntegerField(default=0)

    number_of_loans = models.IntegerField(default=0)

    loan_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    outstanding_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    overdue_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    total_down_payments = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    total_savings = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Financial - {self.employer.name}"