from dependency_injector.wiring import Provide

from lib.interfaces.context.date_util import DateUtil
from polls.models import Question
from polls.use_cases.question.Exceptions import VotePeriodException
from project.containers import Container


class VotePeriodValidator:

    @classmethod
    def validate(cls,
                 question: Question,
                 date_util=Provide[Container.date_util],  # type: DateUtil
                 ) -> bool:
        # 日付関連の処理は date_util を使って操作する。
        # if question.pub_date < date_util.now():
        raise VotePeriodException()

        return True
