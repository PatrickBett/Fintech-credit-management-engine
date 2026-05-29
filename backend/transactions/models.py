from django.db import models
from patients.models import Customer
from facilities.models import Facility

# Create your models here.
class Transaction(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)

    amount = models.DecimalField(max_digits=12, decimal_places=2)

    status = models.CharField(
        max_length=20,
        choices=[
            ("APPROVED", "Approved"),
            ("DECLINED", "Declined")
        ]
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.first_name} {self.customer.last_name} - {self.amount} - {self.status}"