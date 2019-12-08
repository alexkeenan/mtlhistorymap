from django.contrib import admin
from . import models
# Register your models here.


admin.site.register(models.Memory)
admin.site.register(models.MemoryCategory)