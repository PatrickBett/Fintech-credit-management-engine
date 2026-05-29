from django.shortcuts import render
from .models import Repayment
from .serializers import RepaymentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class RepaymentListCreateView(APIView):
    def get(self, request):
        repayments = Repayment.objects.all()
        serializer = RepaymentSerializer(repayments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RepaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)