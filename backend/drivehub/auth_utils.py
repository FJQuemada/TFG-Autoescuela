import jwt
from datetime import datetime, timedelta, timezone
from django.conf import settings

def obtener_token(usuario):

    payload = {
        'user_id': usuario.pk_usus_id,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=1),  # El token expira en 1 minuto
        'iat': datetime.now(timezone.utc),  # Fecha de emisión
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token