from django.conf import settings
from django.db import models
from django.utils import timezone
from datetime import timedelta

class ResetPasswordToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    token = models.CharField(max_length=8)  # Usando um código de 6 dígitos
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        # Verifica se o token ainda está válido após 1 hora da criação
        return self.created_at >= timezone.now() - timedelta(hours=72)

    def __str__(self):
        return f'Token for {self.user.email}'
