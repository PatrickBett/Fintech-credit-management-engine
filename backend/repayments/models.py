from django.db import models
from patients.models import Customer
from loans.models import Loan


class PaymentMethod(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class PaymentStatus(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class PaymentFor(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Group(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Bank(models.Model):
    name = models.CharField(max_length=255, unique=True)
    code = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name


class Payment(models.Model):
    transaction_code = models.CharField(
        max_length=100,
        unique=True
    )

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="payments"
    )

    loan = models.ForeignKey(
        Loan,
        on_delete=models.CASCADE,
        related_name="payments"
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    mobile_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    comments = models.TextField(
        blank=True,
        null=True
    )

    payment_method = models.ForeignKey(
        PaymentMethod,
        on_delete=models.PROTECT
    )

    bank = models.ForeignKey(
        Bank,
        on_delete=models.PROTECT,
        blank=True,
        null=True
    )

    payment_for = models.ForeignKey(
        PaymentFor,
        on_delete=models.PROTECT
    )

    group = models.ForeignKey(
        Group,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    date_made = models.DateField()

    status = models.ForeignKey(
        PaymentStatus,
        on_delete=models.PROTECT
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_code} - {self.amount}"