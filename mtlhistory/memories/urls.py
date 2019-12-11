from rest_framework import routers
from .api import MemoryViewSet,JustViewMemories,MemoryCategoriesViewSet

router = routers.DefaultRouter()
# url prefix, viewset class, name (if you don't specify a name it will create one based on your url)
# https://www.django-rest-framework.org/api-guide/routers/

#get memories
router.register('api/memories', JustViewMemories, 'memories') 

#Requires authentication, access to 
router.register('api/memory', MemoryViewSet, 'create_memories')
# view or create memory categories
router.register('api/memory/categories', MemoryCategoriesViewSet, 'memory_categories')

urlpatterns = router.urls  # this gives us a list of urls
