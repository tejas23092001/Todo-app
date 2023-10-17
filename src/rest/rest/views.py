from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
import uuid
from pymongo import MongoClient
from bson import json_util

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todos_col = db['todos']

class TodoListView(APIView):

    def get(self, request):
        docs = todos_col.find()
        # Implement this method - return all todo items from db instance above.
        return Response(json.loads(json_util.dumps(docs)), status=status.HTTP_200_OK)
        
    def post(self, request):
        my_json =  json.loads(request.body.decode('utf8'))

        todos_col.find_one_and_replace(filter={'description':my_json['description']},
            replacement={'description': my_json['description']},
            upsert=True)

        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        return Response({json.dumps(my_json)}, status=status.HTTP_200_OK)