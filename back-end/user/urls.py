"""
URL mappings for the user API
"""

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from user import views


app_name = 'user'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.CreateUserView.as_view(), name='create'),
    path('me/', views.ManagerUserView.as_view(), name='me'),
]
