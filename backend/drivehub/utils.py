def obtener_usuario(tabla):
    try:
        usuarioPrimi = tabla.objects.get(pk_usuario_id = 1)
        return usuarioPrimi
    except tabla.DoesNotExist:
        return None