from sys import displayhook
from django.db import models

# Create your models here.
class words(models.Model):
    Word=models.CharField(max_length=6)

class new(models.Model):
    Add=models.IntegerField()
    
class Word(models.Model):
    word = models.CharField(max_length=100)

    def __str__(self):
        return self.word