from rest_framework.routers import DefaultRouter

from polls import views

router = DefaultRouter()
router.register("questions", views.QuestionViewSet)
urlpatterns = router.urls
