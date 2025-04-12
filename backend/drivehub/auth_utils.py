import jwt
from datetime import datetime, timedelta, timezone
from django.conf import settings

def obtener_token(usuario):

    # Generar el token JWT
    # Access token
    # El payload contiene la información que quieres incluir en el token
    access_token_payload = {
        'user_id': usuario.pk_usus_id,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=5),  # El token expira en 5 minutos
        'iat': datetime.now(timezone.utc),  # Fecha de emisión
    }
    access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256')

    # Refresh token
    # El payload contiene la información que quieres incluir en el token
    refresh_token_payload = {
        'user_id': usuario.pk_usus_id,
        'exp': datetime.now(timezone.utc) + timedelta(days=1),  # El token expira en 30 días
        'iat': datetime.now(timezone.utc),  # Fecha de emisión
    }
    refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256')

    return access_token,refresh_token