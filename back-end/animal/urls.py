from django.urls import (path, include,)
from rest_framework.routers import DefaultRouter
from animal import views


router = DefaultRouter()
router.register('', views.AnimalViewSet, basename='Animal')

app_name = 'animal'
urlpatterns = [
    path('', include(router.urls)),
]