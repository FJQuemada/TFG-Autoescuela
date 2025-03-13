# Un serializador en Django REST Framework es una herramienta que permite convertir
# los objetos de los modelos de Django en formatos de datos fácilmente transferibles
# (como JSON) y viceversa. 
#
# - Convierte los objetos del modelo en datos JSON que se pueden enviar al frontend.
# - Valida los datos recibidos en el frontend y los convierte en objetos del modelo
#   para poder guardarlos en la base de datos.
#
# Básicamente, el serializador actúa como un puente entre la base de datos y el frontend,
# asegurando que los datos se envíen y reciban de manera correcta y estructurada.

from rest_framework import serializers
from .models import DrhtDificultadDiff, DrhtLogrosLogr, DrhtLogrosUsuarioLgus, DrhtUsuariosUsus, DrhtTestsTsts, DrhtTestsUsuarioTeus, DrhtPreguntasPreg, DrhtPreguntasTestPgte, DrhtRespuestasResp, DrhtPostForoPofr, DrhtRespuestasForoRefe
import re       # Se importa el módulo re para trabajar con expresiones regulares.

# En este caso, el serializador DificultadSerializer se define como una subclase de
# serializers.ModelSerializer. Esto significa que hereda todas las funcionalidades de
# serializers.ModelSerializer y se puede personalizar según sea necesario.
# No es necesario definir el __init__ o el save() en el serializador, ya que estos
# métodos ya están definidos en serializers.ModelSerializer.
class DificultadSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtDificultadDiff
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtUsuariosUsus
        fields = '__all__'
        read_only_fields = ('pk_usus_id','usus_fecha_alta','usus_nivel')

    # Las validaciones de los campos solo se realizan cuando el metodo es llamado por POST o PUT

    def validate_usus_nombre(self, value):
        if value and len(value) < 3:
            raise serializers.ValidationError('El nombre debe tener al menos 3 caracteres.')
        
        if not value:
            raise serializers.ValidationError('El nombre es requerido.')
        return value

    # Se define un método validate_usus_email() para validar el campo usus_email.
    # Este método se llama automáticamente cuando se valida el campo usus_email gracias a la convención de nombres
    # que empiezan por validate_ seguido del nombre del campo.(Es cosa de Django REST Framework)
    # Si el campo es válido, el método debe devolver el valor del campo.
    # Si el campo no es válido, el método debe lanzar una excepción serializers.ValidationError.
    #Aun no funciona

    def validate_usus_email(self, value):
        if not value:
            raise serializers.ValidationError('El email es requerido.')
        
        email_regex = r'^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError('El email no tiene un formato válido.')
        # Se comprueba si el email ya existe en la base de datos.
        if DrhtUsuariosUsus.objects.filter(usus_email=value).exists():
            raise serializers.ValidationError('El email ya está en uso.')
        return value
    
    def validate_usus_password(self, value):
        if not value:
            raise serializers.ValidationError('La contraseña es requerida.')
        # Se comprueba si el password tiene al menos 8 caracteres.
        if len(value) < 8:
            raise serializers.ValidationError('La contraseña debe tener al menos 8 caracteres.')
        return value

class LogrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtLogrosLogr
        fields = '__all__'
        read_only_fields = ('pk_logr_id','logr_image')

class LogrosUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtLogrosUsuarioLgus
        fields = '__all__'
        read_only_fields = ('pk_lgus_id','lgus_fecha_obtencion')

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtTestsTsts
        fields = '__all__'
        read_only_fields = ('pk_tsts_id','tsts_fecha_creacion')

class TestUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtTestsUsuarioTeus
        fields = '__all__'
        read_only_fields = ('pk_teus_id','teus_fecha')

class PreguntasSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtPreguntasPreg
        fields = '__all__'

class PreguntasTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtPreguntasTestPgte
        fields = '__all__'

class RespuestasSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtRespuestasResp
        fields = '__all__'

class PostForoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtPostForoPofr
        fields = '__all__'
        read_only_fields = ('pk_pofr_id','pofr_fecha','pofr_likes','pofr_dislikes')

class RespuestasForoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtRespuestasForoRefe
        fields = '__all__'
        read_only_fields = ('pk_refe_id','refe_fecha','refe_likes','refe_dislikes')


