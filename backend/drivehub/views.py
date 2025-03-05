from django.http import JsonResponse
from drivehub.models import DrhtDificultadDiff

def lista_dificultades(request):
    dificultades = DrhtDificultadDiff.objects.all().values("pk_diff_id", "diff_nombre")  # Convertir a diccionario
    return JsonResponse(list(dificultades), safe=False)  # Devolver JSON

def sumar_dificultad(request):
    DrhtDificultadDiff