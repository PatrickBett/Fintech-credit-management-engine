from django.contrib import admin
from .models import Product, Customer, AuditLog, CreditProfile, CustomerKYC
# Register your models here.
admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(AuditLog)
admin.site.register(CreditProfile)
admin.site.register(CustomerKYC)