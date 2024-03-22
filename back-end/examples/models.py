from django.db import models
from core.models import UserIndexedModel, BaseModelManager
    
class ExampleManager(BaseModelManager):
    """Manager for the users"""
    pass

class Example(UserIndexedModel):
    """User settings model"""
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    description = models.TextField(null=True)

    objects = ExampleManager()

    def __str__(self):
        return self.name