from .views import PaymentListCreateView
from django.urls import path

urlpatterns = [
    path('', PaymentListCreateView.as_view(), name='payment-list-create'),
]