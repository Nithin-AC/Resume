from django.urls import path,include
from .views import *

urlpatterns = [
    path('fruits/', FruitList.as_view(), name='fruit-list'),
    path('fruits/<int:pk>',FruitOp.as_view()),
    path('register/',Register.as_view()),
]