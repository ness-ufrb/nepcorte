"""
Views for the User API
"""

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from user.serializers import UserSerializer

class CreateUserView(generics.CreateAPIView):
    """Create a user in the system"""
    serializer_class = UserSerializer

class ManagerUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Retrieve and return the authenticated user"""
        return self.request.user