from rest_framework import viewsets, permissions
from .serializers import MemorySerializer,MemoryCategorySerializer
from .models import Memory

## is there not a more elegant way of handling authentication? decorator or something?

class JustViewMemories(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = MemorySerializer

    def get_queryset(self):
        return Memory.objects.all()


class MemoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MemorySerializer

    def get_queryset(self):
        return Memory.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MemoryCategoriesViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MemoryCategorySerializer

    def get_queryset(self):
        return MemoryCategory.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


