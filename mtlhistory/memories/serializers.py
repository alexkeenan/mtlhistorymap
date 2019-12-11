from rest_framework import serializers
from memories.models import Memory, MemoryCategory

class MemorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Memory
        fields='__all__'


class MemoryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=MemoryCategory
        fields='__all__'