from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from polls.models import Question
from polls.serializers import QuestionSerializer


class QuestionViewSet(viewsets.ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]
