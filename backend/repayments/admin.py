from django.contrib import admin
from .models import PaymentMethod, PaymentStatus, PaymentFor, Bank, Payment
admin.site.register(PaymentMethod)
admin.site.register(PaymentStatus)
admin.site.register(PaymentFor)

admin.site.register(Bank)
admin.site.register(Payment)
