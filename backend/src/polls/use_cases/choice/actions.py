from django.db.models import F

from polls.models import Choice


class VoteAction:
    """投票アクション"""

    def __init__(self, choice_id):
        self.choice_id = choice_id

    def execute(self) -> Choice:
        Choice.objects.filter(id=self.choice_id).update(votes=F("votes") + 1)
        return Choice.objects.get(id=self.choice_id)
