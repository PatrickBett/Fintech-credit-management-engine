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
    Represents a company/SACCO that guarantees employee credit usage.
    """

    name = models.CharField(max_length=255, unique=True)
    code = models.CharField(max_length=50, unique=True)

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
        help_text="Maximum total credit allowed across all employees"
    )

    contact_email = models.EmailField(null=True, blank=True)
    contact_phone = models.CharField(max_length=20, null=True, blank=True)

    # Current utilization (updated by transaction engine)
    total_utilized = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    def available_exposure(self):
        return (self.max_exposure or Decimal("0.00")) - (self.total_utilized or Decimal("0.00"))

    def can_transact(self, amount):
        amount = Decimal(amount)
        return self.available_exposure() >= amount

    def __str__(self):
        return f"{self.name} ({self.code})"