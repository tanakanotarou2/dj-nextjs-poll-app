from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from polls.models import Choice, Question


class ChoiceSerializer(ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"


class QuestionDetailSerializer(ModelSerializer):
    choice_set = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = "__all__"


class QuestionEditSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = ['pub_date', 'question_text']


class QuestionSerializer(ModelSerializer):
    code = serializers.SerializerMethodField()

    def get_code(self, obj):
        return "ok"

    class Meta:
        model = Question
        fields = "__all__"
