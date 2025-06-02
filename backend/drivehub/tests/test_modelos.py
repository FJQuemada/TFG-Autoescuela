from django.test import TestCase
from ..models import DrhtPostForoPofr  # ajusta el import a tu estructura
from ..models import DrhtUsuariosUsus  # el modelo del usuario
from ..models import DrhtPreguntasPreg  # el modelo de preguntas, si es necesario para las pruebas
from ..models import DrhtDificultadDiff  # el modelo de dificultad, si es necesario para las pruebas

class DrhtPostForoPofrModelTest(TestCase):

    def setUp(self):
        self.usuario = DrhtUsuariosUsus.objects.create(
            usus_nombre='Javi',
            usus_email='javi@correo.com',
            usus_password='1234'
        )

    def test_creacion_post_valido(self):
        post = DrhtPostForoPofr.objects.create(
            fk_usus_pofr_usuario=self.usuario,
            pofr_titulo='Título de prueba',
            pofr_contenido='Contenido de prueba'
        )
        self.assertIsNotNone(post.pk_pofr_id)
        self.assertEqual(post.pofr_titulo, 'Título de prueba')
        self.assertEqual(post.pofr_likes, 0)  # default
        self.assertEqual(post.pofr_dislikes, 0)  # default
        self.assertIsNotNone(post.pofr_fecha)

    def test_no_se_permite_post_sin_usuario(self):
        with self.assertRaises(Exception):
            DrhtPostForoPofr.objects.create(
                pofr_titulo='Post inválido',
                pofr_contenido='No tiene usuario'
            )

class DrhtUsuariosUsusModelTest(TestCase):

    def test_creacion_usuario_valido(self):
        usuario = DrhtUsuariosUsus.objects.create(
            usus_nombre='Carlos',
            usus_email='carlos@correo.com',
            usus_password='1234'
        )
        self.assertIsNotNone(usuario.pk_usus_id)  # Que tenga ID asignado
        self.assertEqual(usuario.usus_nombre, 'Carlos')
        self.assertEqual(usuario.usus_email, 'carlos@correo.com')
        self.assertEqual(usuario.usus_password, '1234')
        self.assertEqual(usuario.usus_nivel, 1)  # Valor por defecto
        self.assertEqual(usuario.usus_racha, 0)  # Valor por defecto
        self.assertIsNotNone(usuario.usus_fecha_alta)  # Fecha se auto asigna

class DrhtPreguntasPregModelTest(TestCase):

    def setUp(self):
        # Crear una dificultad para relacionar
        self.dificultad = DrhtDificultadDiff.objects.create(
            diff_nombre='Media'
        )

    def test_creacion_pregunta_valida(self):
        pregunta = DrhtPreguntasPreg.objects.create(
            preg_enunciado='¿Cuál es la capital de España?',
            fk_diff_preg_dificultad=self.dificultad,
            preg_image='http://imagen-ejemplo.com/mapa.png'
        )
        self.assertIsNotNone(pregunta.pk_preg_id)
        self.assertEqual(pregunta.preg_enunciado, '¿Cuál es la capital de España?')
        self.assertEqual(pregunta.fk_diff_preg_dificultad, self.dificultad)
        self.assertEqual(pregunta.preg_image, 'http://imagen-ejemplo.com/mapa.png')

    def test_creacion_pregunta_sin_dificultad(self):
        pregunta = DrhtPreguntasPreg.objects.create(
            preg_enunciado='¿Cuánto es 2+2?',
            preg_image=None
        )
        self.assertIsNotNone(pregunta.pk_preg_id)
        self.assertIsNone(pregunta.fk_diff_preg_dificultad)