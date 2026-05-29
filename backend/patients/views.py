from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import CustomerSerializer, ProductSerializer, CreditProfileSerializer, CustomerKYCSerializer
from .models import Customer, Product, CreditProfile, CustomerKYC
# Create your views here.

class CustomerListCreateView(APIView):
    def get(self, request):
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductListCreateView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreditProfileListCreateView(APIView):
    def get(self, request):
        profiles = CreditProfile.objects.all()
        serializer = CreditProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CreditProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerKYCListCreateView(APIView):
    def get(self, request):
        kycs = CustomerKYC.objects.all()
        serializer = CustomerKYCSerializer(kycs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomerKYCSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)