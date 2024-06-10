"""
Serializers for the examples API
"""
from rest_framework import serializers
from animal.models import Animal


class AnimalSerializer(serializers.ModelSerializer):
    """Serializer for user settings"""
    class Meta:
        model = Animal
        fields = ['id', 'identifier', 'gender', 'animal_conditions', 'animal_species', 
                  'breed', 'productive_situation', 'animal_age', 'created_at', 'updated_at', 'deleted_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted_at']
