from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from polls.models import Question
from polls.serializers import QuestionSerializer
from polls.use_cases.actions import QuestionIndexAction


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return QuestionIndexAction.invoke()
