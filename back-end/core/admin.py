"""
Django admin customization
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from core import models
from core.models import User
from django.utils.translation import gettext_lazy as _


class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users"""
    ordering = ('name',)
    list_display = ('id', 'name', 'email', 'is_active', 'is_superuser', 'is_staff', 'is_admin', 'created_at', 'updated_at', 'deleted_at',)
    list_filter = ('name', 'email',)
    readonly_fields = ('last_login', 'created_at', 'updated_at', 'deleted_at',)
    fieldsets = (
        (
            None, 
            {
                'fields': (
                    'email', 
                    'password',
                )
            }
        ),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (
            _('Important dates'),
            {
                'fields': (
                    'last_login',
                    'created_at',
                    'updated_at',
                    'deleted_at',
                )
            }
        ),
    )
    add_fieldsets = (
        (
            None, 
            {
                'classes': ('wide',),
                'fields': (
                    'name',
                    'email', 
                    'password1',
                    'password2',
                    'is_active',
                    'is_superuser',
                    'is_staff',
                    'is_admin',
                )
            }
        ),
    )


admin.site.register(models.User, UserAdmin)