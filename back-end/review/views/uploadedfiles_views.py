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
from django_q.tasks import async_task
from review.models.analysis_result import AnalysisResult

import random
import time
from django_q.tasks import async_task
from review.models.analysis_result import AnalysisResult

# Valores de resultados
marbling_levels = [
    'ausente',          # Sem marmoreio visível
    'leve',             # Pequenas manchas de gordura
    'moderado',         # Quantidade média de gordura intramuscular
    'abundante',        # Grande quantidade de gordura bem distribuída
    'excessivo'         # Quantidade muito alta de gordura intramuscular
]

fat_distribution = [
    'insuficiente',     # Cobertura de gordura muito fina
    'escassa',          # Cobertura de gordura abaixo do ideal
    'adequada',         # Cobertura de gordura uniforme e ideal
    'moderada',         # Cobertura de gordura acima do ideal
    'excessiva'         # Cobertura de gordura muito espessa
]

def simulate_ai_processing():
    """Função que simula a execução da IA com um tempo aleatório."""
    random_time = random.randint(0, 3)  # Tempo aleatório entre 0 e 3 segundos
    time.sleep(random_time)  # Simular o tempo de execução da IA

    # Retorna resultados usando as novas categorias
    ai_results = {
        'marbling_level': random.choice(marbling_levels),
        'fat_distribution': random.choice(fat_distribution),
    }
    
    return ai_results

def execute_ai_task(analysis_result_id):
    try:
        print(f"Iniciando processamento de IA para análise com ID: {analysis_result_id}")
        
        # Simula o tempo de processamento e obter os resultados
        ai_results = simulate_ai_processing()
        print(f"Resultados da IA: {ai_results}")

        # Atualiza o objeto de análise com os novos resultados
        analysis_result = AnalysisResult.objects.get(id=analysis_result_id)
        analysis_result.marbling_level = ai_results.get('marbling_level')
        analysis_result.fat_distribution = ai_results.get('fat_distribution')
        analysis_result.save()

        print(f"Análise com ID {analysis_result_id} atualizada com sucesso.")

    except AnalysisResult.DoesNotExist:
        print(f"AnalysisResult com ID {analysis_result_id} não foi encontrado.")
    except Exception as e:
        print(f"Erro durante a execução da tarefa de IA: {str(e)}")



class ImageUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = FileUploadSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def is_image(self, file):
        """Verifica se o arquivo enviado é uma imagem válida."""
        try:
            with Image.open(file) as img:
                img.verify()  # Verifica se o arquivo é uma imagem válida
            return True
        except Exception:
            return False

    @extend_schema()
    def post(self, request, *args, **kwargs):
        """Realiza o upload da imagem e inicia o processamento da IA."""
        file = request.FILES.get('file')
        analysis_id = request.data.get('analysis_id')

        if not file or not analysis_id:
            return Response(
                {"error": "Os campos 'file' e 'analysis_id' são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if self.is_image(file):
            data = {'file': file, 'analysis_id': analysis_id}
            serializer = self.serializer_class(data=data)

            if serializer.is_valid():
                serializer.save()
                # Iniciar a tarefa de IA em segundo plano
                async_task('review.views.execute_ai_task', analysis_id)

                return Response(
                    {"message": "Imagem enviada com sucesso. A análise será atualizada automaticamente."},
                    status=status.HTTP_201_CREATED
                )

            # Excluir a análise criada
            
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"error": "O arquivo enviado não é uma imagem válida."},
            status=status.HTTP_400_BAD_REQUEST
        )
