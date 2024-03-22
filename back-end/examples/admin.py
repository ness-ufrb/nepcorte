"""
Django admin customization
"""
from django.contrib import admin
from examples import models


admin.site.register(models.Example)