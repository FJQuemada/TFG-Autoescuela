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

#bulk de respuestas
@api_view(['POST'])
def respuestas_a_tope(request):
    try:
        # Obtener los datos enviados en la solicitud
        respuestas = request.data

        # Serializar los datos, convierte de objeto python a Json, se tiene que poner data= pq no esta directamente sacado de
        #   un objeto de modelo, como en el usuario primi de antes.
        # El many = true es para indicar que se van a serializar varios objetos y no uno solo, es decir, que respuestas es una lista de objetos a serializar
        serializer = RespuestasSerializer(data=respuestas, many=True)

        # Verificar si los datos son válidos
        if serializer.is_valid():
            # Guardar los objetos si son válidos
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Cambié a 201, ya que estamos creando nuevos recursos.
        
        # Si los datos no son válidos, devolver los errores de validación
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        # Manejo de excepciones generales (errores internos)
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#para obtener las preguntas del test
@api_view(['GET'])
def get_preguntas_test(request,test_id):
    try:
        preguntas_en_test = DrhtPreguntasTestPgte.objects.select_related('DrhtTestsTsts').filter(fk_tsts_pgte_test_id=test_id)
        #como esta en objeto python hay que pasarlo a json, y como no hay un serializer para esto, se hace manual
        #puedo acceder a los campos de la tabla drht_preguntas_preg aunque no los haya seleccionado en el select_related
        #   porque es una clave foranea y django ya sabe que tiene que traer esos datos
        preguntas_en_test_data = preguntas_en_test.values(
            'fk_tsts_pgte_test',
            'fk_preg_pgte_pregunta__preg_enunciado',
            'fk_preg_pgte_pregunta__preg_image',
            'fk_preg_pgte_pregunta__pk_preg_id'
        )
        
        return Response(preguntas_en_test_data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def obtener_respuestas(request,pregunta_id):
    try:  
        respuestas = DrhtRespuestasResp.objects.filter(fk_preg_resp_pregunta = pregunta_id)
        
        if not respuestas:
            return Response({'detail:No se ha encontrado la pregunta '}, status=status.HTTP_400_BAD_REQUEST)
        serializer = RespuestasSerializer(respuestas,many = True)
        return Response(serializer.data,status= status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

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

