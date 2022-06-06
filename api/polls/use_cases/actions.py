from dependency_injector.wiring import Provide

from polls.models import Question
from project.containers import Container


class QuestionFindAllAction:
    @classmethod
    def invoke(*args, **kwargs):
        """
        QuerySet返すだけのような場合は view から直接読んでも良いことにする。
        業務的な処理が入る場合は UseCase(Action) に切り出す。
        例) ログインユーザーによって参照範囲を制限する場合など

        """
        return Question.objects.all()


class QuestionCreateAction:
    def __init__(self, data: dict):
        self._data = data

    def execute(self) -> Question:
        q = Question(
            question_text=self._data["question_text"],
            pub_date=self._data["pub_date"])

        q.save()
        return q


class QuestionUpdateAction:
    def __init__(self, instance: Question, data: dict):
        self._instance = instance
        self._data = data

    def execute(self) -> Question:
        # 業務的な validation があれば validation service を作る

        # 本当は1項目づつみるほうが適切と思う
        for k, v in self._data.items():
            setattr(self._instance, k, v)

        self._instance.save()

        # レスポンス用に加工が必要なら行う
        return self._instance


class QuestionDeleteAction:
    """
    削除のアクション
    検索同様に、業務ロジックを挟まないなら view だけで済ませても良い
    """

    def __init__(self, instance: Question):
        self._instance = instance

    def execute(self) -> None:
        self._instance.delete()
