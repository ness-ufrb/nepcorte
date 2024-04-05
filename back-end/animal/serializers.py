"""
Serializers for the examples API
"""
from rest_framework import serializers
from animal.models import Animal


class AnimalSerializer(serializers.ModelSerializer):
    """Serializer for user settings"""
    class Meta:
        model = Animal
        fields = ['id', 'identifier', 'animal_conditions', 'animal_species', 
                  'breed', 'productive_situation', 'animal_age']
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted_at']


class AnimalDetailSerializer(AnimalSerializer):
    """Serializer for the Animal detail view"""
    class Meta(AnimalSerializer.Meta):
        fields = AnimalSerializer.Meta.fields + ['description']