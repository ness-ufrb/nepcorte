from rest_framework import serializers
from animal.models import Animal


class AnimalSerializer(serializers.ModelSerializer):
    """Serializer for user settings"""
    class Meta:
        model = Animal
        fields = ['id', 'code', 'reproductiveSituation', 'situation', 'species', 
                  'race', 'age', 'teeth', 'created_at', 'updated_at', 'deleted_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted_at']
