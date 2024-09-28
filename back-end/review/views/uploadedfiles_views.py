from rest_framework import status
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from review.serializers import FileUploadSerializer  
from PIL import Image
from review.ia_code.marbling import segmentation
import os
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser

class ImageUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = FileUploadSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def is_image(self, file):
        try:
            with Image.open(file) as img:
                img.verify()  # Verifica se o arquivo é uma imagem válida
            return True
        except Exception:
            return False

    @extend_schema()
    def post(self, request, *args, **kwargs):
        # Usar request.data para acessar tanto os arquivos quanto os outros campos
        file = request.FILES.get('file')
        animal = request.data.get('animal_id')
        print(animal)
        print(file)
        # Se qualquer campo estiver vazio
        if not file or not animal:
            return Response(
                {"error": "Os campos 'file' e 'animal_id' são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verificar se o arquivo é uma imagem válida
        if self.is_image(file):
            # Criar o dicionário de dados para o serializer
            data = {'file': file, 'animal_id': animal}
            serializer = self.serializer_class(data=data)

            if serializer.is_valid():
                uploaded_file = serializer.save()

                # Aqui você pode realizar o processamento adicional (como inteligência artificial)
                # mask = segmentation.make_mask(os.path.join(settings.MEDIA_ROOT, uploaded_file.file.name))
                # print(mask.shape)

                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED
                )

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"error": "O arquivo enviado não é uma imagem válida."},
            status=status.HTTP_400_BAD_REQUEST
        )
