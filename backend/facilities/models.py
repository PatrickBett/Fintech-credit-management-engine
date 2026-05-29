from django.db import models

# Create your models here.
class Facility(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)

    location = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class Branch(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name="branches")

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50)

    location = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.facility.name} - {self.name}"