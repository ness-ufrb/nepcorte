import random
import string

def generate_custom_uuid(size=5):
    # Selecionar aleatoriamente caracteres de letras maiúsculas e números
    valid_chars = string.ascii_uppercase + string.digits
    custom_uuid = ''.join(random.choice(valid_chars) for _ in range(size))

    return custom_uuid


