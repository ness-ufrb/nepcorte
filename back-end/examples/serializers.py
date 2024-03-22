"""
Serializers for the examples API
"""
from rest_framework import serializers
from examples.models import Example


class ExampleSerializer(serializers.ModelSerializer):
    """Serializer for user settings"""

    class Meta:
        model = Example
        fields = ['id', 'name', 'is_active', 'created_at', 'updated_at', 'deleted_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted_at']


class ExampleDetailSerializer(ExampleSerializer):
    """Serializer for the example detail view"""

    class Meta(ExampleSerializer.Meta):
        fields = ExampleSerializer.Meta.fields + ['description']