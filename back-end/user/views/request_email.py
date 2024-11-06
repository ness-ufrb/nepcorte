import random
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from core.models.token_password_change import ResetPasswordToken
from core.models.user import User
from user.serializers import RequestEmailSerializer
from django.conf import settings

from drf_spectacular.utils import extend_schema

class RequestEmailView(APIView):
    @extend_schema(request=RequestEmailSerializer)
    def post(self, request):
        serializer = RequestEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email=email).first()
            
            # Gerar um token único
            token = str(random.randint(10000000, 99999999))
            ResetPasswordToken.objects.create(user=user, token=token, created_at=timezone.now())
            # Conteúdo do e-mail
            html_content = render_to_string('token.html', { 'email': email, 'token': token })
            text_content = strip_tags(html_content)

            # Enviar e-mail com o token usando EmailMultiAlternatives
            send_email = EmailMultiAlternatives(
                'Redefinição de Senha',
                text_content,
                settings.EMAIL_HOST_USER,
                [user.email]
            )
            send_email.attach_alternative(html_content, 'text/html')
            send_email.send()

            return Response({'message': 'Token enviado com sucesso.'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
