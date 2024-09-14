from django.db import models
from .utils import reproductive_situation, situation, species
# Create your models here.
from django.db import models
from core.models import UserIndexedModel, BaseModelManager
from django.core.validators import MinValueValidator, MaxValueValidator

class AnimalManager(BaseModelManager):
    """Manager for the users"""
    pass

class Animal(UserIndexedModel):
    
    code                  = models.CharField(max_length=30, editable=True)
    reproductiveSituation = models.CharField(max_length=10, choices=reproductive_situation.CustomerReprodutiveSituation.choices())
    situation             = models.CharField(max_length=26, choices=situation.CustomerSituation.choices())
    race                  = models.CharField(max_length=125)
    age                   = models.IntegerField(verbose_name='animal age', validators=[MinValueValidator(1), MaxValueValidator(2400)])
    description           = models.TextField(default='')
    teeth                 = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(44)], blank=True, null=True)
    species               = models.CharField(
        max_length=8,
        choices=species.CustomerSpecies.choices(),
        default=species.CustomerSpecies.BOVINE,
    )
    objects = AnimalManager()

    def __str__(self):
        return str(self.code)

