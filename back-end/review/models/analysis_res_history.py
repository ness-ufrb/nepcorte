from django.db import models
from core.models import UserIndexedModel, BaseModelManager
from .analysis_result import AnalysisResult
from review.utils import status

class AnalysisResultHistoryManager(BaseModelManager):
    """Manager for the users"""
    pass

class AnalysisResultHistory(UserIndexedModel):
    """User settings model"""
    analysis_result = models.ForeignKey(AnalysisResult, on_delete=models.CASCADE)
    previous_status = models.CharField(max_length=20, choices=status.CustomerStatus.choices(), default=status.CustomerStatus.PROCESSING)
    new_status      = models.CharField(max_length=20, choices=status.CustomerStatus.choices(), default=status.CustomerStatus.PROCESSING)
    
    objects = AnalysisResultHistoryManager()

    def __str__(self):
        return self.new_status