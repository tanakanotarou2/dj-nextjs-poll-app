# view.py で利用する汎用クラスを配置しています。

from rest_framework import status
from rest_framework.mixins import DestroyModelMixin, ListModelMixin, RetrieveModelMixin, \
    CreateModelMixin as OrgCreateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet


class PatchModelMixin:
    """
    Patch(partial update) Model Mixin

    update メソッドを廃止し、REST API の PUT アクションを除外したモデル更新用の mixin。
    更新は PATCH アクション (partial update) のみ利用するため、この mixin を用意しています。
    """

    def _update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self._update(request, *args, **kwargs)


class CreateModelMixin(OrgCreateModelMixin):
    def wrap_success_create_response(self, response_data):
        """create メソッドのレスポンスを構築します"""
        headers = self.get_success_headers(response_data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


class ModelViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    PatchModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    GenericViewSet):
    pass
