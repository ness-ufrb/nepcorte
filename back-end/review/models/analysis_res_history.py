from django.db import models
from core.models import UserIndexedModel, BaseModelManager
from .analysis_result import AnalysisResult

class AnalysisResultHistoryManager(BaseModelManager):
    """Manager for the users"""
    pass

class AnalysisResultHistory(UserIndexedModel):
    """User settings model"""
    STATUS_CHOICES = [
        ('waiting', 'Aguardando análise'),
        ('processing', 'Em análise'),
        ('completed', 'Concluído'),
    ]
    analysis_result = models.ForeignKey(AnalysisResult, on_delete=models.CASCADE)
    previous_status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    new_status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    
    objects = AnalysisResultHistoryManager()

    def __str__(self):
        return self.new_status