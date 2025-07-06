from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from MotivationBuddy.Agent.agent import return_prompt, init_agent


class Agent(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        return Response("hi")
        reminder = request.query_params.get('reminder')
        response = return_prompt(reminder);
        print("Response from agent:", response)
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        personality = str(request.data.get('personality'))
        init_agent(personality)
        print("Agent initialized with personality:", personality)
        return Response(status=status.HTTP_200_OK)