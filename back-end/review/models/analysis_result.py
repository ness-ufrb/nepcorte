from django.db import models
from core.models import UserIndexedModel, BaseModelManager
from animal.models import Animal 


class AnalysisResultManager(BaseModelManager):
    """Manager for the users"""
    pass

class AnalysisResult(UserIndexedModel):
    """User settings model""" 
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    type = models.CharField(max_length=255)
    result = models.TextField()

    STATUS_CHOICES = [
        ('waiting', 'Aguardando análise'),
        ('processing', 'Em análise'),
        ('completed', 'Concluído'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    
    objects = AnalysisResultManager()

    def __str__(self):
        return self.animal.identifier
    