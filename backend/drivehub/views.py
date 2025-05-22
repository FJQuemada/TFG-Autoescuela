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
        
        # # el .data es para convertir el objeto a JSON, y el many=True es para que me devuelva una lista de objetos
        # serializer_respuesta = RespuestasSerializer(respuestas, many=True).data

        # aqui hago un values directamente en lugar del data para no tener que traerme todos los datos de la respuesta, como el resp_correcta, solo los que necesito
        respuestas_data = respuestas.values(
            'pk_resp_id',
            'fk_preg_resp_pregunta',
            'resp_contenido',
        )
        # respuesta_diccionario es un nuevo JSON que empieza por el numero de la fk_preg_resp_pregunta , y dentro
        # selecciona la respuesta de cada respuesta en RespuestaSerializer
        #Esto crea un diccionario donde cada clave es el fk_preg_resp_pregunta y cada valor es la respuesta completa.
        respuesta_diccionario = {}
        for respuesta in respuestas_data:
            pregunta_id = respuesta["fk_preg_resp_pregunta"]
            if pregunta_id not in respuesta_diccionario:    #Cuando se pregunta si existe el id de la pregunta en el diccionario quiero decir que si existe el numero pregunta_id
                #como clave del diccionario, si no existe, lo inicializa como una lista vacia
                respuesta_diccionario[pregunta_id] = []  # Si no existe, inicializa la lista
                print('aqui se crea uno nuevo')
            respuesta_diccionario[pregunta_id].append(respuesta)  # Añade la respuesta a la lista
            # print('respuesta_diccionario', respuesta_diccionario)  # Verificar las preguntas en el test
            
        #DIFERENTES MANERAS DE ACCEDER A LOS DATOS
        # print(respuesta_diccionario[3]) #accede a la lista de respuestas de la pregunta 3
        # print(respuesta_diccionario[3][0])  #accede al primer elemento de la lista de respuestas de la pregunta 3
        # print(respuesta_diccionario[3][0]['resp_contenido']) #accede al contenido de la respuesta 1 de la pregunta 3
        # print(respuesta_diccionario[3][0].get('resp_contenido')) #accede al contenido de la respuesta 1 de la pregunta 3 de otra manera
        
         # Lista para combinar las preguntas con las respuestas
        preguntas_con_respuestas = []
        
        # Recorrer las preguntas y buscar las respuestas correspondiente
        for pregunta in preguntas_en_test_data:
            pregunta_id = pregunta["fk_preg_pgte_pregunta__pk_preg_id"]
            #este if es para comprobar pero no es necesario, ya que el filtro de arriba ya lo hace
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
            
            # el equivalente de respuestas_correctas_dict.get(pregunta_id) en js es acceder al objeto con un respuestas_correctas_dict.pregunta_id
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

        #Creo un diccionario llamado json final donde se accede mucho mejor a los datos que no son respuestas correctas
        jsonfinal = {
            'test_id': testId,
            'user_id': user_id,
            'preguntas_acertadas': preguntas_acertadas,
            'preguntas_totales': len(respuestas_usuario),
            'resultado_final': resultado_final,
            'respuestas': respuestas_usuario,  # o preguntas, o lo que tengas en lista
        }
        
        done_correccion = DrhtTestsUsuarioTeus(
            fk_tsts_teus_test_id=testId,
            fk_usus_teus_usuario_id=user_id,
            teus_aciertos=preguntas_acertadas,
            teus_fallos=len(respuestas_usuario) - preguntas_acertadas
        )
        
        done_correccion.full_clean()
        done_correccion.save()
        

        # resultado_final.append({'user_id':user_id,'test_id':testId,'preguntas_acertadas': preguntas_acertadas, 'preguntas_totales': len(respuestas_usuario)})
        
        return Response(jsonfinal, status=status.HTTP_200_OK)

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
@token_requerido
def get_tests(request):
    
    tests = DrhtTestsTsts.objects.select_related('DrhtDificultadDiff').order_by('pk_tsts_id')
    
    #Primero se pone la foreign key de la primera tabla y luego la key que quieras de la segunda
    #.values lo que hace es devolver un diccionario con los campos que le digas, tantos como haya en la tabla que le pases
    #en este caso, como no hay un serializer para esto, se hace manualmente
    #QuerySet de diccionarios
    tests_completos = tests.values(
        'pk_tsts_id',
        'tsts_nombre',
        'tsts_fecha_creacion',
        'tsts_activo',
        'fk_diff_tsts_dificultad__diff_nombre'
    )
    
    for test in tests_completos:
        print(test)
    
    #Extraemos el id del test y lo guardamos en un diccionario
    
    # Ahora buscamos en la base de datos si el test ya ha sido hecho, y si ha sido hecho buscar el intento con menos fallos
    
    user_id = request.user_id  # Obtener el user_id del token decodificado
    
    #esto es un queryset
    puntuaciones_usuario = DrhtTestsUsuarioTeus.objects.filter(fk_usus_teus_usuario_id=user_id).order_by('fk_tsts_teus_test_id','teus_fallos')
    
    serializer_puntuaciones = TestUsuarioSerializer(puntuaciones_usuario, many=True)
    
    # diccionario para almacenar las mejores puntuaciones por test_id 
    mejores_puntuaciones ={}
    for puntuacion in serializer_puntuaciones.data:
        test_id = puntuacion.get('fk_tsts_teus_test')
        if test_id not in mejores_puntuaciones:
            mejores_puntuaciones[test_id]=puntuacion
        
    # for test_id, puntuacion in mejores_puntuaciones.items():
    #     print(f"Test ID: {test_id}")
    #     print(f"Aciertos: {puntuacion['teus_aciertos']}")
    #     print(f"Fallos: {puntuacion['teus_fallos']}")
    #     print(f"Tiempo: {puntuacion['teus_tiempo']}")
    #     print(f"Fecha: {puntuacion['teus_fecha']}")
    #     print("-------------")
    
    # Crear un diccionario para almacenar los tests con sus puntuaciones
    tests_con_puntuacion=[]
    
    for test in tests_completos:
        test_id = test['pk_tsts_id']
        puntuacion_test = mejores_puntuaciones.get(test_id)
        if puntuacion_test:
            tests_con_puntuacion.append({
                'id':test_id,
                'nombre':test['tsts_nombre'],
                'activo':test['tsts_activo'],
                'dificultad':test['fk_diff_tsts_dificultad__diff_nombre'],
                'puntuacion':{
                    'teus_aciertos':puntuacion_test['teus_aciertos'],
                    'teus_fallos':puntuacion_test['teus_fallos'],
                    'teus_tiempo':puntuacion_test['teus_tiempo'],
                    'teus_fecha':puntuacion_test['teus_fecha']
                }
            })
        else:
            tests_con_puntuacion.append({
                'id':test_id,
                'nombre':test['tsts_nombre'],
                'activo':test['tsts_activo'],
                'dificultad':test['fk_diff_tsts_dificultad__diff_nombre']
        })
            
    # for test in tests_con_puntuacion:
    #     print('test', tests_con_puntuacion[test])
    #es mejor usar el .items() para obtener el id y el valor del diccionario
    for test in tests_con_puntuacion:
        print('test', test)
        
            
    
    # #Instancia de serializer
    # serializer_puntuaciones = TestUsuarioSerializer(puntuaciones,many=True)
    
    # tests_por_id = {}
    # for test in tests_completos:
    #     test_id = test['pk_tsts_id']
    #     #obtener el primer test con menos fallos y del usuario
    #     puntuacion_test = puntuaciones.filter(fk_tsts_teus_test_id=test_id).order_by('teus_fallos').first()
    #     if puntuacion_test:
    #         # Si existe una puntuación para el test, la añadimos al diccionario
    #         tests_por_id[test_id] = {
    #             'nombre': test['tsts_nombre'],
    #             'activo': test['tsts_activo'],
    #             'dificultad': test['fk_diff_tsts_dificultad__diff_nombre'],
    #             'puntuacion': {
    #                 'teus_aciertos': puntuacion_test.teus_aciertos,
    #                 'teus_fallos': puntuacion_test.teus_fallos,
    #                 'teus_tiempo': puntuacion_test.teus_tiempo,
    #                 'teus_fecha': puntuacion_test.teus_fecha
    #             }
    #         }
    # for test in tests_por_id:
    #     print('test', tests_por_id[test]) 

    # Crear un diccionario con las puntuaciones ordenadas por el usuario_id
    # tests_por_id = {}
    # for test in tests_completos:
    #     test_id = test['pk_tsts_id']
    #     tests_por_id[test_id] = {
    #         'nombre': test['tsts_nombre'],
    #         'activo': test['tsts_activo'],
    #         'dificultad': test['fk_diff_tsts_dificultad__diff_nombre']
    #     }
    # print (tests_por_id)
    
    # # Crear un diccionario para almacenar las puntuaciones por test_id
    # puntuaciones_por_test = {}
    # for puntuacion in serializer_puntuaciones.data:
    #     test_id = puntuacion['fk_tsts_teus_test']
    #     if test_id not in puntuaciones_por_test:
    #         puntuaciones_por_test[test_id] = []
    #     puntuaciones_por_test[test_id].append(puntuacion)

    # for punt in puntuaciones_por_test:
    #     print('puntuaciones_por_test', puntuaciones_por_test[punt])
    
    
    
    
    
    return Response(tests_con_puntuacion,status= status.HTTP_200_OK)
    

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

