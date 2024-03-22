"""
URL mappings for the examples app.
"""
from django.urls import (path, include,)
from rest_framework.routers import DefaultRouter
from examples import views


router = DefaultRouter()
router.register('', views.ExampleViewSet, basename='Example')

app_name = 'examples'
urlpatterns = [
    path('', include(router.urls))
]