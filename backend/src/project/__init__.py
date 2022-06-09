# # from django.conf import settings
# def _build_container():
from dependency_injector import providers
from django.utils.functional import SimpleLazyObject


def build_container():
    """
    DI の関数でモデルを利用できるように
    公式の example を遅延ローディングするようにしている

    https://python-dependency-injector.ets-labs.org/examples/django.html
    """
    from . import settings
    from .containers import Container
    from lib.context.date_util import DjangoDateUtil

    container = Container(date_util=DjangoDateUtil())
    container.config.from_dict(settings.__dict__)
    return container


container = SimpleLazyObject(build_container)
