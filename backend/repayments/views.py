from django.shortcuts import render
from .models import Payment, PaymentMethod, PaymentStatus, PaymentFor
from .serializers import PaymentSerializer, PaymentMethodSerializer, PaymentStatusSerializer, PaymentForSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class PaymentMethodListCreateView(APIView):
    def get(self, request):
        payment_methods = PaymentMethod.objects.all()
        serializer = PaymentMethodSerializer(payment_methods, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PaymentMethodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentStatusListCreateView(APIView):
    def get(self, request):
        payment_statuses = PaymentStatus.objects.all()
        serializer = PaymentStatusSerializer(payment_statuses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PaymentStatusSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentForListCreateView(APIView):
    def get(self, request):
        payment_fors = PaymentFor.objects.all()
        serializer = PaymentForSerializer(payment_fors, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PaymentForSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class PaymentListCreateView(APIView):
    def get(self, request):
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)