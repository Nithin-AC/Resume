from django.shortcuts import render

from rest_framework import generics
from .models import Fruit
from .serializers import FruitSerializer

class FruitList(generics.ListCreateAPIView):
    queryset = Fruit.objects.all()
    serializer_class = FruitSerializer
class FruitOp(generics.RetrieveUpdateDestroyAPIView):
    queryset=Fruit.objects.all()
    serializer_class=FruitSerializer
    lookup_field='pk'