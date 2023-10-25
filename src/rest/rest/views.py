from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
from pymongo import MongoClient
from bson import json_util
from django.conf import settings
import os

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todos_col = db['todos']

class TodoListView(APIView):

    def get(self, request):
        try:
            docs = settings.todos_col.find()
            return Response(json.loads(json_util.dumps(docs), status=status.HTTP_200_OK))
        except Exception as e:
            return Response({"error": "An error occurred while fetching todos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            my_json = json.loads(request.body.decode('utf8'))
            description = my_json.get('description')

            if not description:
                return Response({"error": "Description field not found in request"}, status=status.HTTP_400_BAD_REQUEST)

            settings.todos_col.find_one_and_replace(
                filter={'description': description},
                replacement={'description': description},
                upsert=True
            )

            return Response(my_json, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": "An error occurred while creating the todo"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)