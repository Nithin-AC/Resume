from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from .models import Fruit
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework.permissions import IsAuthenticated
from google.oauth2 import id_token
from google.auth.transport import requests
User=get_user_model()

class FruitList(generics.ListCreateAPIView):
    queryset = Fruit.objects.all()
    serializer_class = FruitSerializer
class FruitOp(generics.RetrieveUpdateDestroyAPIView):
    queryset=Fruit.objects.all()
    serializer_class=FruitSerializer
    lookup_field='pk'

class Register(APIView):
    def post(self,request ):
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

class ForgotPassword(APIView):
    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        if not user:
            return Response({'error': 'User does not exist.'}, status=404)

        otp = get_random_string(length=6, allowed_chars='0123456789')

        # Store OTP and email mapping
        cache.set(f'otp_{email}', otp, timeout=600)
        cache.set(f'email_for_otp_{otp}', email, timeout=600)

        send_mail(
            subject="Your OTP for Password Reset",
            message=f"Your OTP is {otp}. It is valid for 10 minutes.",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
        )

        return Response({'message': 'OTP sent to your email.'}, status=200)

    
class Verify(APIView):
    def post(self, request):
        otp = request.data.get('otp')
        email = cache.get(f'email_for_otp_{otp}')

        if not email:
            return Response({'error': 'OTP expired or invalid.'}, status=400)

        real_otp = cache.get(f'otp_{email}')
        if real_otp != otp:
            return Response({'error': 'Incorrect OTP.'}, status=400)

        # ✅ Success — remove used OTPs
        cache.delete(f'otp_{email}')
        cache.delete(f'email_for_otp_{otp}')

        # ✅ Return email to frontend for next step
        return Response({'message': 'OTP verified successfully.', 'email': email})

from rest_framework import serializers
from django.contrib.auth.hashers import make_password
class ResetPassword(APIView):
    def post(self, request):
        email = request.data.get('email')  
        password = request.data.get('new_password')

        if not email or not password:
            return Response({'error': 'Missing email or password.'}, status=400)

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({'error': 'User not found.'}, status=404)

        user.password = make_password(password)
        user.save()

        return Response({'message': 'Password reset successful.'})


# views.py
class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password changed'})
        return Response(serializer.errors, status=400)


class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token')

        try:
            # Verify token using Google
            idinfo = id_token.verify_oauth2_token(token, requests.Request())
            email = idinfo['email']

            # Get or create user
            user, created = User.objects.get_or_create(
                            email=email,
                            defaults={'username': email.split('@')[0]}
                        )
                                

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                  'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                }
            })
        except ValueError:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)