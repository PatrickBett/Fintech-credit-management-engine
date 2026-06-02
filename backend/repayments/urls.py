from .views import PaymentListCreateView, PaymentMethodListCreateView, PaymentStatusListCreateView, PaymentForListCreateView
from django.urls import path

urlpatterns = [
    path('', PaymentListCreateView.as_view(), name='payment-list-create'),
    path('payment-methods/', PaymentMethodListCreateView.as_view(), name='payment-method-list-create'),
    path('payment-statuses/', PaymentStatusListCreateView.as_view(), name='payment-status-list-create'),
    path('payment-fors/', PaymentForListCreateView.as_view(), name='payment-for-list-create'),
]