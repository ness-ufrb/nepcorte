from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_spectacular.utils import extend_schema_view
from django_filters.rest_framework import DjangoFilterBackend
from review.models import AnalysisResult
from animal.models import Animal
from review.serializers import AnalysisResultWithAnimalSerializer, AnalysisResultSerializer

@extend_schema_view()
class AResultViewSet(viewsets.ModelViewSet):
    """View for managing user settings API"""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['code', 'race', 'species', 'reproductiveSituation', 'analysis_results__marbling_level', 'analysis_results__fat_distribution']

    def _params_to_ints(self, qs):
        """Convert a list of strings to ints"""
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the appropriate queryset based on action"""
        user = self.request.user
        if self.action in ['list', 'retrieve']:
            animal_qs = Animal.objects.filter(user=user, analysis_results__isnull=False).order_by('-analysis_results__id').distinct()
            return animal_qs
        else:
            queryset = AnalysisResult.objects.active().filter(user=user).order_by('-id').distinct()
            ids_param = self.request.query_params.get('id')
            if ids_param:
                ids = self._params_to_ints(ids_param)
                queryset = queryset.filter(id__in=ids)
            return queryset

    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action in ['list', 'retrieve']:
            return AnalysisResultWithAnimalSerializer
        else:
            return AnalysisResultSerializer

    def perform_create(self, serializer):
        """Create a new item"""
        serializer.save(user=self.request.user)
