from rest_framework import viewsets, permissions,authentication
from .serializers import MemorySerializer,MemoryCategorySerializer
from .models import Memory,MemoryCategory

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from rest_framework.parsers import MultiPartParser, FormParser,JSONParser,FileUploadParser 

class JustViewMemories(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = MemorySerializer

    def get_queryset(self):
        return Memory.objects.all()



class MemoryViewSet(viewsets.ModelViewSet):
    #parser_class = (FileUploadParser,)
    #parser_classes = (MultiPartParser,FileUploadParser, FormParser)

    #https://stackoverflow.com/questions/46806335/fileuploadparser-doesnt-get-the-file-name/46895937 tells me to just use multipartparser
    parser_classes = (JSONParser,MultiPartParser, FormParser,FileUploadParser )

    #permission_classes = [        permissions.IsAuthenticated,    ]

    serializer_class = MemorySerializer
    
    def get_queryset(self):
        memories= Memory.objects.all()
        return memories

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

"""
class MemoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MemorySerializer

    def get_queryset(self):
        return Memory.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



#if I do this, i get NOT FOUND 404 error
class MemoryViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = MemorySerializer

    def get_queryset(self):
        memories= Memory.objects.all()
        return memories

    def post(self, request, *args, **kwargs):
        file_serializer = self.get_serializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""

class MemoryCategoriesViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = MemoryCategorySerializer

    def get_queryset(self):
        return MemoryCategory.objects.all()
        #return MemoryCategory.objects.order_by().values('category').distinct()
        #return MemoryCategory.objects.order_by().values_list('category').distinct()
        #return "sanity check"

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

