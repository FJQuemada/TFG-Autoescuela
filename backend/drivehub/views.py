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

        # Verificar si los datos son válidos, uso el is valid porque el data viene de fuera, y no de un objeto de modelo
        if serializer.is_valid():
            # Guardar los objetos si son válidos
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Cambié a 201, ya que estamos creando nuevos recursos.
        
        # Si los datos no son válidos, devolver los errores de validación
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        # Manejo de excepciones generales (errores internos)
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@token_requerido
def pregunta_aleatoria(request):
    try:
        # Obtener una pregunta aleatoria de la base de datos
        pregunta_aleatoria = DrhtPreguntasPreg.objects.order_by('?').first()
        
        if not pregunta_aleatoria:
            return Response({'detail': 'No se encontraron preguntas.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Serializar la pregunta
        serializer = PreguntasSerializer(pregunta_aleatoria)
        
        # Obtener las respuestas asociadas a la pregunta
        respuestas = DrhtRespuestasResp.objects.filter(fk_preg_resp_pregunta=pregunta_aleatoria.pk_preg_id).order_by('pk_resp_id')
        respuestas_serializer = RespuestasSerializer(respuestas, many=True)
        
        # Combinar la pregunta y sus respuestas en un solo objeto
        resultado = {
            'pregunta': serializer.data,
            'respuestas': respuestas_serializer.data
        }
        
        return Response(resultado, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Correccion de una sola pregunta
@api_view(['POST'])
@token_requerido
def corregir_pregunta(request):
    try:
        respuesta_dada = request.data #{"pregunta_id": 1,"respuesta_id": 2}
        pregunta_id = respuesta_dada.get('pregunta_id')
        respuesta_id = respuesta_dada.get('respuesta_id')
        
        if not pregunta_id or not respuesta_id:
            return Response({'detail': 'Faltan datos en la petición'}, status=status.HTTP_400_BAD_REQUEST)
        #aqui uso el filter y el first para que me devuelva un objeto o None, si solo pusiese filter me daria una queryset y tendria que poner en el serializer many = True
        respuesta_correcta = DrhtRespuestasResp.objects.filter(fk_preg_resp_pregunta=pregunta_id,resp_correcta=True).first()
        if not respuesta_correcta:
            return Response({'detail': 'No se encontró la respuesta correcta'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = RespuestasSerializer(respuesta_correcta)
        
        resultado_pregunta = serializer.data
        
        resultado_pregunta['respuesta_usuario'] = respuesta_id
        if respuesta_id == resultado_pregunta['pk_resp_id']:
            resultado_pregunta['es_correcta'] = True
        else:
            resultado_pregunta['es_correcta'] = False
        print(resultado_pregunta)
        return Response(resultado_pregunta, status=status.HTTP_200_OK)
    except Exception as e:
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
            'fk_preg_pgte_pregunta__preg_image',
            'fk_preg_pgte_pregunta__fk_diff_preg_dificultad'
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
        ).order_by('pk_resp_id')
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
        # print(respuesta_diccionario[3][0]['resp_contenido']) #accede al con tenido de la respuesta 1 de la pregunta 3
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
        
        test_aprobado = len(respuestas_usuario) - preguntas_acertadas <= 3
        
        print('test', test_aprobado)  # Verificar si el test ha sido aprobado
        
        done_correccion = DrhtTestsUsuarioTeus(
            fk_tsts_teus_test_id=testId,
            fk_usus_teus_usuario_id=user_id,
            teus_aciertos=preguntas_acertadas,
            teus_fallos=len(respuestas_usuario) - preguntas_acertadas,
            teus_aprobado=test_aprobado
        )
        
        done_correccion.full_clean()
        done_correccion.save()
        
        if test_aprobado:
            tests_usuario= DrhtTestsUsuarioTeus.objects.filter(
                fk_usus_teus_usuario_id=user_id,
                teus_aprobado=True
            ).distinct('fk_tsts_teus_test_id').count()
            
            if tests_usuario >= 3:
            # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 5, le asignamos la medalla de racha de bronce
                medalla = DrhtLogrosLogr.objects.get(logr_nombre='Constancia que vale')
                
                medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
                
                if not medalla_asignada:
                    # Si no tiene la medalla de racha de bronce, se la asignamos
                    #aqui podemos usar fk_logr_lgus_logro en lugar de fk_logr_lgus_logro_id, ya que es un campo de tipo ForeignKey y django lo sabe
                    medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                    medalla_usuario.save()
                    print('Medalla de racha Constancia que vale asignada al usuario.')
            
            elif tests_usuario >= 1:
            # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 5, le asignamos la medalla de racha de bronce
                medalla = DrhtLogrosLogr.objects.get(logr_nombre='¡Lo lograste!')
                
                medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
                
                if not medalla_asignada:
                    # Si no tiene la medalla de racha de bronce, se la asignamos
                    #aqui podemos usar fk_logr_lgus_logro en lugar de fk_logr_lgus_logro_id, ya que es un campo de tipo ForeignKey y django lo sabe
                    medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                    medalla_usuario.save()
                    print('Medalla ¡Lo lograste! que vale asignada al usuario.')
            
            if (len(respuestas_usuario) - preguntas_acertadas) == 0:
                print('test perfecto')
                # Si el usuario ha acertado todas las preguntas del test, le asignamos la medalla de test perfecto
                medalla = DrhtLogrosLogr.objects.get(logr_nombre='Perfecto')
                
                medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
                
                if not medalla_asignada:
                    # Si no tiene la medalla de test perfecto, se la asignamos
                    medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                    medalla_usuario.save()
                    print('Medalla de test perfecto asignada al usuario.')
        
        tests_hechos_usuario= DrhtTestsUsuarioTeus.objects.filter(
                fk_usus_teus_usuario_id=user_id,
            ).distinct('fk_tsts_teus_test_id').count()
        
        if tests_hechos_usuario >= 7:
            medalla = DrhtLogrosLogr.objects.get(logr_nombre='Experto en práctica')
            medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()  
            
            if not medalla_asignada:
                # Si no tiene la medalla de racha de bronce, se la asignamos
                #aqui podemos usar fk_logr_lgus_logro en lugar de fk_logr_lgus_logro_id, ya que es un campo de tipo ForeignKey y django lo sabe
                medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                medalla_usuario.save()
                print('Experto en práctica asignada al usuario.')    
        
        elif tests_hechos_usuario >= 3:
            # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 3, le asignamos la medalla de racha de bronce
            medalla = DrhtLogrosLogr.objects.get(logr_nombre='Vas en serio')
            
            medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
            
            if not medalla_asignada:
                # Si no tiene la medalla de racha de bronce, se la asignamos
                #aqui podemos usar fk_logr_lgus_logro en lugar de fk_logr_lgus_logro_id, ya que es un campo de tipo ForeignKey y django lo sabe
                medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                medalla_usuario.save()
                print('Vas en serio')
        
        elif tests_hechos_usuario >= 1:
            # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 5, le asignamos la medalla de racha de bronce
            medalla = DrhtLogrosLogr.objects.get(logr_nombre='Se empieza por algo')
            
            medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
            
            if not medalla_asignada:
                # Si no tiene la medalla de racha de bronce, se la asignamos
                #aqui podemos usar fk_logr_lgus_logro en lugar de fk_logr_lgus_logro_id, ya que es un campo de tipo ForeignKey y django lo sabe
                medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                medalla_usuario.save()
                print('Se empieza por algo')
          
            
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
    
@api_view(['GET'])
@token_requerido
def get_racha_maxima_historica(request):
    try:
        # Obtener el user_id del token decodificado
        user_id = request.user_id
        
        # Obtener el usuario, esto es un objeto de tipo DrhtUsuariosUsus, es por eso que puede acceder a sus campos con el punto
        usuario = DrhtUsuariosUsus.objects.get(pk_usus_id=user_id)
        
        print('usuario', usuario)  # Verificar que se obtiene el usuario correctamente
        # Obtener la racha máxima histórica del usuario
        racha_maxima = usuario.usus_racha

        return Response({'racha_maxima': racha_maxima}, status=status.HTTP_200_OK)
    
    except DrhtUsuariosUsus.DoesNotExist:
        return Response({'detail': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@token_requerido
def actualizar_racha_maxima(request):
    try:
        user_id = request.user_id  # Obtener el user_id del token decodificado
        nueva_racha = request.data.get('racha_maxima')

        if nueva_racha is None:
            return Response({'detail': 'Racha máxima no proporcionada.'}, status=status.HTTP_400_BAD_REQUEST)

        usuario = DrhtUsuariosUsus.objects.get(pk_usus_id=user_id)
        usuario.usus_racha = nueva_racha
        usuario.save()  #Django detecta si ya existe el usuario y actualiza el campo usus_racha, si no existe lo crea, pero en este caso no deberia pasar porque el token es valido y
        # el usuario existe
        # save no hace reemplazo total de los datos, solo actualiza los campos que se han modificado, en este caso usus_racha
        
        if nueva_racha >= 5:
        # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 5, le asignamos la medalla de racha de bronce
            medalla = DrhtLogrosLogr.objects.get(logr_nombre='Sanguinario')
            
            medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
            
            if not medalla_asignada:
                # Si no tiene la medalla de racha de bronce, se la asignamos
                #aqui podemos usar fk_logr_lgus_logro en lugar de fk_logr_lgus_logro_id, ya que es un campo de tipo ForeignKey y django lo sabe
                medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                medalla_usuario.save()
                print('Medalla de racha Sanguinario asignada al usuario.')
        if nueva_racha >= 10:
            # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 10, le asignamos la medalla de racha de plata
            medalla = DrhtLogrosLogr.objects.get(logr_nombre='Despiadado')
            
            medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
            
            if not medalla_asignada:
                # Si no tiene la medalla de racha de plata, se la asignamos
                medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                medalla_usuario.save()
                print('Medalla de racha Despiadado asignada al usuario.')
        if nueva_racha >= 15:
            # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 15, le asignamos la medalla de racha de oro
            medalla = DrhtLogrosLogr.objects.get(logr_nombre='Inexorable')
            
            medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
            
            if not medalla_asignada:
                # Si no tiene la medalla de racha de oro, se la asignamos
                medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                medalla_usuario.save()
                print('Medalla de racha Inexorable asignada al usuario.')
        if nueva_racha >= 20:
            # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 20, le asignamos la medalla de racha de platino
            medalla = DrhtLogrosLogr.objects.get(logr_nombre='Implacable')
            
            medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
            
            if not medalla_asignada:
                # Si no tiene la medalla de racha de platino, se la asignamos
                medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                medalla_usuario.save()
                print('Medalla de racha Implacable asignada al usuario.')
        if nueva_racha >= 25:
            # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 25, le asignamos la medalla de racha de diamante
            medalla = DrhtLogrosLogr.objects.get(logr_nombre='Brutal')
            
            medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
            
            if not medalla_asignada:
                # Si no tiene la medalla de racha de diamante, se la asignamos
                medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                medalla_usuario.save()
                print('Medalla de racha Brutal asignada al usuario.')
        if nueva_racha >= 30:
            # Si no tiene medallas de racha, pero la racha máxima es mayor o igual a 30, le asignamos la medalla de racha de rubí
            medalla = DrhtLogrosLogr.objects.get(logr_nombre='Nuclear')
            
            medalla_asignada = DrhtLogrosUsuarioLgus.objects.filter(fk_logr_lgus_logro=medalla,fk_usus_lgus_usuario_id=user_id).exists()
            
            if not medalla_asignada:
                # Si no tiene la medalla de racha de rubí, se la asignamos
                medalla_usuario = DrhtLogrosUsuarioLgus(fk_usus_lgus_usuario_id=user_id, fk_logr_lgus_logro=medalla)
                medalla_usuario.save()
                print('Medalla de racha Nuclear asignada al usuario.')
                
        
        return Response({'detail': 'Racha máxima actualizada correctamente.'}, status=status.HTTP_200_OK)

    except DrhtUsuariosUsus.DoesNotExist:
        return Response({'detail': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
#Logros
class LogrosViewSet(viewsets.ModelViewSet):
    queryset = DrhtLogrosLogr.objects.all()
    serializer_class = LogrosSerializer

class LogrosUsuarioViewSet(viewsets.ModelViewSet):
    queryset = DrhtLogrosUsuarioLgus.objects.all()
    serializer_class = LogrosUsuarioSerializer
    
@api_view(['GET'])
@token_requerido
def get_logros_usuario(request):
    # quiero llevar al front todos los logros, y poner un booleano que diga si el usuario tiene ese logro o no
    try:
        user_id = request.user_id  # Obtener el user_id del token decodificado
        
        # Obtener todos los logros del usuario
        logros_usuario = DrhtLogrosUsuarioLgus.objects.filter(fk_usus_lgus_usuario_id=user_id).values(
            'fk_logr_lgus_logro_id',
            'fk_logr_lgus_logro__logr_nombre',
            'fk_logr_lgus_logro__logr_descripcion',
            'fk_logr_lgus_logro__logr_image',
            'lgus_fecha_obtencion',
        )
        
        # Obtener todos los logros disponibles
        logros_disponibles = DrhtLogrosLogr.objects.all().values(
            'pk_logr_id',
            'logr_nombre',
            'logr_descripcion',
            'logr_image'
        )
        
        # Crear un diccionario para almacenar los logros del usuario
        logros_dict = {logro['fk_logr_lgus_logro_id']: logro for logro in logros_usuario}
        
        #esto como ya hemos visto devolvería algo del estilo
        # {
        #     1: {'fk_logr_lgus_logro_id': 1, 'nombre': 'Medalla A', 'fecha': '2023-05-01', ...},
        #     2: {'fk_logr_lgus_logro_id': 2, 'nombre': 'Medalla B', 'fecha': '2023-05-02', ...},
        #     ...
        # }
        
        # Combinar los logros disponibles con los del usuario
        resultados = []
        for logro in logros_disponibles:
            tiene_logro = logro['pk_logr_id'] in logros_dict    #en un diccionario, el "in" comprueba si la clave existe, no el valor
            resultado = {
                'id': logro['pk_logr_id'],
                'nombre': logro['logr_nombre'],
                'descripcion': logro['logr_descripcion'],
                'image': logro['logr_image'],
                'tiene_logro': tiene_logro,
                'fecha_obtencion': logros_dict.get(logro['pk_logr_id'], {}).get('lgus_fecha_obtencion', None)
            }
            resultados.append(resultado)
        return Response(resultados, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@token_requerido
def get_ultimo_logro_usuario(request):
    try:
        user_id = request.user_id  # Obtener el user_id del token decodificado
        
        # Obtener el último logro del usuario
        ultimo_logro = DrhtLogrosUsuarioLgus.objects.filter(fk_usus_lgus_usuario_id=user_id).order_by('-lgus_fecha_obtencion').values(
            'fk_logr_lgus_logro_id',
            'fk_logr_lgus_logro__logr_nombre',
            'fk_logr_lgus_logro__logr_descripcion',
            'fk_logr_lgus_logro__logr_image',
            'lgus_fecha_obtencion',
        ).first()  # Usamos first() para obtener solo el último logro
        
        print('ultimo_logro', ultimo_logro)  # Verificar el último logro obtenido
        
        if not ultimo_logro:
            return Response({'detail': 'No se encontraron logros para este usuario.'}, status=status.HTTP_200_OK)
        
        return Response(ultimo_logro, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@token_requerido
def get_ranking_users(request):
    try:
        all_users_data = DrhtUsuariosUsus.objects.values(
            'pk_usus_id',
            'usus_nombre',
            'usus_racha'
        ).order_by('-usus_racha')[:15]
        
        print('all_users_data', all_users_data)  # Verificar los datos de los usuarios
        return Response(all_users_data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    

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
    
    return Response(tests_con_puntuacion,status= status.HTTP_200_OK)
    

class TestUsuarioViewSet(viewsets.ModelViewSet):
    queryset = DrhtTestsUsuarioTeus.objects.all()
    serializer_class = TestUsuarioSerializer

@api_view(['GET'])
@token_requerido
def get_stats(request):
    try:
        # Obtener el user_id del token decodificado
        user_id = request.user_id
        
        # Obtener los tests aprobados y suspensos
        tests_aprobados = DrhtTestsUsuarioTeus.objects.filter(fk_usus_teus_usuario_id = user_id, teus_aprobado = True).distinct('fk_tsts_teus_test_id')
        id_tests_aprobados = tests_aprobados.values_list('fk_tsts_teus_test',flat=True)
        print(id_tests_aprobados)
        
        
        serializer_tests_aprobados = TestUsuarioSerializer(tests_aprobados,many = True)
        print(len(serializer_tests_aprobados.data))
        
        
        tests_suspensos = DrhtTestsUsuarioTeus.objects.exclude(fk_tsts_teus_test__in=id_tests_aprobados).filter(fk_usus_teus_usuario_id = user_id, teus_aprobado = False).distinct('fk_tsts_teus_test').count()
        
        # Obtener el numero total de tests que hay
        tests_sin_hacer = DrhtTestsTsts.objects.count() - (len(serializer_tests_aprobados.data) + tests_suspensos)
        
        # Creamos un diccionario para devolver el json en el response
        
        respuesta = [{
            'nombre':'Tests aprobados',
            'valor':len(serializer_tests_aprobados.data),
            'color':'#82ca9d'},
                     {
            'nombre':'Tests suspensos',
            'valor':tests_suspensos,
            'color': '#ff5733'},
                     {
            'nombre':'Tests sin completar',
            'valor':tests_sin_hacer,
            'color': "#bbbacc"}
        ]
        return Response(respuesta, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@token_requerido
def get_test_suspenso(request):
    try:
        # Obtener el user_id del token decodificado
        user_id = request.user_id

        # Obtener los tests aprobados
        tests_aprobados = DrhtTestsUsuarioTeus.objects.filter(
            fk_usus_teus_usuario_id=user_id,
            teus_aprobado=True
        ).distinct('fk_tsts_teus_test_id')

        id_tests_aprobados = tests_aprobados.values_list('fk_tsts_teus_test', flat=True)
        
        print('id_tests_aprobados', id_tests_aprobados)  # Verificar los tests aprobados
        
        tests_suspensos = DrhtTestsUsuarioTeus.objects.exclude(
            fk_tsts_teus_test__in=id_tests_aprobados
        ).filter(
            fk_usus_teus_usuario_id=user_id,
            teus_aprobado=False
        ).distinct('fk_tsts_teus_test').order_by('fk_tsts_teus_test_id','teus_fallos').first() # Obtiene el primer test suspenso, si hay más, no los devuelve
        
        if not tests_suspensos:
            return Response(None, status=status.HTTP_200_OK)

        serializer_tests_suspensos = TestUsuarioSerializer(tests_suspensos)
    
        print('tests_suspensos', serializer_tests_suspensos.data)  # Verificar los tests suspensos
        return Response(serializer_tests_suspensos.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
    
@api_view(['GET', 'POST'])
@token_requerido
def posts_foro(request):
    try:
        if request.method == 'GET':
            posts = DrhtPostForoPofr.objects.all().order_by('-pofr_fecha').values(
                'pk_pofr_id',
                'pofr_titulo',
                'pofr_contenido',
                'fk_usus_pofr_usuario__pk_usus_id',
                'fk_usus_pofr_usuario__usus_nombre',
                'pofr_fecha'
            )
            print('posts', posts)  # Verificar los posts obtenidos
            
            # Añadir el número de respuestas a cada post
            for post in posts:
                post['numero_respuestas'] = DrhtRespuestasForoRefe.objects.filter(fk_pofr_refe_post_id=post['pk_pofr_id']).count()
            return Response(posts, status=status.HTTP_200_OK)
        
        elif request.method == 'POST':
            print('request.data', request.data)  # Verificar los datos recibidos
            # Obtener el user_id del token decodificado
            user_id = request.user_id
            serializer = PostForoSerializer(data={'pofr_titulo':request.data['pofr_titulo'],'pofr_contenido':request.data['pofr_contenido'], 'fk_usus_pofr_usuario': user_id})
            if serializer.is_valid():
                serializer.save()
                print('Post creado con éxito', serializer.data)  # Verificar que el post se ha creado correctamente
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
    
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@token_requerido
def posts_foro_by_id(request,post_id):
    try:
        if not post_id:
            return Response({'detail': 'Post ID no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)
        
        post = DrhtPostForoPofr.objects.filter(pk_pofr_id=post_id).values(
            'pk_pofr_id',
            'pofr_titulo',
            'pofr_contenido',
            'fk_usus_pofr_usuario__pk_usus_id',
            'fk_usus_pofr_usuario__usus_nombre',
            'pofr_fecha'
        ).first()  # Usamos first() para obtener solo 1 post, y no un queryset de diccionarios
        
        if not post:
            return Response({'detail': 'Post no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        print('post', post)  # Verificar el post obtenido
        return Response(post, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

class RespuestasForoViewSet(viewsets.ModelViewSet):
    queryset = DrhtRespuestasForoRefe.objects.all()
    serializer_class = RespuestasForoSerializer
    
@api_view(['GET', 'POST'])
@token_requerido
def respuestas_post_foro(request, post_id):
    try:
        if not post_id:
            return Response({'detail': 'Post ID no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if request.method == 'GET':
            respuestas = DrhtRespuestasForoRefe.objects.filter(fk_pofr_refe_post_id=post_id).order_by('-refe_fecha').values(
                'pk_refe_id',
                'refe_contenido',
                'fk_usus_refe_usuario__pk_usus_id',
                'fk_usus_refe_usuario__usus_nombre',
                'refe_fecha'
            )
            print('respuestas', respuestas)  # Verificar las respuestas obtenidas
            return Response(respuestas, status=status.HTTP_200_OK)
        
        elif request.method == 'POST':
            print('request.data', request.data)  # Verificar los datos recibidos
            # Obtener el user_id del token decodificado
            user_id = request.user_id
            serializer = RespuestasForoSerializer(data={'refe_contenido':request.data['refe_contenido'], 'fk_usus_refe_usuario': user_id, 'fk_pofr_refe_post': post_id})
            if serializer.is_valid():
                serializer.save()
                print('Respuesta creada con éxito', serializer.data)  # Verificar que la respuesta se ha creado correctamente
                return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({'detail': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


