from django.shortcuts import render
from django.http import JsonResponse
from .models import DrhtDificultadDiff

from rest_framework import permissions, viewsets,generics
from .serializers import DificultadSerializer
# Create your views here.

def get_dificultades(request):
    dificultades = DrhtDificultadDiff.objects.all().values('pk_diff_id', 'diff_nombre')
    return JsonResponse(list(dificultades), safe=False)

class DificultadViewSet(viewsets.ModelViewSet):
    queryset = DrhtDificultadDiff.objects.all()
    serializer_class = DificultadSerializer

class DificultadList(generics.ListCreateAPIView):
    queryset = DrhtDificultadDiff.objects.all()
    serializer_class = DificultadSerializer