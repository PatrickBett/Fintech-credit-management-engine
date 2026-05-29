from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/register/", include("accounts.urls")),
    path("api/login/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
    path("api/members/", include("patients.urls")),
    path("api/employers/", include("employers.urls")),
    path("api/facilities/", include("facilities.urls")),
    path("api/repayments/", include("repayments.urls")),
    path("api/transactions/", include("transactions.urls")),
    path("api/credit-limits/", include("credit_limits.urls")),
]