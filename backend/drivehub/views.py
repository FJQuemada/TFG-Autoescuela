import jwt
from datetime import datetime, timedelta, timezone

from django.shortcuts import render
from django.http import JsonResponse
from .models import DrhtDificultadDiff, DrhtUsuariosUsus, DrhtLogrosLogr, DrhtLogrosUsuarioLgus, DrhtTestsTsts, DrhtTestsUsuarioTeus, DrhtPreguntasPreg, DrhtPreguntasTestPgte, DrhtRespuestasResp, DrhtPostForoPofr, DrhtRespuestasForoRefe

from rest_framework import permissions, viewsets, generics, status

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import DificultadSerializer, UsuariosSerializer, LogrosSerializer, LogrosUsuarioSerializer, TestSerializer, TestUsuarioSerializer, PreguntasSerializer, PreguntasTestSerializer, RespuestasSerializer, PostForoSerializer, RespuestasForoSerializer
from .services import login_usuario


from .auth_utils import obtener_access_token, obtener_refresh_token, decodificar_token, token_requerido
# Create your views here.

#FUNCIONA
@api_view(['POST'])
def renovar_access_token(request):
    try:
        # Obtener el refresh token de la cookie
        refresh_token_cookie = request.COOKIES.get('refresh_token')
        print('refresh_token', refresh_token_cookie)  # Verificar el valor del refresh_token

        if not refresh_token_cookie:
            return Response({'detail': 'No se encontró el token de actualización.'}, status=status.HTTP_401_BAD_REQUEST)

        # Decodificar el token para obtener el payload
        payload = decodificar_token(refresh_token_cookie)
        print('payload', payload)  # Verificar el payload

        if not payload:
            return Response({'detail': 'Token inválido o expirado.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verificar la expiración del refresh token (si lo incluiste en el payload)
        if 'exp' in payload and datetime.fromtimestamp(payload['exp'], tz=timezone.utc) < datetime.now(timezone.utc):
            return Response({'detail': 'El token de actualización ha expirado. Inicie sesión nuevamente.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generar un nuevo access token
        try:
            usuario = DrhtUsuariosUsus.objects.get(pk_usus_id=payload['user_id'])
            print('usuario encontrado', usuario)  # Verificar que se encuentra al usuario
        except DrhtUsuariosUsus.DoesNotExist:
            return Response({'detail': 'Usuario no encontrado asociado al refresh token.'}, status=status.HTTP_404_NOT_FOUND)

        access_token = obtener_access_token(usuario)

        response = Response({
            'access_token': access_token,
        }, status=status.HTTP_200_OK)

        print('response', response)  # Verificar la respuesta
        return response

    except Exception as e:
        print('Error interno:', str(e))  # Imprimir el error
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
            
            access_token = obtener_access_token(usuario)
            refresh_token = obtener_refresh_token(usuario)
            
            print('access token',access_token)  # Imprimir el token para depuración
            print('refresh token',refresh_token)  # Imprimir el token para depuración

            response = Response({
                'login': True,
                'id': usuario.pk_usus_id,
                'nombre': usuario.usus_nombre,
                'access_token': access_token,
            }, status=status.HTTP_200_OK)
            # Configurar la cookie de acceso
            response.set_cookie(
                key='refresh_token',  # Nombre de la cookie
                value=refresh_token,  # El refresh token
                max_age=7*24*60*60,  # 7 días en segundos
                httponly=True,  # Para que no sea accesible desde JavaScript
                secure=True,  # Solo sobre HTTPS
                samesite='Strict'  # Prevención de CSRF
            )

            # Si el login es correcto, devuelve True y los datos del usuario
            return response
        
        elif resultado_login is False:
            return Response({'login': False, 'detail': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
        elif resultado_login is None:
            return Response({'login': False, 'detail': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'login': False, 'detail': 'Error desconocido'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# get_usuaior_primi pero con el decorador token_requerido
@api_view(['GET'])
@token_requerido
def get_usuario_primi(request):
    try:
        usuario_primi = DrhtUsuariosUsus.objects.get(pk_usus_id=1)
        serializer = UsuariosSerializer(usuario_primi)
        return Response(serializer.data)  # Devolver los datos del usuario
    except DrhtUsuariosUsus.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)


# #Ejemplo para usar un serializer 
# @api_view(['GET'])
# def get_usuario_primi(request):
#     try:
#         # Paso 1: Obtener el token del encabezado Authorization
#         auth_header = request.headers.get('Authorization')

#         if not auth_header or not auth_header.startswith('Bearer '):
#             return Response({'detail': 'Token no proporcionado'}, status=status.HTTP_401_UNAUTHORIZED)

#         # Obtener el token
#         token = auth_header.split(' ')[1]

#         # Paso 2: Decodificar el token para obtener el payload
#         try:
#             payload = decodificar_token(token)
#             if not payload:
#                 return Response({'detail': 'Token inválido.'}, status=status.HTTP_401_UNAUTHORIZED)
#             # Si la decodificación es exitosa, el token es válido, continuar con la vista
#             #ESTO ES LO QUE HAY QUE ENVOLVER EN EL DECORADOR

#             usuario_primi = DrhtUsuariosUsus.objects.get(pk_usus_id=1)
#             serializer = UsuariosSerializer(usuario_primi)
#             return Response(serializer.data)  # Devolver los datos del usuario
#             #HASTA AQUI ES LO QUE HAY QUE ENVOLVER EN EL DECORADOR

#         except jwt.ExpiredSignatureError:
#             # El access token ha expirado, devolver 401 para que el frontend inicie la renovación
#             return Response({'detail': 'Token ha expirado.'}, status=status.HTTP_401_UNAUTHORIZED)

#     except DrhtUsuariosUsus.DoesNotExist:
#         return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

#     except Exception as e:
#         return Response({'detail': f'Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#bulk de tests
@api_view(['POST'])
def tests_a_tope(request):
    try:
        # Obtener los datos enviados en la solicitud
        tests = request.data

        # Serializar los datos, convierte de objeto python a Json, se tiene que poner data= pq no esta directamente sacado de
        #   un objeto de modelo, como en el usuario primi de antes.
        # El many = true es para indicar que se van a serializar varios objetos y no uno solo, es decir, que tests es una lista de objetos a serializar
        serializer = TestSerializer(data=tests, many=True)

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

#bulk de preguntas
@api_view(['POST'])
def preguntas_a_tope(request):
    try:
        # Obtener los datos enviados en la solicitud
        preguntas = request.data

        # Serializar los datos, convierte de objeto python a Json, se tiene que poner data= pq no esta directamente sacado de
        #   un objeto de modelo, como en el usuario primi de antes.
        # El many = true es para indicar que se van a serializar varios objetos y no uno solo, es decir, que preguntas es una lista de objetos a serializar
        serializer = PreguntasSerializer(data=preguntas, many=True)

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
    
#bulk de preguntas en test
@api_view(['POST'])
def preguntas_en_test_a_tope(request):
    try:
        # Obtener los datos enviados en la solicitud
        preguntas_en_test = request.data

        # Serializar los datos, convierte de objeto python a Json, se tiene que poner data= pq no esta directamente sacado de
        #   un objeto de modelo, como en el usuario primi de antes.
        # El many = true es para indicar que se van a serializar varios objetos y no uno solo, es decir, que preguntas_en_test es una lista de objetos a serializar
        serializer = PreguntasTestSerializer(data=preguntas_en_test, many=True)

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
@token_requerido
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
        
        # el .data es para convertir el objeto a JSON, y el many=True es para que me devuelva una lista de objetos
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


#la idea de corregir es obtener las respuestas del usuario, las respuestas del test y mandarlo al front, seguido de la calificacion, y ya en el front se pinta las que tengas bien y las que tengas mal. si la respuesta 
@api_view(['POST'])
@token_requerido
def correccion_test(request, testId):
    try:
        test_completado = request.data  # [{'pregunta_id': X, 'respuesta_id': Y}, ...]
        user_id = request.user_id  # Obtener el user_id del token decodificado
        
        # Extraer solo IDs de respuestas del usuario
        ids_respuestas_usuario = [item['respuesta_id'] for item in test_completado]

        # las respuestas del usuario, son las que ha seleccionado en el test
        respuestas_usuario = DrhtRespuestasResp.objects.filter(
            pk_resp_id__in=ids_respuestas_usuario
        ).select_related('fk_preg_resp_pregunta').values(
            'pk_resp_id',
            'resp_contenido',
            'resp_correcta',
            'fk_preg_resp_pregunta__pk_preg_id',
            'fk_preg_resp_pregunta__preg_enunciado'
        )

        # las respuestas correctas del test, par poder compararlas con las del usuario
        # Se filtran las respuestas correctas de las preguntas que pertenecen al test
        respuestas_correctas = DrhtRespuestasResp.objects.filter(
            fk_preg_resp_pregunta__drhtpreguntastestpgte__fk_tsts_pgte_test_id=testId,
            resp_correcta=True
        ).select_related('fk_preg_resp_pregunta').values(
            'fk_preg_resp_pregunta__pk_preg_id',
            'pk_resp_id',
            'resp_contenido'
        )

        # Crear un diccionario con las respuestas correctas por pregunta_id
        respuestas_correctas_dict = {}
        for item in respuestas_correctas:
            pregunta_id = item['fk_preg_resp_pregunta__pk_preg_id']
            respuestas_correctas_dict[pregunta_id] = {
                'respuesta_id': item['pk_resp_id'],
                'respuesta_texto': item['resp_contenido']
            }

        resultado_final = []

        preguntas_acertadas = 0
        # Comparamos las respuestas del usuario con las correctas
        for r in respuestas_usuario:
            pregunta_id = r['fk_preg_resp_pregunta__pk_preg_id']
            
            # el equivalente de respuestas_correctas_dict.get(pregunta_id) en js es acceder al objeto con un respuestas_correctas_dict['pregunta_id']
            respuesta_correcta = respuestas_correctas_dict.get(pregunta_id)

            print('respuesta_correcta', respuesta_correcta,r)  # Verificar la respuesta correcta
            
            resultado_final.append({
                'pregunta_id': pregunta_id,
                'pregunta_enunciado': r['fk_preg_resp_pregunta__preg_enunciado'],
                'respuesta_usuario_id': r['pk_resp_id'],
                'respuesta_usuario_texto': r['resp_contenido'],
                'correcta': r['resp_correcta'],
                'respuesta_correcta_id': respuesta_correcta['respuesta_id'] if respuesta_correcta else None,
                'respuesta_correcta_texto': respuesta_correcta['respuesta_texto'] if respuesta_correcta else None,
                'pregunta_respondida_correctamente': True if r['resp_correcta'] else False
            })
            
            if r['resp_correcta'] == True :
                preguntas_acertadas += 1

        resultado_final.append({'user_id':user_id,'test_id':testId,'preguntas_acertadas': preguntas_acertadas, 'preguntas_totales': len(respuestas_usuario)})
        
        return Response(resultado_final, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def cerrar_sesion(request):
    try:
        response = Response({"detail":"Sesion cerrada"}, status=status.HTTP_200_OK)
        response.delete_cookie("refresh_token")
        return response
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
    
    tests = DrhtTestsTsts.objects.select_related('DrhtDificultadDiff').order_by('pk_tsts_id')
    
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

