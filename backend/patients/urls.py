from .views import CustomerListCreateView, ProductListCreateView, CreditProfileListCreateView, CustomerLimitUpdateView,CustomerKYCListCreateView, RefereeListCreateView,CustomerStatusUpdateView
from django.urls import path

urlpatterns = [
    path('', CustomerListCreateView.as_view(), name='customer-list-create'),
    path('<int:pk>/update-status/', CustomerStatusUpdateView.as_view(), name='customerstatus-update'),
    path('<int:pk>/update-limit/', CustomerLimitUpdateView.as_view(), name='customerlimit-update'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('referees/', RefereeListCreateView.as_view(), name='referee-list-create'),
    path('credit-profiles/', CreditProfileListCreateView.as_view(), name='credit-profile-list-create'),
    path('kyc/', CustomerKYCListCreateView.as_view(), name='customer-kyc-list-create'),
]
