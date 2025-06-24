from django.urls import path,include
from .views import *

urlpatterns = [
    path('fruits/', FruitList.as_view(), name='fruit-list'),
    path('fruits/<int:pk>',FruitOp.as_view()),
    path('register/',Register.as_view()),
    path('forgot-password/',ForgotPassword.as_view()),
    path('verify-otp/',Verify.as_view()),
    path('reset/',ResetPassword.as_view()),
    path('change-password/',ChangePassword.as_view()),
    path('auth/google/',GoogleLoginView.as_view()),
    path('extract/',ResumeExtracter.as_view()),
    path('analysis/',ResumeAnalysisView.as_view()),
    path("gemini-chat/", gemini_chat.as_view(), name="gemini_chat"),
]
