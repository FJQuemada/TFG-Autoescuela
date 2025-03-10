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

# En este caso, el serializador DificultadSerializer se define como una subclase de
# serializers.ModelSerializer. Esto significa que hereda todas las funcionalidades de
# serializers.ModelSerializer y se puede personalizar según sea necesario.
class DificultadSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtDificultadDiff
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtUsuariosUsus
        fields = '__all__'
        read_only_fields = ('pk_usus_id','usus_fecha_alta','usus_nivel')

class LogrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtLogrosLogr
        fields = '__all__'

class LogrosUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtLogrosUsuarioLgus
        fields = '__all__'

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtTestsTsts
        fields = '__all__'

class TestUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtTestsUsuarioTeus
        fields = '__all__'

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

class RespuestasForoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtRespuestasForoRefe
        fields = '__all__'


