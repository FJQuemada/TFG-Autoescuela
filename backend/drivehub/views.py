from django.shortcuts import render
from django.http import JsonResponse
from .models import DrhtDificultadDiff, DrhtUsuariosUsus, DrhtLogrosLogr, DrhtLogrosUsuarioLgus, DrhtTestsTsts, DrhtTestsUsuarioTeus, DrhtPreguntasPreg, DrhtPreguntasTestPgte, DrhtRespuestasResp, DrhtPostForoPofr, DrhtRespuestasForoRefe

from rest_framework import permissions, viewsets, generics, status

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import DificultadSerializer, UsuariosSerializer, LogrosSerializer, LogrosUsuarioSerializer, TestSerializer, TestUsuarioSerializer, PreguntasSerializer, PreguntasTestSerializer, RespuestasSerializer, PostForoSerializer, RespuestasForoSerializer

from .services import login_usuario
# Create your views here.

# este es un ejemplo de como se puede hacer una vista que retorne un json con los datos de una tabla, sin usar un serializer
def get_dificultades(request):
    dificultades = DrhtDificultadDiff.objects.all().values('pk_diff_id', 'diff_nombre')
    return JsonResponse(list(dificultades), safe=False)

@api_view(['POST'])
def verificar_login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'detail': 'Email y contraseña son obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)
        
        resultado_login = login_usuario(DrhtUsuariosUsus,email,password)

        if resultado_login:
            return Response({'login': True}, status=status.HTTP_200_OK)
        elif resultado_login is False:
            return Response({'login': False, 'detail': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
        elif resultado_login is None:
            return Response({'login': False, 'detail': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'login': False, 'detail': 'Error desconocido'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Ejemplo para usar un serializer 
@api_view(['GET'])
def get_usuario_primi(request):
    try:
        # Obtener el usuario con pk_usuario_id = 1
        usuario_primi = DrhtUsuariosUsus.objects.get(pk_usus_id=1)
        
        # Serializar el objeto usando el serializador
        serializer = UsuariosSerializer(usuario_primi)
        return Response(serializer.data)  # La respuesta con los datos serializados
        
    except DrhtUsuariosUsus.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)


#Dificultad
class DificultadViewSet(viewsets.ModelViewSet):
    queryset = DrhtDificultadDiff.objects.all()
    serializer_class = DificultadSerializer

#Usuarios
class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = DrhtUsuariosUsus.objects.all()
    serializer_class = UsuariosSerializer
    

#Logros
class LogrosViewSet(viewsets.ModelViewSet):
    queryset = DrhtLogrosLogr.objects.all()
    serializer_class = LogrosSerializer

class LogrosUsuarioViewSet(viewsets.ModelViewSet):
    queryset = DrhtLogrosUsuarioLgus.objects.all()
    serializer_class = LogrosUsuarioSerializer

#Tests
class TestViewSet(viewsets.ModelViewSet):
    queryset = DrhtTestsTsts.objects.all()
    serializer_class = TestSerializer

class TestUsuarioViewSet(viewsets.ModelViewSet):
    queryset = DrhtTestsUsuarioTeus.objects.all()
    serializer_class = TestUsuarioSerializer

#Preguntas
class PreguntasViewSet(viewsets.ModelViewSet):
    queryset = DrhtPreguntasPreg.objects.all()
    serializer_class = PreguntasSerializer

class PreguntasTestViewSet(viewsets.ModelViewSet):
    queryset = DrhtPreguntasTestPgte.objects.all()
    serializer_class = PreguntasTestSerializer

#Respuestas
class RespuestasViewSet(viewsets.ModelViewSet):
    queryset = DrhtRespuestasResp.objects.all()
    serializer_class = RespuestasSerializer

#Foro
class PostForoViewSet(viewsets.ModelViewSet):
    queryset = DrhtPostForoPofr.objects.all()
    serializer_class = PostForoSerializer

class RespuestasForoViewSet(viewsets.ModelViewSet):
    queryset = DrhtRespuestasForoRefe.objects.all()
    serializer_class = RespuestasForoSerializer

#Esto un ejemplo de que no todos los modelos necesitan ser un ModelViewSet, en este caso solo necesitamos un ListCreateAPIView
class DificultadList(generics.ListCreateAPIView):
    queryset = DrhtDificultadDiff.objects.all()
    serializer_class = DificultadSerializer

