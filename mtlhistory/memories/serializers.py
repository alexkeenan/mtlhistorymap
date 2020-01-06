from rest_framework import generics, serializers
from rest_framework.parsers import MultiPartParser, FormParser

from memories.models import Memory, MemoryCategory

#https://stackoverflow.com/questions/48756249/django-rest-uploading-and-serializing-multiple-images

#https://stackoverflow.com/questions/37336559/how-to-use-django-imagefield-and-why-use-it-at-all

#https://stackoverflow.com/questions/28036404/django-rest-framework-upload-image-the-submitted-data-was-not-a-file

class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)



class MemorySerializer(serializers.ModelSerializer):

    """
    photo = serializers.FileField(
        max_length=None, use_url=True,
    )
    """

    class Meta:
        model=Memory
        fields='__all__'

    """
    photo = serializers.ImageField(
        max_length=None, use_url=True,
    )

    photo = Base64ImageField(
        max_length=None, use_url=True,
    )

    parser_classes = (MultiPartParser, FormParser)
    """


"""
class TaskSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    images = TaskImageSerializer(source='taskimage_set', many=True, read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'user', 'images')

    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        task = Task.objects.create(title=validated_data.get('title', 'no-title'),
                                   user_id=1)
        for image_data in images_data.values():
            TaskImage.objects.create(task=task, image=image_data)
        return task
"""

class MemoryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=MemoryCategory
        fields='__all__'

