from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ar_views, arh_views, uploadedfiles_views

router = SimpleRouter()
router.register('analysis_result', ar_views.AResultViewSet, basename='AnalysisResult')
router.register('analysis_result_history', arh_views.AResultHistoryViewSet, basename='AnalysisResultHistory')
app_name = 'review'

urlpatterns = [
    path('', include(router.urls)),
    path('upload-file/', uploadedfiles_views.ImageUploadAPIView.as_view(), name='upload-file'),
]
