"""
Serializers for the examples API
"""
from rest_framework import serializers
from .models import AnalysisResult, AnalysisResultHistory
from .models import UploadedFile


class AnalysisResultSerializer(serializers.ModelSerializer):
    """Serializer for AnalysisResult settings"""
    class Meta:
        model = AnalysisResult
        fields = ['id', 'animal', 'type', 'result', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class AnalysisResultHistorySerializer(serializers.ModelSerializer):
    """Serializer for AnalysisResultHistory settings"""
    class Meta:
        model = AnalysisResultHistory
        fields = ['id', 'previous_status', 'created_at', 'updated_at', 'analysis_result', 'new_status']
        read_only_fields = ['id', 'created_at', 'updated_at']


class FileUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = UploadedFile
        fields = ['id', 'animal', 'file', 'uploaded_on', ]
        read_only_fields = ['id']
        