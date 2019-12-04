from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    ## will use the create function you have in the serializers.py file
    user = serializer.save()

    # Response Renders to content type as requested by the client.
    return Response({
      ## .get_serializer_context -> Returns a dictionary containing any extra context that should be supplied to the serializer. 
      # ## Defaults to including 'request', 'view' and 'format' keys.
      
      ## here I have the data already with user, but I guess I want to send it as json and you need to serialize it again?? thus UserSerializer?
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })

# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    ## only difference here is that we're not creating a new user, we're just validating it. 
    ## remember that we're using the login serializer we've defined our out validate function in there
    ## which is what gets activated with is_valid I imagine

    serializer.is_valid(raise_exception=True)

    user = serializer.validated_data

    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })

# Get User API
class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user