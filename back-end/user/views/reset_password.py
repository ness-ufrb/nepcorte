from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from core.models.token_password_change import ResetPasswordToken
from datetime import timedelta
from user.serializers import ResetPasswordSerializer

from drf_spectacular.utils import (
    extend_schema,
)

class ResetPasswordView(APIView):
    @extend_schema(request=ResetPasswordSerializer)
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            new_password = serializer.validated_data['new_password']
            
            # Alterar a senha do usuário e salvar
            user.set_password(new_password)
            user.save()
            
            # Excluir o token após o uso
            ResetPasswordToken.objects.filter(token=serializer.validated_data['token']).delete()
            
            return Response({'message': 'Senha alterada com sucesso.'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

