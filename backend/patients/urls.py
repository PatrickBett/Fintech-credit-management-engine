from .views import CustomerListCreateView, ProductListCreateView, CreditProfileListCreateView, CustomerKYCListCreateView
from django.urls import path

urlpatterns = [
    path('', CustomerListCreateView.as_view(), name='customer-list-create'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('credit-profiles/', CreditProfileListCreateView.as_view(), name='credit-profile-list-create'),
    path('kyc/', CustomerKYCListCreateView.as_view(), name='customer-kyc-list-create'),
]
