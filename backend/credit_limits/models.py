from decimal import Decimal
from django.db import models
from patients.models import Customer


class CreditAccount(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)

    total_limit = models.DecimalField(max_digits=12, decimal_places=2)

    used_balance = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))

    available_balance = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))

    def recalculate(self):
        self.available_balance = self.total_limit - self.used_balance

    def apply_transaction(self, amount):
        amount = Decimal(amount)

        self.used_balance += amount
        self.recalculate()
        self.save()

    def apply_repayment(self, amount):
        amount = Decimal(amount)

        self.used_balance -= amount
        self.recalculate()
        self.save()