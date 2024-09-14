"""
URL configuration for api project.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/examples/', include('examples.urls')),
    path('api/animal/', include('animal.urls')),
    path('api/review/', include('review.urls')),
    path(
        'api/schema/', 
        SpectacularAPIView.as_view(), 
        name='api-schema'
    ),
    path(
        'api/docs/', 
        SpectacularSwaggerView.as_view(
            url_name='api-schema'
        ), 
        name='api-docs',
    ),
    path('api/user/', include('user.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)