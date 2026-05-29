from django.shortcuts import render
from .serializers import CreditAccountSerializer
from .models import CreditAccount
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class CreditAccountListCreateView(APIView):
    def get(self, request):
        credit_accounts = CreditAccount.objects.all()
        serializer = CreditAccountSerializer(credit_accounts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CreditAccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)