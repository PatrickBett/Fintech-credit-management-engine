from .views import TransactionListCreateView,CollectorListCreateView, CreditOfficerListCreateView, LoanOfficerListCreateView,LoanStageListCreateView
from django.urls import path
urlpatterns = [
    path('', TransactionListCreateView.as_view(), name='transaction-list-create'),
    path('creditofficers/', CreditOfficerListCreateView.as_view(), name='creditofficer-list-create'),
    path('loanofficers/', LoanOfficerListCreateView.as_view(), name='loanofficer-list-create'),
    path('collectors/', CollectorListCreateView.as_view(), name='collector-list-create'),
    path('loanstages/', LoanStageListCreateView.as_view(), name='loanstage-list-create'),
]