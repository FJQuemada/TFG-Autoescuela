# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)

#root
#admin12345

class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class DrhtDificultadDiff(models.Model):
    pk_diff_id = models.AutoField(primary_key=True)
    diff_nombre = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_dificultad_diff'


class DrhtLogrosLogr(models.Model):
    pk_logr_id = models.AutoField(primary_key=True)
    logr_nombre = models.TextField(blank=True, null=True)
    logr_descripcion = models.TextField(blank=True, null=True)
    logr_image = models.TextField(default='', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_logros_logr'


class DrhtLogrosUsuarioLgus(models.Model):
    pk_lgus_id = models.AutoField(primary_key=True)
    fk_usus_lgus_usuario = models.ForeignKey('DrhtUsuariosUsus', models.DO_NOTHING, blank=True, null=True)
    fk_logr_lgus_logro = models.ForeignKey(DrhtLogrosLogr, models.DO_NOTHING, blank=True, null=True)
    lgus_fecha_obtencion = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_logros_usuario_lgus'


class DrhtPostForoPofr(models.Model):
    pk_pofr_id = models.AutoField(primary_key=True)
    fk_usus_pofr_usuario = models.ForeignKey('DrhtUsuariosUsus', models.DO_NOTHING, blank=True, null=True)
    pofr_titulo = models.TextField(blank=True, null=True)
    pofr_contenido = models.TextField(blank=True, null=True)
    pofr_fecha = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    pofr_likes = models.IntegerField(default=0, blank=True, null=True)
    pofr_dislikes = models.IntegerField(default=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_post_foro_pofr'


class DrhtPreguntasPreg(models.Model):
    pk_preg_id = models.AutoField(primary_key=True)
    preg_enunciado = models.TextField(blank=True, null=True)
    fk_diff_preg_dificultad = models.ForeignKey(DrhtDificultadDiff, models.DO_NOTHING, blank=True, null=True)
    preg_image = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_preguntas_preg'


class DrhtPreguntasTestPgte(models.Model):
    pk_pgte_id = models.AutoField(primary_key=True)
    fk_tsts_pgte_test = models.ForeignKey('DrhtTestsTsts', models.DO_NOTHING, blank=True, null=True)
    fk_preg_pgte_pregunta = models.ForeignKey(DrhtPreguntasPreg, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_preguntas_test_pgte'


class DrhtRespuestasForoRefe(models.Model):
    pk_refe_id = models.AutoField(primary_key=True)
    fk_pofr_refe_post = models.ForeignKey(DrhtPostForoPofr, models.DO_NOTHING, blank=True, null=True)
    refe_contenido = models.TextField(blank=True, null=True)
    refe_fecha = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    refe_likes = models.IntegerField(default=0, blank=True, null=True)
    refe_dislikes = models.IntegerField(default=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_respuestas_foro_refe'


class DrhtRespuestasResp(models.Model):
    pk_resp_id = models.AutoField(primary_key=True)
    fk_preg_resp_pregunta = models.ForeignKey(DrhtPreguntasPreg, models.DO_NOTHING, blank=True, null=True)
    resp_contenido = models.TextField(blank=True, null=True)
    resp_correcta = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_respuestas_resp'


class DrhtTestsTsts(models.Model):
    pk_tsts_id = models.AutoField(primary_key=True)
    tsts_nombre = models.TextField(blank=True, null=True)
    fk_diff_tsts_dificultad = models.ForeignKey(DrhtDificultadDiff, models.DO_NOTHING, blank=True, null=True)
    tsts_fecha_creacion = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    tsts_activo = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_tests_tsts'


class DrhtTestsUsuarioTeus(models.Model):
    pk_teus_id = models.AutoField(primary_key=True)
    fk_tsts_teus_test = models.ForeignKey(DrhtTestsTsts, models.DO_NOTHING, blank=True, null=True)
    fk_usus_teus_usuario = models.ForeignKey('DrhtUsuariosUsus', models.DO_NOTHING, blank=True, null=True)
    teus_fecha = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    teus_aciertos = models.IntegerField(blank=True, null=True)
    teus_fallos = models.IntegerField(blank=True, null=True)
    teus_tiempo = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_tests_usuario_teus'


class DrhtUsuariosUsus(models.Model):
    pk_usus_id = models.AutoField(primary_key=True)
    usus_nombre = models.TextField(blank=True, null=True)
    usus_email = models.TextField(unique=True, blank=True, null=True)
    usus_password = models.TextField(blank=True, null=True)
    usus_fecha_alta = models.DateTimeField(auto_now_add=True ,blank=True, null=True)
    usus_nivel = models.IntegerField(default=1,blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drht_usuarios_usus'
