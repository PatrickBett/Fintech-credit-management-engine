from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from patients.models import Customer
from employers.models import EmployerFinancialSnapshot


@receiver(post_save, sender=Customer)
def update_employer_member_count(sender, instance, **kwargs):
    if instance.employer:
        snapshot, _ = EmployerFinancialSnapshot.objects.get_or_create(
            employer=instance.employer
        )

        snapshot.total_members = Customer.objects.filter(
            employer=instance.employer
        ).count()

        snapshot.save()

@receiver(post_delete, sender=Customer)
def update_member_count_on_delete(sender, instance, **kwargs):
    if instance.employer:
        snapshot, _ = EmployerFinancialSnapshot.objects.get_or_create(
            employer=instance.employer
        )

        snapshot.total_members = Customer.objects.filter(
            employer=instance.employer
        ).count()

        snapshot.save()