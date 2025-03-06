from django.shortcuts import render
from django.http import JsonResponse
from .models import DrhtDificultadDiff
# Create your views here.

def get_dificultades(request):
    dificultades = DrhtDificultadDiff.objects.all().values('pk_diff_id', 'diff_nombre')
    return JsonResponse(list(dificultades), safe=False)