def obtener_usuario(tabla):
    try:
        usuarioPrimi = tabla.objects.get(pk_usuario_id = 1)
        return usuarioPrimi
    except tabla.DoesNotExist:
        return None
    

def login_usuario(Model, input_email, input_password):
    try:
        # Obtener el usuario por nombre
        email_usuario = Model.objects.get(usus_email=input_email)
        
        # Comparar la contraseña recibida con la almacenada
        if input_password == email_usuario.usus_password:
            return True
        else:
            return False

    except Model.DoesNotExist:
        # Si no existe el usuario, devolvemos False (o podrías usar None si quieres distinguir el caso)
        return False