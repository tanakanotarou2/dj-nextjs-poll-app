from dependency_injector import containers, providers

from polls.containers import PollServices


class TestService:
    def run(self):
        print("called run")


class Container(containers.DeclarativeContainer):
    config = providers.Configuration()
    test_service = providers.Factory(TestService)
    poll_services = providers.Container(PollServices)
