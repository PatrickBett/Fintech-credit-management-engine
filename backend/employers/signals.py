from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Employer, EmployerFinancialSnapshot


@receiver(post_save, sender=Employer)
def create_employer_financial(sender, instance, created, **kwargs):
    if created:
        EmployerFinancialSnapshot.objects.create(employer=instance)