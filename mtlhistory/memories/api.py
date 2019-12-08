from rest_framework import viewsets, permissions
from .serializers import MemorySerializer
from .models import Memory
# Lead Viewset


class MemoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = MemorySerializer

    def get_queryset(self):
        return Memory.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
