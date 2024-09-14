from enum import Enum

class CustomerReprodutiveSituation(Enum):
  MALE = 'Macho'
  FEMALE = 'Fêmea'
  CASTRATED = 'Castrado'
  
  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]
  