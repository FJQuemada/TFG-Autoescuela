CREATE ROLE root WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD 'root';

CREATE TABLE IF NOT EXISTS drht_dificultad_diff (
    pk_diff_id SERIAL PRIMARY KEY,
    diff_nombre TEXT
);

CREATE TABLE IF NOT EXISTS drht_logros_logr (
    pk_logr_id SERIAL PRIMARY KEY,
    logr_nombre TEXT,
    logr_descripcion TEXT,
    logr_image TEXT,
    logr_etiqueta TEXT,
    CONSTRAINT unique_achievement_name UNIQUE (logr_nombre)
);

CREATE TABLE IF NOT EXISTS drht_usuarios_usus (
    pk_usus_id SERIAL PRIMARY KEY,
    usus_nombre TEXT,
    usus_email TEXT UNIQUE,
    usus_password TEXT,
    usus_fecha_alta TIMESTAMP,
    usus_nivel INTEGER DEFAULT 1,
    usus_racha INTEGER DEFAULT 0,
    usus_avatar TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS drht_logros_usuario_lgus (
    pk_lgus_id SERIAL PRIMARY KEY,
    fk_usus_lgus_usuario INTEGER REFERENCES drht_usuarios_usus(pk_usus_id),
    fk_logr_lgus_logro INTEGER REFERENCES drht_logros_logr(pk_logr_id),
    lgus_fecha_obtencion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_achievement UNIQUE (fk_usus_lgus_usuario, fk_logr_lgus_logro)
);

CREATE TABLE IF NOT EXISTS drht_post_foro_pofr (
    pk_pofr_id SERIAL PRIMARY KEY,
    fk_usus_pofr_usuario INTEGER NOT NULL REFERENCES drht_usuarios_usus(pk_usus_id),
    pofr_titulo TEXT,
    pofr_contenido TEXT,
    pofr_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pofr_likes INTEGER DEFAULT 0,
    pofr_dislikes INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS drht_respuestas_foro_refe (
    pk_refe_id SERIAL PRIMARY KEY,
    fk_pofr_refe_post INTEGER NOT NULL REFERENCES drht_post_foro_pofr(pk_pofr_id),
    fk_usus_refe_usuario INTEGER NOT NULL REFERENCES drht_usuarios_usus(pk_usus_id),
    refe_contenido TEXT NOT NULL,
    refe_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    refe_likes INTEGER DEFAULT 0,
    refe_dislikes INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS drht_preguntas_preg (
    pk_preg_id SERIAL PRIMARY KEY,
    preg_enunciado TEXT,
    fk_diff_preg_dificultad INTEGER REFERENCES drht_dificultad_diff(pk_diff_id),
    preg_image TEXT
);

CREATE TABLE IF NOT EXISTS drht_respuestas_resp (
    pk_resp_id SERIAL PRIMARY KEY,
    fk_preg_resp_pregunta INTEGER REFERENCES drht_preguntas_preg(pk_preg_id),
    resp_contenido TEXT,
    resp_correcta BOOLEAN
);

CREATE TABLE IF NOT EXISTS drht_tests_tsts (
    pk_tsts_id SERIAL PRIMARY KEY,
    tsts_nombre TEXT,
    fk_diff_tsts_dificultad INTEGER REFERENCES drht_dificultad_diff(pk_diff_id),
    tsts_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tsts_activo BOOLEAN
);

CREATE TABLE IF NOT EXISTS drht_preguntas_test_pgte (
    pk_pgte_id SERIAL PRIMARY KEY,
    fk_tsts_pgte_test INTEGER REFERENCES drht_tests_tsts(pk_tsts_id),
    fk_preg_pgte_pregunta INTEGER REFERENCES drht_preguntas_preg(pk_preg_id),
    CONSTRAINT unique_test_question UNIQUE (fk_tsts_pgte_test, fk_preg_pgte_pregunta)
);

CREATE TABLE IF NOT EXISTS drht_tests_usuario_teus (
    pk_teus_id SERIAL PRIMARY KEY,
    fk_tsts_teus_test INTEGER REFERENCES drht_tests_tsts(pk_tsts_id),
    fk_usus_teus_usuario INTEGER REFERENCES drht_usuarios_usus(pk_usus_id),
    teus_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    teus_aciertos INTEGER,
    teus_fallos INTEGER,
    teus_tiempo INTEGER,
    teus_aprobado BOOLEAN
);


/*DIFICULTADES*/

INSERT INTO drht_dificultad_diff (diff_nombre) VALUES
('Fácil'),
('Intermedio'),
('Difícil'),
('Experto');




