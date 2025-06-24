from django.db import models

# Create your models here.
class Fruit(models.Model):
    name=models.CharField(max_length=100)
    color=models.CharField(max_length=100)

    def __str__(self):
        return self.name
from django.db import models
from django.contrib.auth.models import User

class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10)  # "user" or "model"
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']
    def __str__(self):
        return self.role
    