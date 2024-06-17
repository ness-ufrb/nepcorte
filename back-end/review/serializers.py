"""
Serializers for the examples API
"""
from rest_framework import serializers
from review.models.analysis_res_history import AnalysisResultHistory
from review.models.analysis_result import AnalysisResult
from review.models.uploaded_file import UploadedFile
from rest_framework import serializers
from rest_framework import serializers
from animal.models import Animal

class AnalysisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysisResult
        fields = ['id', 'animal_id', 'status', 'fat_distribution', 'marbling_level', 'type_result', 'result', 'created_at', 'updated_at', 'deleted_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted_at']

class AnalysisResultWithAnimalSerializer(serializers.ModelSerializer):
    analysis_result = AnalysisResultSerializer(many=True, read_only=True, source='analysis_results')

    class Meta:
        model = Animal
        fields = ['id', 'identifier', 'gender', 'animal_conditions', 'animal_species', 
                  'breed', 'productive_situation', 'animal_age', 'created_at', 'updated_at', 'deleted_at', 'analysis_result']
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted_at']

class AnalysisResultHistorySerializer(serializers.ModelSerializer):
    """Serializer for AnalysisResultHistory settings"""
    class Meta:
        model = AnalysisResultHistory
        fields = ['id', 'previous_status', 'created_at', 'updated_at', 'analysis_result', 'new_status']
        read_only_fields = ['id', 'created_at', 'updated_at']

class FileUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = UploadedFile
        fields = ['id', 'animal', 'file', 'uploaded_on']
        read_only_fields = ['id']
        