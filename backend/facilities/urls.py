from .views import FacilityListCreateView, BranchListCreateView
from django.urls import path
urlpatterns = [
    path('', FacilityListCreateView.as_view(), name='facility-list-create'),
    path('branches/', BranchListCreateView.as_view(), name='branch-list-create'),
]