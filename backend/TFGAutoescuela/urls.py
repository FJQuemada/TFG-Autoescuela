"""
URL configuration for TFGAutoescuela project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from rest_framework import routers

from drivehub import views

router = routers.DefaultRouter()
router.register(r'dificultad', views.DificultadViewSet)
router.register(r'usuarios', views.UsuariosViewSet)
router.register(r'logros', views.LogrosViewSet)
router.register(r'logros_usuario', views.LogrosUsuarioViewSet)
router.register(r'test', views.TestViewSet)
router.register(r'test_usuario', views.TestUsuarioViewSet)
router.register(r'preguntas', views.PreguntasViewSet)
router.register(r'preguntas_test', views.PreguntasTestViewSet)
router.register(r'respuestas', views.RespuestasViewSet)
router.register(r'post_foro', views.PostForoViewSet)
router.register(r'respuestas_foro', views.RespuestasForoViewSet)


schema_view = get_schema_view(
    openapi.Info(
        title="API de Dificultad",
        default_version='v1',
        description="Descripción de la API para gestionar dificultades",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@tudominio.com"),
        license=openapi.License(name="MIT"),
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),  # Esta línea debe estar presente para acceder al panel de administración de Django
    path('api/', include(router.urls)),  # Rutas para las vistas de API
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),  # Swagger UI
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0)),      # Redoc UI (opcional)
    path('api/renovar_access_token/', views.renovar_access_token),  # Ruta para renovar el token
    path('api/dificultades/', views.DificultadList.as_view()),           # Ruta para la vista de dificultades
    path('api/usuarioprimi/', views.get_usuario_primi),
    path('api/inicio_sesion', views.inicio_sesion),
    path('api/tests_a_tope', views.tests_a_tope),
    path('api/preguntas_a_tope', views.preguntas_a_tope),
    path('api/respuestas_a_tope',views.respuestas_a_tope),
    path('api/preguntas_en_test/<int:test_id>', views.get_preguntas_test),
    path('api/tests_page', views.get_tests),
    path('api/cerrar_sesion', views.cerrar_sesion)
]


