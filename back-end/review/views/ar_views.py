from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_spectacular.utils import extend_schema_view
from django_filters.rest_framework import DjangoFilterBackend
from review.models import AnalysisResult
from animal.models import Animal
from review.serializers import AnalysisResultWithAnimalSerializer, AnalysisResultSerializer
from django.db.models import OuterRef, Subquery

@extend_schema_view()
class AResultViewSet(viewsets.ModelViewSet):
    """View for managing analysis results API"""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # Pesquisa específica, agora buscando pelos últimos resultados de marbling_level e fat_distribution
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['code', 'race', 'species', 'reproductiveSituation', 'last_marbling_level', 'last_fat_distribution']

    def get_queryset(self):
        """Retrieve the appropriate queryset based on action"""
        user = self.request.user
        if self.action in ['list', 'retrieve']:
            animal_qs = (
                Animal.objects
                .filter(user=user)
                .annotate(
                    last_analysis_date=Subquery(
                        AnalysisResult.objects.filter(animal_id=OuterRef('pk'))
                        .order_by('-created_at')
                        .values('created_at')[:1]
                    ),
                    last_marbling_level=Subquery(
                        AnalysisResult.objects.filter(animal_id=OuterRef('pk'))
                        .order_by('-created_at')
                        .values('marbling_level')[:1]
                    ),
                    last_fat_distribution=Subquery(
                        AnalysisResult.objects.filter(animal_id=OuterRef('pk'))
                        .order_by('-created_at')
                        .values('fat_distribution')[:1]
                    )
                )
                .filter(
                    last_marbling_level__isnull=False,
                    last_fat_distribution__isnull=False
                )  # Garante que o animal tem pelo menos um resultado
                .order_by('-last_analysis_date')  # Ordenar pela data da análise mais recente
                .distinct()
            )
            return animal_qs
        else:
            queryset = AnalysisResult.objects.active().filter(user=user).order_by('-created_at')  # Ordenar pela data de criação
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
