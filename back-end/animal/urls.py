from django.urls import (path, include,)
from rest_framework.routers import SimpleRouter
from animal import views

router = SimpleRouter()
router.register('', views.AnimalViewSet, basename='Animal')

app_name = 'animal'
urlpatterns = [
    path('', include(router.urls)),
]