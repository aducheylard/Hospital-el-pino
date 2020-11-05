from django.conf.urls import url,re_path
from django.urls import path, include
from rutas import views
urlpatterns = [  
    path('teste/', views.optimizar_rutas, name="teste" ),
]
