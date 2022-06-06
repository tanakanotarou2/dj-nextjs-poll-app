from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from polls.models import Question
from polls.serializers import QuestionSerializer, QuestionResponseSerializer
from polls.use_cases.actions import QuestionFindAllAction, QuestionCreateAction, QuestionUpdateAction, \
    QuestionDeleteAction

from rest_framework import viewsets, status


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return QuestionFindAllAction.invoke()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)

        # format などの validation は serializer で行いたいのでインスタンスの取得も妥協
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        action = QuestionUpdateAction(instance, serializer.validated_data)
        res_instance = action.execute()

        self.get_serializer(res_instance)

        # TODO: この考慮は UseCase でやるほうが適切か
        # if getattr(instance, '_prefetched_objects_cache', None):
        #     # If 'prefetch_related' has been applied to a queryset, we need to
        #     # forcibly invalidate the prefetch cache on the instance.
        #     instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def wrap_success_create_response(self, response_data):
        """create メソッドのレスポンスを構築する"""
        headers = self.get_success_headers(response_data)
        return Response(response_data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)

    # inputとoutputのserializerが異なる場合、
    # ドキュメントの response の Serializer を指定する
    @extend_schema(
        responses=QuestionResponseSerializer,
    )
    def create(self, request, *args, **kwargs):
        # POSTで /api/polls/questions/ を実行した場合に実行されるmethod

        # request時のシリアライザ
        request_serializer = self.get_serializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)

        # QuestionCreateActionに処理委譲
        action = QuestionCreateAction(request_serializer.validated_data)

        # model instance をやりとりすることは許容
        instance = action.execute()

        # response時のシリアライザ
        response_serializer = QuestionResponseSerializer(instance)
        return self.wrap_success_create_response(response_serializer.data)

    def destroy(self, request, *args, **kwargs):
        """Questionデータを削除します"""
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
