from rest_framework import serializers
from memories.models import Memory

class MemorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Memory
        fields='__all__'