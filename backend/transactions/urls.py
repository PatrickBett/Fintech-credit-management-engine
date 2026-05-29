from .views import TransactionListCreateView
from django.urls import path
urlpatterns = [
    path('', TransactionListCreateView.as_view(), name='transaction-list-create'),
]