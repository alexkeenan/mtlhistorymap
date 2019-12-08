from rest_framework import routers
from .api import MemoryViewSet

router = routers.DefaultRouter()
# url prefix, viewset class, name (if you don't specify a name it will create one based on your url)
# https://www.django-rest-framework.org/api-guide/routers/
router.register('api/memories', MemoryViewSet, 'memories')
# with this prefix, you access the api via http://127.0.0.1:8000/api/leads/


urlpatterns = router.urls  # this gives us a list of urls
