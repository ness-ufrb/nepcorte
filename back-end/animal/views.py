from django.shortcuts import render

# Create your views here.

"""
View for the animals API
"""

from drf_spectacular.utils import (
    extend_schema,
)

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from animal.models import Animal
from animal import serializers
from drf_spectacular.utils import extend_schema
from rest_framework import filters

extend_schema()
class AnimalViewSet(viewsets.ModelViewSet):
    """View for managing user settings API"""
    serializer_class = serializers.AnimalSerializer
    query_set = Animal.objects.active()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['identifier', 'gender', 'animal_species', 'breed']
    

    def _params_to_ints(self, qs):
        """Convert a list of strings to ints"""
        return [int(str_id) for str_id in qs.split(',')]
    
    def get_queryset(self):
        """Retrieve Animals for authenticated user"""
        ids_param = self.request.query_params.get('id')
        query_set = self.query_set
        if ids_param:
            ids = self._params_to_ints(ids_param)
            query_set = query_set.filter(id__in=ids)
        return query_set.filter(
            user=self.request.user
        ).order_by('-id').distinct()
    
    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action == 'list':
            return serializers.AnimalSerializer
        else:
            return self.serializer_class
        
    def perform_create(self, serializer):
        """Create a new item"""
        serializer.save(user=self.request.user)

    