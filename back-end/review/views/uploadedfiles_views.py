from rest_framework import status
from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from review.models import UploadedFile 
from rest_framework import status
from rest_framework.response import Response
from review.serializers import FileUploadSerializer  
from PIL import Image
from rest_framework.parsers import FormParser, MultiPartParser
from review.ia_code.marbling import segmentation
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from rest_framework.pagination import PageNumberPagination

class UploadedFilesPagination(PageNumberPagination):
    page_size = 4

# media_storage = FileSystemStorage(location=settings.MEDIA_ROOT)

class ImageUploadAPIView(APIView):
    
    serializer_class = FileUploadSerializer
    pagination_class = UploadedFilesPagination
    #Lembrar do jwt

    def is_image(self, file):
        try:
            #Tenta abrir o arquivo como uma imagem
            Image.open(file)
            return True
        except Exception:
            return False

    @extend_schema(
        parameters=[
            OpenApiParameter('file', OpenApiTypes.BINARY, description='Image file to upload'),
            OpenApiParameter('animal', OpenApiTypes.INT, description='Animal ID'),
        ],
        responses={200: OpenApiTypes.BINARY},
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        file = request.data['file']

        if self.is_image(file):
            if serializer.is_valid():
                uploaded_file = serializer.save() 
                # file_path = media_storage.save(uploaded_file.file.name, uploaded_file.file.name)

                mask = segmentation.make_mask(os.path.join(settings.MEDIA_ROOT, uploaded_file.file.name))
                print(mask.shape)

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

    def get(self, request, *args, **kwargs):
        fotos = UploadedFile.objects.all()
        serializer = FileUploadSerializer(instance=fotos, many=True)  
        return Response(serializer.data)           
