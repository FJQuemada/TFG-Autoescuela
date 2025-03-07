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
from .models import DrhtDificultadDiff

class DificultadSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrhtDificultadDiff
        fields = ['diff_nombre']