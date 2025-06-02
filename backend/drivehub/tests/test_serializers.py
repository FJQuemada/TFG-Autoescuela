from django.test import TestCase
from ..models import (
    DrhtTestsTsts,
    DrhtUsuariosUsus,
    DrhtDificultadDiff
)
from ..serializers import (PostForoSerializer,TestUsuarioSerializer)

class PostForoSerializerTest(TestCase):

    def setUp(self):
        self.usuario = DrhtUsuariosUsus.objects.create(
            usus_nombre='Javi',
            usus_email='javi@correo.com',
            usus_password='1234'
        )
        self.data_valida = {
            'fk_usus_pofr_usuario': self.usuario.pk_usus_id,
            'pofr_titulo': 'Título de prueba',
            'pofr_contenido': 'Contenido de prueba',
            # no hace falta poner pk ni fecha, son read_only
        }

    def test_serializer_valido(self):
        serializer = PostForoSerializer(data=self.data_valida)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_serializer_crea_objeto(self):
        serializer = PostForoSerializer(data=self.data_valida)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        post = serializer.save()
        self.assertEqual(post.pofr_titulo, self.data_valida['pofr_titulo'])
        self.assertEqual(post.fk_usus_pofr_usuario.pk_usus_id, self.usuario.pk_usus_id)


class TestUsuarioSerializerTest(TestCase):

    def setUp(self):
        # Crear una dificultad para el test
        self.dificultad = DrhtDificultadDiff.objects.create(
            diff_nombre='Media',
        )

        # Crear un test asociado a esa dificultad
        self.test = DrhtTestsTsts.objects.create(
            tsts_nombre='Test de ejemplo',
            fk_diff_tsts_dificultad=self.dificultad,
            tsts_activo=True
        )

        # Crear un usuario
        self.usuario = DrhtUsuariosUsus.objects.create(
            usus_nombre='Usuario de prueba',
            usus_email='usuario@test.com',
            usus_password='clave123'
        )

        self.valid_data = {
            'fk_tsts_teus_test': self.test.pk_tsts_id,
            'fk_usus_teus_usuario': self.usuario.pk_usus_id,
            'teus_aciertos': 27,
            'teus_fallos': 3,
            'teus_tiempo': None,  # Tiempo en null como pediste
            'teus_aprobado': True,
        }

    def test_serializer_valido_con_todos_los_campos(self):
        serializer = TestUsuarioSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        instancia = serializer.save()
        self.assertEqual(instancia.fk_tsts_teus_test, self.test)
        self.assertEqual(instancia.fk_usus_teus_usuario, self.usuario)
        self.assertIsNone(instancia.teus_tiempo)
        self.assertTrue(instancia.teus_aprobado)

    def test_serializer_valido_sin_fk_usuario(self):
        datos = self.valid_data.copy()
        datos['fk_usus_teus_usuario'] = None
        serializer = TestUsuarioSerializer(data=datos)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_serializer_valido_sin_fk_test(self):
        datos = self.valid_data.copy()
        datos['fk_tsts_teus_test'] = None
        serializer = TestUsuarioSerializer(data=datos)
        self.assertTrue(serializer.is_valid(), serializer.errors)