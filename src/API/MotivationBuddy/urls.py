from django.urls import include, path
from MotivationBuddy.Agent import views

urlpatterns = [
    path('agent/', views.Agent.as_view()),
]