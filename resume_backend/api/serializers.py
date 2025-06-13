from .models import *
from rest_framework import serializers
class FruitSerializer(serializers.ModelSerializer):
    class Meta:
        model=Fruit
        fields='__all__'
