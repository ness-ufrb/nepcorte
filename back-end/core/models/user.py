"""
Database models
"""

from django.utils import timezone
from django.db import models
import uuid
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from api import settings


class BaseModelManager(models.Manager):
    """Manager for timestamps and soft delete"""
    
    def get_by_natural_key(self, natural_key):
        return self.get(id=natural_key)

    def active(self):
        """Retrieve non-deleted records."""
        return self.filter(deleted_at__isnull=True)

    def soft_deleted(self):
        """Retrieve soft-deleted records."""
        return self.filter(deleted_at__isnull=False)

    def by_created_at(self, start=None, end=None):
        """Filter records by created_at timestamp range."""
        queryset = self.get_queryset()
        if start:
            queryset = queryset.filter(created_at__gte=start)
        if end:
            queryset = queryset.filter(created_at__lte=end)
        return queryset

    def by_updated_at(self, start=None, end=None):
        """Filter records by updated_at timestamp range."""
        queryset = self.get_queryset()
        if start:
            queryset = queryset.filter(updated_at__gte=start)
        if end:
            queryset = queryset.filter(updated_at__lte=end)
        return queryset


class BaseModel(models.Model):
    """Model for adding timestamps and soft delete"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = BaseModelManager()

    class Meta:
        abstract = True  # Set this to True to create an abstract base model

    def delete(self, using=None, keep_parents=False):
        self.deleted_at = timezone.now()
        self.save()


class UserManager(BaseUserManager, BaseModelManager):
    """Manager for the users"""
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a new user"""
        if not email:
            raise ValueError('Você deve informar um endereço de e-mail')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a new superuser"""
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('O usuário superuser deve ter o valor is_superuser=True.')
        extra_fields.setdefault('is_staff', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('O usuário superuser deve ter o valor is_staff=True.')
        extra_fields.setdefault('is_admin', True)
        if extra_fields.get('is_admin') is not True:
            raise ValueError('O usuário superuser deve ter o valor is_admin=True.')
        return self.create_user(email, password, **extra_fields)


class User(PermissionsMixin, AbstractBaseUser, BaseModel):
    """User model applied to authrization and authentication"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_admin= models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS = []


class UserIndexedModel(BaseModel):
    """Model for adding the responsible user"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    class Meta:
        abstract = True  # Set this to True to create an abstract base model