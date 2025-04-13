import jwt
from datetime import datetime, timedelta, timezone
from django.conf import settings

def obtener_access_token(usuario):

    # Generar el token JWT
    # Access token
    # El payload contiene la información que quieres incluir en el token
    access_token_payload = {
        'user_id': usuario.pk_usus_id,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=5),  # El token expira en 5 minutos
        'iat': datetime.now(timezone.utc),  # Fecha de emisión
    }
    access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256')

    return access_token

def obtener_refresh_token(usuario):
    # Refresh token
    # El payload contiene la información que quieres incluir en el token
    refresh_token_payload = {
        'user_id': usuario.pk_usus_id,
        'exp': datetime.now(timezone.utc) + timedelta(days=1),  # El token expira en 30 días
        'iat': datetime.now(timezone.utc),  # Fecha de emisión
    }
    refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256')

    return refresh_token

def decodificar_token(token):
    try:
        # Decodificar el token
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        # El token ha expirado
        return None
    except jwt.InvalidTokenError:
        # El token es inválido
        return None