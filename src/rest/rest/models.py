from django.db import models
    # Create your models here.

class Todo(models.Model):
  key = models.CharField()
  description = models.TextField()

  def _str_(self):
    return self.title