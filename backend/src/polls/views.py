from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from prjlib.views import ModelViewSet
from polls.models import Question
from polls.serializers import QuestionDetailSerializer, QuestionSerializer, QuestionEditSerializer
from polls.use_cases.actions import (
    QuestionCreateAction,
    QuestionFindAllAction,
    QuestionUpdateAction,
)


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionDetailSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return QuestionFindAllAction.invoke()

    def _update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)

        # format などの validation は serializer で行いたいのでインスタンスの取得も妥協
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        action = QuestionUpdateAction(instance, serializer.validated_data)
        res_instance = action.execute()

        self.get_serializer(res_instance)

        # [memo]
        # prefetch, select_related の再取得は use case 側で行います。
        # view 側は 帰ってきた値を serialize し、response に追加することを責務とします。
        # if getattr(instance, '_prefetched_objects_cache', None):
        #     # If 'prefetch_related' has been applied to a queryset, we need to
        #     # forcibly invalidate the prefetch cache on the instance.
        #     instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    # inputとoutputのserializerが異なる場合、
    # ドキュメントの response の Serializer を指定する
    @extend_schema(
        request=QuestionEditSerializer,
        responses=QuestionSerializer,
    )
    def create(self, request, *args, **kwargs):
        # POSTで /api/polls/questions/ を実行した場合に実行されるmethod

        # request時のシリアライザ
        # フロント側の openapi2aspida で生成された typescript 定義だと, readonly の項目も必須入力となる。
        # 編集用の serializer を用意することを妥協します。
        request_serializer = QuestionEditSerializer(data=request.data, context=self.get_serializer_context())
        request_serializer.is_valid(raise_exception=True)

        # QuestionCreateActionに処理委譲
        action = QuestionCreateAction(request_serializer.validated_data)

        # model instance をやりとりすることは許容
        instance = action.execute()

        # response時のシリアライザ
        response_serializer = QuestionSerializer(instance)
        return self.wrap_success_create_response(response_serializer.data)

    def destroy(self, request, *args, **kwargs):
        """Questionデータを削除します"""
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
