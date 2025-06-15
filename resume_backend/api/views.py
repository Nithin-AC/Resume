from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from .models import Fruit
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
# from django.contrib.auth.models import User 

class FruitList(generics.ListCreateAPIView):
    queryset = Fruit.objects.all()
    serializer_class = FruitSerializer
class FruitOp(generics.RetrieveUpdateDestroyAPIView):
    queryset=Fruit.objects.all()
    serializer_class=FruitSerializer
    lookup_field='pk'

class Register(APIView):
    def post(self,request ,*args, **kwargs):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()

            refresh = RefreshToken.for_user(user)
            token_data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            return Response({
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email
                    },
                    "tokens": token_data
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)