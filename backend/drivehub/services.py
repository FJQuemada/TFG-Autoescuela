
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
    
# Definimos la función para verificar el login del usuario
# Esta función recibe el modelo, el email y la contraseña del usuario
# y devuelve True si el login es correcto, False si la contraseña no es correcta
# y None si el usuario no existe
def login_usuario(Model, input_email, input_password):
    try:
        # Obtener el usuario por nombre
        usuario = Model.objects.get(usus_email=input_email)
        
        # Comparar la contraseña recibida con la almacenada
        if check_password(input_password, usuario.usus_password):
            # Devolvemos True y el propio usuario para poder usarlo en el token
            return True,usuario
        else:
            # Si la contraseña no es correcta, devolvemos False
            return False, None

    except Model.DoesNotExist:
        # Si no existe el usuario, devolvemos False (o podrías usar None si quieres distinguir el caso)
        return None, None
    

