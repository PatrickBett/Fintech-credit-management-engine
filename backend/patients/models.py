# patients/models.py

from django.db import models
from accounts.models import CustomUser
import uuid
from employers.models import Employer


class Customer(models.Model):
    uid = models.AutoField(primary_key=True)

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    national_id = models.CharField(max_length=50, blank=True, null=True)
    employer = models.ForeignKey(
        Employer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="employees"
    )

    gender = models.CharField(
        max_length=10,
        choices=[("M", "Male"), ("F", "Female")]
    )
    net_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True
    )

    dob = models.DateField(null=True, blank=True)

    physical_address = models.TextField(blank=True)

    primary_mobile = models.CharField(max_length=20)

    email = models.EmailField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    added_by = models.ForeignKey(
        "accounts.CustomUser",
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_customers"
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.primary_mobile})"

class Product(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50, unique=True)

    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    max_limit = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class CreditProfile(models.Model):
    customer = models.OneToOneField("Customer", on_delete=models.CASCADE)

    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        related_name="credit_profiles"
    )

    current_limit = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_loans = models.IntegerField(default=0)

    status = models.CharField(
        max_length=20,
        choices=[
            ("LEAD", "Lead"),
            ("ACTIVE", "Active"),
            ("SUSPENDED", "Suspended"),
            ("CLOSED", "Closed")
        ],
        default="LEAD"
    )

    def __str__(self):
        return f"Credit Profile - {self.customer.first_name} {self.customer.last_name}"

class CustomerKYC(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)

    kra_pin = models.CharField(max_length=50, blank=True, null=True)
    reference_number = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"KYC - {self.customer.first_name}"

class AuditLog(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    action = models.CharField(max_length=100)
    performed_by = models.ForeignKey("accounts.CustomUser", on_delete=models.SET_NULL, null=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"AuditLog - {self.customer.first_name} {self.customer.last_name} - {self.action}"