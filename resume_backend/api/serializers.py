from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
class FruitSerializer(serializers.ModelSerializer):
    class Meta:
        model=Fruit
        fields='__all__'
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
    def create(self, validated_data):
        # User creation logic
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user
    
    
