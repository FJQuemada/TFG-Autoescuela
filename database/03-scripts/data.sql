--INSERTS PARA LA DB

CREATE TABLE IF NOT EXISTS drht_dificultad_diff(
pk_diff_id serial primary key,
diff_nombre TEXT
);

--USUARIOS

CREATE TABLE IF NOT EXISTS drht_usuarios_usus(
pk_usus_id serial primary key,
usus_nombre TEXT,
usus_email TEXT unique,
usus_password TEXT,
usus_fecha_alta TIMESTAMP,
usus_nivel INTEGER default 1
);

--LOGROS

CREATE TABLE IF NOT EXISTS drht_logros_logr(
pk_logr_id serial primary key,
logr_nombre TEXT,
logr_descripcion TEXT,
logr_image TEXT default ''
);

CREATE TABLE IF NOT EXISTS drht_logros_usuario_lgus(
pk_lgus_id serial primary key,
fk_usus_lgus_usuario_id INTEGER references drht_usuarios_usus(pk_usus_id),
fk_logr_lgus_logro_id INTEGER references drht_logros_logr(pk_logr_id),
lgus_fecha_obtencion TIMESTAMP
);

--TESTS

CREATE TABLE IF NOT EXISTS drht_tests_tsts(
pk_tsts_id serial primary key,
tsts_nombre TEXT,
fk_diff_tsts_dificultad_id INTEGER references drht_dificultad_diff(pk_diff_id),
tsts_fecha_creacion TIMESTAMP,
tsts_activo BOOLEAN
);

CREATE TABLE IF NOT EXISTS drht_tests_usuario_teus(
pk_teus_id serial primary key,
fk_tsts_teus_test_id INTEGER references drht_tests_tsts(pk_tsts_id),
fk_usus_teus_usuario_id INTEGER references drht_usuarios_usus(pk_usus_id),
teus_fecha TIMESTAMP,
teus_aciertos INTEGER,
teus_fallos INTEGER,
teus_tiempo INTEGER
);

--PREGUNTAS

CREATE TABLE IF NOT EXISTS drht_preguntas_preg(
pk_preg_id serial primary key,
preg_enunciado TEXT,
fk_diff_preg_dificultad_id INTEGER references drht_dificultad_diff(pk_diff_id),
preg_image TEXT
);

CREATE TABLE IF NOT EXISTS drht_preguntas_test_pgte(
pk_pgte_id serial primary key,
fk_tsts_pgte_test_id INTEGER references drht_tests_tsts(pk_tsts_id),
fk_preg_pgte_pregunta_id INTEGER references drht_preguntas_preg(pk_preg_id)
);

CREATE TABLE IF NOT EXISTS drht_respuestas_resp(
pk_resp_id serial primary key,
fk_preg_resp_pregunta_id INTEGER references drht_preguntas_preg(pk_preg_id),
resp_contenido TEXT,
resp_correcta BOOLEAN
);

--FORO

CREATE TABLE IF NOT EXISTS drht_post_foro_pofr(
pk_pofr_id serial primary key,
fk_usus_pofr_usuario_id INTEGER references drht_usuarios_usus(pk_usus_id),
pofr_titulo TEXT,
pofr_contenido TEXT,
pofr_fecha TIMESTAMP,
pofr_likes INTEGER,
pofr_dislikes INTEGER
);

CREATE TABLE IF NOT EXISTS drht_respuestas_foro_refe(
pk_refe_id serial primary key,
fk_pofr_refe_post_id INTEGER references drht_post_foro_pofr(pk_pofr_id),
refe_contenido TEXT,
refe_fecha TIMESTAMP,
refe_likes INTEGER,
refe_dislikes INTEGER
);

CREATE ROLE root WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD 'root';


INSERT INTO drht_dificultad_diff (diff_nombre) VALUES
('Fácil'),
('Intermedio'),
('Difícil'),
('Experto');
