import os
import django

# Configurar el entorno de Django (asegúrate de que el script esté en la raíz del proyecto)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drivehub.settings')  # Cambia 'drivehub' al nombre correcto de tu proyecto
django.setup()

# Importar el modelo generado por Django
from drivehub.models import DrhtDificultadDiff  # Usar el nombre correcto del modelo

# Consultar la tabla y mostrar los resultados
dificultades = DrhtDificultadDiff.objects.all()  # Esto obtendrá todos los registros de la tabla

# Imprimir los resultados en consola
for dificultad in dificultades:
    print(f"ID: {dificultad.pk_diff_id}, Nombre: {dificultad.diff_nombre}")
