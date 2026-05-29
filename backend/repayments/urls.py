from .views import RepaymentListCreateView
from django.urls import path

urlpatterns = [
    path('', RepaymentListCreateView.as_view(), name='repayment-list-create'),
]