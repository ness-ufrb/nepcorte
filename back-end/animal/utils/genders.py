from enum import Enum

class CustomerGender(Enum):
  MALE = 'macho'
  FEMALE = 'femêa'
  
  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]
  