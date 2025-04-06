from django.shortcuts import render
from django.http import JsonResponse
from .models import DrhtDificultadDiff, DrhtUsuariosUsus, DrhtLogrosLogr, DrhtLogrosUsuarioLgus, DrhtTestsTsts, DrhtTestsUsuarioTeus, DrhtPreguntasPreg, DrhtPreguntasTestPgte, DrhtRespuestasResp, DrhtPostForoPofr, DrhtRespuestasForoRefe

from rest_framework import permissions, viewsets, generics, status

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import DificultadSerializer, UsuariosSerializer, LogrosSerializer, LogrosUsuarioSerializer, TestSerializer, TestUsuarioSerializer, PreguntasSerializer, PreguntasTestSerializer, RespuestasSerializer, PostForoSerializer, RespuestasForoSerializer

from .services import login_usuario, obtener_token

from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

# este es un ejemplo de como se puede hacer una vista que retorne un json con los datos de una tabla, sin usar un serializer
def get_dificultades(request):
    dificultades = DrhtDificultadDiff.objects.all().values('pk_diff_id', 'diff_nombre')
    return JsonResponse(list(dificultades), safe=False)

@api_view(['POST'])
def inicio_sesion(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'detail': 'Email y contraseña son obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Llamar a la función de login_usuario para verificar el login
        # Se le pasa el modelo de usuario, el email y la contraseña
        # Devuelve un booleano y el usuario en si
        resultado_login, usuario = login_usuario(DrhtUsuariosUsus,email,password)

        print(UsuariosSerializer(usuario).data)  # Imprimir los datos del usuario para depuración
        #resultado_login es un booleano, si es True, devuelve el nombre y el id del usuario, si es False, devuelve un mensaje de error
        if resultado_login:
            # Si el login es correcto, devuelve True y los datos del usuario
            return Response({
                'login': True,
                'id': usuario.pk_usus_id,
                'nombre': usuario.usus_nombre,
            }, status=status.HTTP_200_OK)
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
        preguntas_en_test = DrhtPreguntasTestPgte.objects.select_related('DrhtPreguntasPreg').filter(fk_tsts_pgte_test_id=test_id)  
        #el id del final es un añadido que hace django para que no haya confusiones con el nombre de la tabla, unicamente coge el id de la tabla
        
        #como esta en objeto python hay que pasarlo a json, y como no hay un serializer para esto, se hace manual
        #puedo acceder a los campos de la tabla drht_preguntas_preg aunque no los haya seleccionado en el select_related
        #   porque es una clave foranea y django ya sabe que tiene que traer esos datos
        preguntas_en_test_data = preguntas_en_test.values(
            'fk_preg_pgte_pregunta__pk_preg_id',
            'fk_tsts_pgte_test',
            'fk_preg_pgte_pregunta__preg_enunciado',
            'fk_preg_pgte_pregunta__preg_image'
        ) 
        
        #el __in es para filtrar por el id de la pregunta, y el values_list es para que me devuelva una lista de ids, no un objeto
        #esto es para obtener las respuestas de las preguntas que estan en el test, ya que no se pueden obtener directamente
        #el values_list es para que me devuelva una lista de ids, no un objeto
        #el flat=True es para que me devuelva una lista de ids, no un objeto
        
        respuestas = DrhtRespuestasResp.objects.filter(fk_preg_resp_pregunta__in=preguntas_en_test.values_list('fk_preg_pgte_pregunta', flat=True))
        
        serializer_respuesta = RespuestasSerializer(respuestas, many=True).data
        # respuesta_diccionario es un nuevo JSON que empieza por el numero de la fk_preg_resp_pregunta , y dentro
        # selecciona la respuesta de cada respuesta en RespuestaSerializer
        #Esto crea un diccionario donde cada clave es el fk_preg_resp_pregunta y cada valor es la respuesta completa.

        respuesta_diccionario = {}
        for respuesta in serializer_respuesta:
            pregunta_id = respuesta["fk_preg_resp_pregunta"]
            if pregunta_id not in respuesta_diccionario:    #Cuando se pregunta si existe el id de la pregunta en el diccionario quiero decir que si existe el numero pregunta_id
                #como clave del diccionario, si no existe, lo inicializa como una lista vacia
                respuesta_diccionario[pregunta_id] = []  # Si no existe, inicializa la lista
            respuesta_diccionario[pregunta_id].append(respuesta)  # Añade la respuesta a la lista
            
        # Lista para combinar las preguntas con las respuestas
        preguntas_con_respuestas = []
        
        # Recorrer las preguntas y buscar las respuestas correspondiente
        for pregunta in preguntas_en_test_data:
            pregunta_id = pregunta["fk_preg_pgte_pregunta__pk_preg_id"]
            if pregunta_id in respuesta_diccionario:    #cuando pregunto si existe el id de la pregunta en el diccionario quiero decir que si existe el numero pregunta_id
                # Si existe, añade la pregunta y sus respuestas a la lista
                pregunta_con_respuesta = {
                    'pregunta': pregunta,
                    'respuestas': respuesta_diccionario[pregunta_id]  # Todas las respuestas para esa pregunta
                }
                preguntas_con_respuestas.append(pregunta_con_respuesta)
                
        return Response(preguntas_con_respuestas, status=status.HTTP_200_OK)
        
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
    
@api_view(['GET'])
def get_tests(request):
    
    tests = DrhtTestsTsts.objects.select_related('DrhtDificultadDiff')
    
    #Primero se pone la foreign key de la primera tabla y luego la key que quieras de la segunda
    tests_completos = tests.values(
        'pk_tsts_id',
        'tsts_nombre',
        'tsts_fecha_creacion',
        'tsts_activo',
        'fk_diff_tsts_dificultad__diff_nombre'
    )
    
    return Response(tests_completos,status= status.HTTP_200_OK)
    

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

