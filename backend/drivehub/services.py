
from django.contrib.auth.hashers import check_password

def obtener_usuario(tabla):
    try:
        usuarioPrimi = tabla.objects.get(pk_usuario_id = 1)
        return usuarioPrimi
    except tabla.DoesNotExist:
        return None
    
# Definimos la función para verificar el login del usuario
# Esta función recibe el modelo, el email y la contraseña del usuario
# y devuelve True si el login es correcto, False si la contraseña no es correcta
# y None si el usuario no existe
def login_usuario(Model, input_email, input_password):
    try:
        # Obtener el usuario por nombre
        email_usuario = Model.objects.get(usus_email=input_email)
        
        # Comparar la contraseña recibida con la almacenada
        if check_password(input_password, email_usuario.usus_password):
            # Si la contraseña es correcta, devolvemos True
            return True
        else:
            # Si la contraseña no es correcta, devolvemos False
            return False

    except Model.DoesNotExist:
        # Si no existe el usuario, devolvemos False (o podrías usar None si quieres distinguir el caso)
        return None