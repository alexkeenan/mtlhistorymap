from django.db import models
from django.contrib.auth.model import User

#http://www.learningaboutelectronics.com/Articles/How-to-create-a-video-uploader-with-Python-in-Django.php

# Create your models here.
class Memory(models.Model):
    Title = models.CharField(max_length=50,null=True)
    Description = models.TextField(blank=True,default='',null=True)
    Photo = models.ImageField(null=True)
    Video= models.FileField(upload_to='videos/', null=True, verbose_name="")
    Audio=models.FileField(upload_to='audio/', null=True, verbose_name="")
    Address= models.CharField(max_length=50,null=True)
    Coordinates=models.DecimalField(max_digits=9, decimal_places=6,null=True)
    DateOfMemory= models.DateField()
    Owner=models.ForeignKey(User,related_name="memories",null=True,on_delete=models.SET_NULL)
    #one picture could belong to many categories
    Category=models.ManyToManyField(MemoryCategory)

    def __str__(self):
        return self.Title


class MemoryCategory(models.Model):
    Category = models.CharField(max_length=50,null=True)
    Memories = models.ForeignKey(OldPicture)

    def __str__(self):
        return self.Category