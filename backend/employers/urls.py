from .views import EmployerListCreateView
from django.urls import path
urlpatterns = [
    path('', EmployerListCreateView.as_view(), name = 'employer-list-create'),
]