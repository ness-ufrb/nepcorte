"""
URL mappings for the user API
"""

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from user.views import manage_user, request_email
from user.views.reset_password import ResetPasswordView

app_name = 'user'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', manage_user.CreateUserView.as_view(), name='create'),
    path('me/', manage_user.ManagerUserView.as_view(), name='me'),
    path('send_email/', request_email.RequestEmailView.as_view(), name='send_email'),
    path('reset_password/', ResetPasswordView.as_view() , name='reset_password'),
]
