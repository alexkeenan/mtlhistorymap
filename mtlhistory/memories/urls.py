from rest_framework import routers
from .api import MemoryViewSet,JustViewMemories,MemoryCategoriesViewSet

router = routers.DefaultRouter()
# url prefix, viewset class, name (if you don't specify a name it will create one based on your url)
# https://www.django-rest-framework.org/api-guide/routers/

#get memories
router.register('api/memories', JustViewMemories, 'view_memories') 



#Requires authentication, access to 
router.register('api/memory', MemoryViewSet, 'memories')


"""
FOR SOME REASON, THE URL BELOW WILL NEVER BE FOUND. YOU MUST GET RID OF THE  '/' FOR IT TO WORK. 

# view or create memory categories
router.register('api/memory/categories', MemoryCategoriesViewSet, 'memory_categories')


"""
# view or create memory categories
#for some reason if you do api/memory/categories it won't work, but api/memorycategories will.
router.register('api/memorycategories', MemoryCategoriesViewSet, 'memory_categories')





urlpatterns = router.urls  # this gives us a list of urls
