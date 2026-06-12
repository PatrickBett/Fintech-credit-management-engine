from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import CustomerSerializer, ProductSerializer, CreditProfileSerializer, CustomerKYCSerializer, RefereeSerializer
from .models import Customer, Product, CreditProfile, CustomerKYC, Referee
# Create your views here.

class CustomerListCreateView(APIView):
    def get(self, request):
        customers = Customer.objects.all()
        #read query param for filtering based on status(active/lead)
        status_param = request.query_params.get("status")
        if status_param:
            customers = customers.filter(status__iexact=status_param)
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerStatusUpdateView(APIView):
    def patch(self, request, pk):
        try:
            customer = Customer.objects.get(pk=pk)
        except Customer.DoesNotExist:
            return Response(
                {"detail": "Customer not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        new_status = request.data.get("status")

        if new_status not in ["LEAD", "ACTIVE", "BLOCKED"]:
            return Response(
                {"detail": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST
            )

        customer.status = new_status
        customer.save()

        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)

# update  the customer limit
class CustomerLimitUpdateView(APIView):
    def patch(self, request, pk):
        try:
            customer = Customer.objects.get(pk=pk)
        except Customer.DoesNotExist:
            return Response({"detail":"Customer Not Found"},status=status.HTTP_404_NOT_FOUND)
        limit = request.data.get('limit')
        if limit is None:
            return Response({"detail":"Limit is required"},status=status.HTTP_400_BAD_REQUEST)
        try:
            customer.limit = limit
            customer.save()
        except Exception:
            return Response({"detail":"Invalid Limit Value"},status=status.HTTP_400_BAD_REQUEST)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)


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

class RefereeListCreateView(APIView):
    def get(self, request):
        referee = Referee.objects.all()
        serializer = RefereeSerializer(referee, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RefereeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)