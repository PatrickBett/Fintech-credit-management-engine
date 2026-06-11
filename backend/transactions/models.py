# transactions/models.py

from django.db import models
from patients.models import Customer
from employers.models import Employer
from patients.models import Product
from accounts.models import CustomUser
import random
import string
from datetime import datetime



def generate_code(prefix="TXN"):
    date = datetime.now().strftime("%Y%m%d")
    rand = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"{prefix}-{date}-{rand}"
# -----------------------------
# LOOKUP TABLES
# -----------------------------

class LoanStatus(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class LoanStage(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class LoanOfficer(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CreditOfficer(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Collector(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


# -----------------------------
# MAIN LOAN / TRANSACTION MODEL
# -----------------------------

class Transaction(models.Model):
    code = models.CharField(max_length=25, unique=True, editable=False)

    customer = models.ForeignKey(
        Customer,
        on_delete=models.PROTECT,
        related_name="transactions"
    )

    employer = models.ForeignKey(
        Employer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="transactions"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="transactions"
    )

    # Loan figures
    principal = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    addons = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    deductions = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    disbursed_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    repayable_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    repaid_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    # Dates
    disbursed_date = models.DateField(
        null=True,
        blank=True
    )

    due_date = models.DateField(
        null=True,
        blank=True,
        help_text="The date by which the loan should be fully repaid-64days from disbursement by default"
    )

    last_repay_date = models.DateField(
        null=True,
        blank=True
    )

    cleared_date = models.DateField(
        null=True,
        blank=True
    )

    next_repay_date = models.DateField(
        null=True,
        blank=True
    )

    # Installments
    current_installment = models.IntegerField(default=1)

    current_installment_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    # Assignment
    current_loan_officer = models.ForeignKey(
        LoanOfficer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    current_credit_officer = models.ForeignKey(
        CreditOfficer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    current_collector = models.ForeignKey(
        Collector,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    # Workflow
    stage = models.ForeignKey(
        LoanStage,
        on_delete=models.SET_NULL,
        null=True
    )
    

    # status = models.ForeignKey(
    #     LoanStatus,
    #     on_delete=models.SET_NULL,
    #     null=True
    # )

    # Audit
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_transactions"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = generate_code("TXN")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"TXN-{self.code} - {self.customer}"


# -----------------------------
# TRANSACTION COMMENTS
# -----------------------------

class TransactionComment(models.Model):
    transaction = models.ForeignKey(
        Transaction,
        on_delete=models.CASCADE,
        related_name="comments"
    )

    comment = models.TextField()

    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment {self.id}"


# -----------------------------
# TRANSACTION HISTORY / AUDIT
# -----------------------------

class TransactionAudit(models.Model):
    transaction = models.ForeignKey(
        Transaction,
        on_delete=models.CASCADE,
        related_name="audits"
    )

    action = models.CharField(max_length=255)

    performed_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True
    )

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.action