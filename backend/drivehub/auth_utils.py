import jwt
from datetime import datetime, timedelta, timezone
from django.conf import settings
from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def obtener_access_token(usuario):
    # Generar el token JWT
    # Access token
    # El payload contiene la información que quieres incluir en el token
    access_token_payload = {
        'user_id': usuario.pk_usus_id,
        'exp': datetime.now(timezone.utc) + timedelta(hours=2),  # El token expira en 5 minutos
        'iat': datetime.now(timezone.utc),  # Fecha de emisión
    }
    access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256')

    return access_token

def obtener_refresh_token(usuario):
    # Refresh token
    # El payload contiene la información que quieres incluir en el token
    refresh_token_payload = {
        'user_id': usuario.pk_usus_id,
        'exp': datetime.now(timezone.utc) + timedelta(hours=24),  # El token expira en 30 días
        'iat': datetime.now(timezone.utc),  # Fecha de emisión
    }
    refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256')

    return refresh_token

def decodificar_token(token):
        # Decodificar el token
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        print('hola',payload)
        # Verificar si el token ha expirado
        if datetime.fromtimestamp(payload['exp'], timezone.utc) < datetime.now(timezone.utc):
            return None  # El token ha expirado
        # Verificar si el token es inválido
        if 'user_id' not in payload:
            return None  # El token es inválido
        # Si el token es válido, devolver el payload
        return payload
    
def token_requerido(func):
    @wraps(func)
    def wrapped(request, *args, **kwargs):
        # Obtener el encabezado de autorización
        auth_header = request.headers.get('Authorization')
        print('Estoy en el decorador', auth_header)
        
        # Verificar si el encabezado contiene el token
        if not auth_header or not auth_header.startswith('Bearer '):
            print('No hay token')
            return Response({'detail': 'Token no proporcionado'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener el token
        token = auth_header.split(' ')[1]
        
        # Decodificar el token
        payload = decodificar_token(token)
        print('Estoy en token_requerido', payload)
        
        # Verificar si el token es válido
        if not payload:
            return Response({'detail': 'Token inválido o expirado'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Llamar a la función original pasando el request con el payload
        return func(request, *args, **kwargs)
    
    return wrapped