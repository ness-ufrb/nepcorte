from django.db import models
from .utils import genders, animal_conditions, species
# Create your models here.
from django.db import models
from core.models import UserIndexedModel, BaseModelManager
from django.core.validators import MinValueValidator, MaxValueValidator

class AnimalManager(BaseModelManager):
    """Manager for the users"""
    pass

class Animal(UserIndexedModel):
    
    identifier           = models.CharField(max_length=5, editable=True)
    gender               = models.CharField(max_length=8, choices=genders.CustomerGender.choices(), default=genders.CustomerGender.MALE)
    animal_conditions    = models.CharField(max_length=26, choices=animal_conditions.CustomerConditions.choices(), default=animal_conditions.CustomerConditions.APT_FOR_SLAUGHTER)
    breed                = models.CharField(max_length=125)
    productive_situation = models.CharField(max_length=125, verbose_name='productive situation')
    animal_age           = models.IntegerField(verbose_name='animal age', validators=[MinValueValidator(1), MaxValueValidator(2400)])
    description          = models.CharField(max_length=300, default='')
    animal_species       = models.CharField(
        max_length=8, 
        choices=species.CustomerSpecies.choices(), 
        default=species.CustomerSpecies.BOVINE, 
    )
    objects = AnimalManager()

    def __str__(self):
        return str(self.identifier)

