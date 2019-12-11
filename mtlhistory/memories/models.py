from django.db import models

from django.contrib.auth.models import User
#http://www.learningaboutelectronics.com/Articles/How-to-create-a-video-uploader-with-Python-in-Django.php


import requests

GKEY="AIzaSyBMNy2d4VK0AWVfUSDYe3luvrFykVhNsZk"
mapquestKEY="OybGzsSmlQs1ANATGf1bjlGC5VdH9VUZ"

def get_geocode(address):
    address=address.replace(" ","+")
    response = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+"&key="+GKEY)
    #response = requests.get("http://open.mapquestapi.com/geocoding/v1/address?key="+mapquestKEY+"&location="+address+")
    resp_json_payload = response.json()

    return resp_json_payload['results'][0]['geometry']['location']


#got the geolocation from https://developer.mapquest.com/plan_purchase/steps/business_edition/business_edition_free/register


class MemoryCategory(models.Model):
    category = models.CharField(max_length=50,null=True)

    def __str__(self):
        return self.category

# Create your models here.
class Memory(models.Model):
    title = models.CharField(max_length=50,null=True)
    description = models.TextField(blank=True,default='',null=True)
    photo = models.ImageField(null=True,blank=True)
    video= models.FileField(upload_to='videos/', null=True, blank=True,verbose_name="Video")
    audio=models.FileField(upload_to='audio/', null=True, blank=True,verbose_name="Audio")
    address= models.CharField(max_length=50,null=True,default="")
    longitude=models.DecimalField(max_digits=9, decimal_places=6,null=True,blank=True,default=None)
    latitude=models.DecimalField(max_digits=9, decimal_places=6,null=True,blank=True,default=None)
    heading=models.IntegerField(null=True,blank=True)
    pitch=models.IntegerField(null=True,blank=True)
    dateofmemory= models.DateField()
    owner=models.ForeignKey(User,related_name="memories",null=True,on_delete=models.SET_NULL)
    category = models.ManyToManyField(MemoryCategory,null=True,blank=True)
    #one picture could belong to many categories

    def __str__(self):
        return self.title

    def save(self,*args,**kwargs):
        if self.longitude==None and self.address!=None:
            coordinates=get_geocode(self.address)
            self.latitude=coordinates["lat"]
            self.longitude=coordinates["lng"]
        super().save(*args,**kwargs)

