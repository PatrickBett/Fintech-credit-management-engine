from django.contrib import admin
from .models import Transaction, LoanStatus, LoanStage, LoanOfficer, CreditOfficer, Collector, TransactionComment, TransactionAudit
admin.site.register(Transaction)
admin.site.register(LoanStatus)
admin.site.register(LoanStage)
admin.site.register(LoanOfficer)
admin.site.register(CreditOfficer)
admin.site.register(Collector)
admin.site.register(TransactionComment)
admin.site.register(TransactionAudit)

