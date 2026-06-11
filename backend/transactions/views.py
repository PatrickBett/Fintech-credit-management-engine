from django.shortcuts import render
from .models import Transaction, LoanOfficer, CreditOfficer, Collector, LoanStage
from .serializers import TransactionSerializer, LoanOfficerSerializer, CreditOfficerSerializer, CollectorSerializer, LoanStageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class TransactionListCreateView(APIView):
    def get(self, request):
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoanOfficerListCreateView(APIView):
    def get(self, request):
        loanofficers = LoanOfficer.objects.all()
        serializer = LoanOfficerSerializer(loanofficers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LoanOfficerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CreditOfficerListCreateView(APIView):
    def get(self, request):
        creditofficers = CreditOfficer.objects.all()
        serializer = CreditOfficerSerializer(creditofficers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CreditOfficerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CollectorListCreateView(APIView):
    def get(self, request):
        collectors = Collector.objects.all()
        serializer = CollectorSerializer(collectors, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CollectorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoanStageListCreateView(APIView):
    def get(self, request):
        loanstages = LoanStage.objects.all()
        serializer = LoanStageSerializer(loanstages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LoanStageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)