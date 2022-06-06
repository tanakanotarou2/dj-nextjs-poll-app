from dependency_injector.wiring import Provide

from polls.models import Question
from project.containers import Container


class QuestionIndexAction:
    @classmethod
    def invoke(
        *args,
        example_service=Provide[Container.poll_services.example_service],
        **kwargs
    ):
        print(example_service.invoke())

        return Question.objects.all()
