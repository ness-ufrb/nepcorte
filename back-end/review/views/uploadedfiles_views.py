from rest_framework import status
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework.response import Response
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
            # Try opening the file as an image
            Image.open(file)
            return True
        except Exception:
            return False

    @extend_schema()
    def post(self, request, *args, **kwargs):

        # Receiving the data for processing
        file = request.FILES.get('file')
        animal = request.POST.get('animal')

        # If any field is empty
        if not file or not animal:
            return Response(
                {"error": "Os campos 'file' e 'animal' são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if self.is_image(file):
            # If the file is an image
            # Create the data dictionary for the serializer
            data = {'file': file, 'animal': animal}
            serializer = self.serializer_class(data=data)

            if serializer.is_valid():
                uploaded_file = serializer.save()
                # Here's some additional processing (using artificial intelligence)
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
