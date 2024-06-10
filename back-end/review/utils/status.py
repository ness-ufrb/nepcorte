from enum import Enum

class CustomerStatus(Enum):
  WAITING = 'aguardando análise'
  PROCESSING = 'em análise'
  COMPLETED = 'concluído' 
  
  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]
  