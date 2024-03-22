"""
View for the examples API
"""
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from examples.models import Example
from examples import serializers


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(name="id", type=str, location=OpenApiParameter.PATH),
            OpenApiParameter(
                'ids',
                OpenApiTypes.STR,
                description='Comma separated list of IDs to filter'
            ),
        ]
    )
)
class ExampleViewSet(viewsets.ModelViewSet):
    """View for managing user settings API"""
    serializer_class = serializers.ExampleDetailSerializer
    query_set = Example.objects.active()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def _params_to_ints(self, qs):
        """Convert a list of strings to ints"""
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve examples for authenticated user"""
        ids_param = self.request.query_params.get('ids')
        query_set = self.query_set
        if ids_param:
            ids = self._params_to_ints(ids_param)
            query_set = query_set.filter(id__in=ids)
        return query_set.filter(
            user=self.request.user
        ).order_by('name').distinct()
    
    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action == 'list':
            return serializers.ExampleSerializer
        else:
            return self.serializer_class
        
    def perform_create(self, serializer):
        """Create a new item"""
        serializer.save(user=self.request.user)

    