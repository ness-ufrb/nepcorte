from drf_spectacular.utils import (
    extend_schema_view,
)

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from review.models import AnalysisResultHistory
from review.serializers import AnalysisResultHistorySerializer


@extend_schema_view()
class AResultHistoryViewSet(viewsets.ModelViewSet):
    """View for managing user settings API"""
    serializer_class = AnalysisResultHistorySerializer
    query_set = AnalysisResultHistory.objects.active()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

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
            return AnalysisResultHistorySerializer
        else:
            return self.serializer_class
        
    def perform_create(self, serializer):
        """Create a new item"""
        serializer.save(user=self.request.user)

    