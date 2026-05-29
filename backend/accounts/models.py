from django.contrib.auth.models import AbstractUser
from django.db import models


class UserRole(models.TextChoices):
    ADMIN = "ADMIN", "Admin"
    EMPLOYER = "EMPLOYER", "Employer Admin"
    EMPLOYEE = "EMPLOYEE", "Employee"


class CustomUser(AbstractUser):
    """
    Single user model for entire system.
    Role determines behavior across modules.
    """

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.EMPLOYEE
    )
    national_id = models.CharField(max_length=50, blank=True, null=True)
    # link user to customer
    customer = models.OneToOneField(
        "patients.Customer",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="user_account"
    )

    def is_admin(self):
        return self.role == UserRole.ADMIN

    def is_employer(self):
        return self.role == UserRole.EMPLOYER

    def is_employee(self):
        return self.role == UserRole.EMPLOYEE

