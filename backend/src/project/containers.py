from dependency_injector import containers, providers

from lib.interfaces.context.date_util import DateUtil


class Container(containers.DeclarativeContainer):
    config = providers.Configuration()
    date_util = providers.Dependency(instance_of=DateUtil)
