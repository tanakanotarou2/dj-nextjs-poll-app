from django.db.models import F

from polls.models import Choice
from polls.use_cases.question.validators import VotePeriodValidator


class VoteAction:
    """投票アクション"""

    def __init__(self, choice_id):
        self.choice_id = choice_id

    def execute(self) -> Choice:

        choice = Choice.objects.select_related("question").get(id=self.choice_id)
        VotePeriodValidator.validate(choice.question)

        Choice.objects.filter(id=self.choice_id).update(votes=F("votes") + 1)
        choice.refresh_from_db()
        return choice

    def __call__(self, *args, **kwargs) -> Choice:
        return self.execute()
