from .views import CreditAccountListCreateView
from django.urls import path
urlpatterns = [
    path('', CreditAccountListCreateView.as_view(), name = 'credit-account-list-create'),
]