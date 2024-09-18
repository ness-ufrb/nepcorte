from django.db import models
from animal.models import Animal

class UploadedFile(models.Model):
    animal_id   = models.ForeignKey(Animal, on_delete=models.CASCADE)
    file        = models.FileField()
    uploaded_on = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.uploaded_on.date()