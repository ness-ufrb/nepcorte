import random
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from core.models.token_password_change import ResetPasswordToken
from core.models.user import User
from user.serializers import RequestEmailSerializer
from drf_spectacular.utils import extend_schema
from user.utils.email_utils import send_email_with_token

class RequestEmailView(APIView):
    @extend_schema(request=RequestEmailSerializer)
    def post(self, request):
        serializer = RequestEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email=email).first()

            if not user:
                return Response({"error": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
            
            # Gerar um token único
            token = str(random.randint(10000000, 99999999))
            ResetPasswordToken.objects.create(user=user, token=token, created_at=timezone.now())

            
            subject = f"{token} É o seu Token de Redefinição de Senha"
            try:
                # Envio do email.
                
                send_email_with_token(email=email, token=token, subject=subject, html_local='token.html')

                return Response({'message': 'Token enviado com sucesso.'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
