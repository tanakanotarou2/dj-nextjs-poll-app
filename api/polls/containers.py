from dependency_injector import containers, providers

from polls.models import Question


class ExampleService:
    def invoke(self):
        return Question.objects.all()


class PollServices(containers.DeclarativeContainer):
    config = providers.Configuration()
    example_service = providers.Factory(ExampleService)


# 以下のように利用できる
#     def function(example_service=Provide[Container.poll_services.example_service]):                  ):
#         print(example_service.invoke())
#
