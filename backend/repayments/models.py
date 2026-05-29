from django.db import models
from patients.models import Customer

# Create your models here.
class Repayment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    amount = models.DecimalField(max_digits=12, decimal_places=2)

    source = models.CharField(max_length=100)  # Employer/SACCO upload

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.first_name} {self.customer.last_name} - {self.amount}"