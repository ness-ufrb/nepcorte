from django.db import models
from core.models import UserIndexedModel, BaseModelManager
from animal.models import Animal 
from review.utils.status import CustomerStatus

class AnalysisResult(BaseModelManager):
    """Manager for the users"""
    pass

class AnalysisResult(UserIndexedModel):

    type_result      = models.CharField(max_length=255)
    marbling_level   = models.CharField(max_length=55)
    fat_distribution = models.CharField(max_length=55)
    result           = models.TextField()
    status           = models.CharField(max_length=30, choices=CustomerStatus.choices(), default=CustomerStatus.WAITING)
    animal_id        = models.ForeignKey(Animal, related_name='analysis_results', on_delete=models.CASCADE)
    
    objects = AnalysisResult()

    def __str__(self):
        return self.animal_id.identifier

    
