from django.contrib.auth import get_user_model
from django.utils.translation import gettext as _
from rest_framework import serializers
from core.models.user import User

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object"""
    class Meta:
        model = get_user_model()
        fields = ['email', 'name', 'password']
        extra_kwargs = {
            'password': { 
                'write_only': True,
                'min_length': 8
            }
        }
    
    def create(self, validated_data):
        """Create and return a user with encrypted password"""
        return get_user_model().objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        """Update and return a user with encrypted password"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user
    
    def validate_email(self, value):
        """Verifica se o e-mail já está em uso"""
        User = get_user_model()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(_("Este e-mail já está registrado."))
        return value

from rest_framework import serializers

class RequestEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # Valida se o email existe no banco de dados
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Usuário com este e-mail não encontrado.")
        return value

from rest_framework import serializers
from django.utils import timezone
from core.models.token_password_change import ResetPasswordToken
from datetime import timedelta

class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Verificar se as senhas coincidem
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("As senhas não coincidem.")
        
        # Verificar se o token é válido e não expirou
        reset_token = ResetPasswordToken.objects.filter(token=data['token']).first()
        if not reset_token or reset_token.created_at < timezone.now() - timedelta(hours=1):
            raise serializers.ValidationError("Token inválido ou expirado.")
        
        # Anexar o usuário ao validated_data para uso posterior
        data['user'] = reset_token.user
        return data
