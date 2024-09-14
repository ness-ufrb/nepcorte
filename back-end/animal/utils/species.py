from enum import Enum

class CustomerSpecies(Enum):
  BOVINE = 'Bovino'
  CAPRINE = 'Caprino'
  OVINE = 'Ovino' 
  PORCINE = 'Suíno'
  
  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]
  