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
        cache.set(f'otp_{email}', otp, timeout=600)
        request.session['otp_email'] = email

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
        email = request.session.get('otp_email')  # previously stored
        if not email:
            return Response({'error': 'Session expired. Please try again.'}, status=400)

        cached_otp = cache.get(f'otp_{email}')
        if cached_otp is None:
            return Response({'error': 'OTP expired or not found.'}, status=400)

        if otp == cached_otp:
            
            cache.delete(f'otp_{email}')
            return Response({'message': 'OTP verified successfully.'})
        else:
            return Response({'error': 'Invalid OTP.'}, status=400)
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True, min_length=6)

class ResetPassword(APIView):
    def post(self, request):
        email = request.session.get('otp_email')
        if not email:
            return Response({'error': 'Session expired. Please verify OTP again.'}, status=400)

        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.filter(email=email).first()
            if not user:
                return Response({'error': 'User not found.'}, status=404)

           
            user.password = make_password(serializer.validated_data['new_password'])
            user.save()

            request.session.pop('otp_email', None)

            return Response({'message': 'Password has been reset successfully.'})
        return Response(serializer.errors, status=400)

# views.py
class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password changed'})
        return Response(serializer.errors, status=400)
