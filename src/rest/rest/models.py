from django.db import models
    # Create your models here.

    # add this
    class Todo(models.Model):
      key = models.CharField()
      description = models.TextField()
      completed = models.BooleanField(default=False)

      def _str_(self):
        return self.title