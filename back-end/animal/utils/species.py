from enum import Enum

class CustomerSpecies(Enum):
  BOVINE = 'bovino'
  CAPRINE = 'caprino'
  OVINE = 'ovino' 
  PORCINE = 'suíno'
  
  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]
  