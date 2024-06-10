from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_spectacular.utils import extend_schema_view
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend

from review.models import AnalysisResult
from animal.models import Animal
from review.serializers import AnalysisResultWithAnimalSerializer, AnalysisResultSerializer

class AnalysisResultPagination(PageNumberPagination):
    page_size = 4

@extend_schema_view()
class AResultViewSet(viewsets.ModelViewSet):
    """View for managing user settings API"""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['identifier', 'breed', 'animal_species', 'gender', 'analysis_results__marbling_level', 'analysis_results__fat_distribution']

    pagination_class = AnalysisResultPagination

    def _params_to_ints(self, qs):
        """Convert a list of strings to ints"""
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the appropriate queryset based on action"""
        user = self.request.user
        if self.action in ['list', 'retrieve']:
            animal_qs = Animal.objects.filter(user=user).order_by('-id').distinct()
            search = self.request.query_params.get('search')
            if search:
                animal_qs = animal_qs.filter(
                    Q(identifier__icontains=search) |
                    Q(breed__icontains=search) |
                    Q(animal_species__icontains=search) |
                    Q(gender__icontains=search) |
                    Q(analysis_results__marbling_level__icontains=search) |
                    Q(analysis_results__fat_distribution__icontains=search)
                ).distinct()
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
