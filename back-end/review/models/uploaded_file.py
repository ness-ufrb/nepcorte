from django.db import models
from review.models.analysis_result import AnalysisResult

class UploadedFile(models.Model):
    analysis_id = models.ForeignKey(AnalysisResult, on_delete=models.CASCADE)
    file        = models.FileField()
    uploaded_on = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.uploaded_on.date()