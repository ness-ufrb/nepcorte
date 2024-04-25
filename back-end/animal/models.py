from django.db import models

# Create your models here.
from django.db import models
from core.models import UserIndexedModel, BaseModelManager
from .utils.identifier_generate import generate_custom_uuid

class AnimalManager(BaseModelManager):
    """Manager for the users"""
    pass

class Animal(UserIndexedModel):
    custom_uuid = generate_custom_uuid()
    identifier = models.CharField(max_length=5, default=custom_uuid, editable=False)
    ANIMAL_CONDITIONS=[
        ('apt_for_slaughter', 'Apto para o abate'),
        ('sick_or_injured', 'Doente ou machucado'),
        ('wrong_batch', 'Animal está no lote errado'),
    ]
    animal_conditions = models.CharField(max_length=20, choices=ANIMAL_CONDITIONS)

    ANIMAL_SPECIES=[
        ('bovine', 'Bovino'),
        ('caprine', 'Caprino'),
        ('ovine', 'Ovino'),
        ('porcine', 'Suíno'),
    ]
    animal_species = models.CharField(max_length=8, choices=ANIMAL_SPECIES, verbose_name='animal species')

    breed = models.CharField(max_length=125)
    productive_situation = models.CharField(max_length=125, verbose_name='productive situation')
    animal_age = models.IntegerField(verbose_name='animal age')
    description = models.CharField(max_length=300, default='')

    objects = AnimalManager()

    def __str__(self):
        return str(self.identifier)

