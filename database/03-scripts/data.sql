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
usus_fecha_alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
lgus_fecha_obtencion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--TESTS

CREATE TABLE IF NOT EXISTS drht_tests_tsts(
pk_tsts_id serial primary key,
tsts_nombre TEXT,
fk_diff_tsts_dificultad_id INTEGER references drht_dificultad_diff(pk_diff_id),
tsts_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
tsts_activo BOOLEAN
);

CREATE TABLE IF NOT EXISTS drht_tests_usuario_teus(
pk_teus_id serial primary key,
fk_tsts_teus_test_id INTEGER references drht_tests_tsts(pk_tsts_id),
fk_usus_teus_usuario_id INTEGER references drht_usuarios_usus(pk_usus_id),
teus_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
pofr_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
pofr_likes INTEGER DEFAULT 0,
pofr_dislikes INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS drht_respuestas_foro_refe(
pk_refe_id serial primary key,
fk_pofr_refe_post_id INTEGER references drht_post_foro_pofr(pk_pofr_id),
refe_contenido TEXT,
refe_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
refe_likes INTEGER DEFAULT 0,
refe_dislikes INTEGER DEFAULT 0
);

-- CREATE ROLE root WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD 'root';


INSERT INTO drht_dificultad_diff (diff_nombre) VALUES
('Fácil'),
('Intermedio'),
('Difícil'),
('Experto');

--
-- Primero, elimina los datos de la tabla que *hace referencia* a la otra
DELETE FROM drht_preguntas_test_pgte;

-- Segundo, elimina los tests que halla;
TRUNCATE TABLE drht_tests_tsts RESTART IDENTITY CASCADE;

-- Luego, trunca la tabla referenciada y reinicia su identidad
TRUNCATE TABLE drht_preguntas_preg RESTART IDENTITY CASCADE;

-- Finalmente, trunca la tabla original y reinicia su identidad
TRUNCATE TABLE drht_preguntas_test_pgte RESTART IDENTITY CASCADE;

-- Primero, elimina los datos de la tabla que *hace referencia* a la otra
DELETE FROM drht_respuestas_resp;

-- Finalmente, trunca la tabla original y reinicia su identidad
TRUNCATE TABLE drht_respuestas_resp RESTART IDENTITY CASCADE;


-- tests
[
  {
    "tsts_nombre": "Test de Cultura General #1",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 1
  },
  {
    "tsts_nombre": "Test de Ciencia Básica",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 2
  },
  {
    "tsts_nombre": "Test de Historia del Arte",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 3
  },
  {
    "tsts_nombre": "Test de Geografía Mundial",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 1
  },
  {
    "tsts_nombre": "Test de Literatura Universal",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 2
  },
  {
    "tsts_nombre": "Test de Matemáticas Fundamentales",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 1
  },
  {
    "tsts_nombre": "Test de Informática Básica",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 2
  },
  {
    "tsts_nombre": "Test de Música Clásica",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 3
  },
  {
    "tsts_nombre": "Test de Cine Contemporáneo",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 2
  },
  {
    "tsts_nombre": "Test de Deportes Olímpicos",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 1
  }
]

-- preguntas
[
  {
    "preg_enunciado": "¿Cuál es la capital de Australia?",
    "preg_image": null,
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál es el símbolo químico del oxígeno?",
    "preg_image": null,
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Quién pintó la Mona Lisa?",
    "preg_image": "mona_lisa.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cuál es el océano más grande del mundo?",
    "preg_image": null,
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Quién escribió 'Don Quijote de la Mancha'?",
    "preg_image": "don_quijote.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cuánto es la raíz cuadrada de 144?",
    "preg_image": null,
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué significa CPU?",
    "preg_image": null,
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Quién compuso la 'Quinta Sinfonía'?",
    "preg_image": "quinta_sinfonia.jpg",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Quién dirigió la película 'El Padrino'?",
    "preg_image": "el_padrino.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cuántos anillos tienen los Juegos Olímpicos?",
    "preg_image": "anillos_olimpicos.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál es el planeta más grande de nuestro sistema solar?",
    "preg_image": null,
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál es el metal más abundante en la corteza terrestre?",
    "preg_image": null,
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Quién escribió 'Hamlet'?",
    "preg_image": "hamlet.jpg",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál es el río que atraviesa París?",
    "preg_image": null,
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué es un algoritmo?",
    "preg_image": null,
    "fk_diff_preg_dificultad": 2
  }
]

-- respuestas
[
  {"resp_contenido": "Sídney", "fk_preg_resp_pregunta": 1, "es_correcta": false},
  {"resp_contenido": "Melbourne", "fk_preg_resp_pregunta": 1, "es_correcta": false},
  {"resp_contenido": "Canberra", "fk_preg_resp_pregunta": 1, "es_correcta": true},
  {"resp_contenido": "Ox", "fk_preg_resp_pregunta": 2, "es_correcta": false},
  {"resp_contenido": "O2", "fk_preg_resp_pregunta": 2, "es_correcta": false},
  {"resp_contenido": "O", "fk_preg_resp_pregunta": 2, "es_correcta": true},
  {"resp_contenido": "Vincent van Gogh", "fk_preg_resp_pregunta": 3, "es_correcta": false},
  {"resp_contenido": "Leonardo da Vinci", "fk_preg_resp_pregunta": 3, "es_correcta": true},
  {"resp_contenido": "Pablo Picasso", "fk_preg_resp_pregunta": 3, "es_correcta": false},
  {"resp_contenido": "Océano Atlántico", "fk_preg_resp_pregunta": 4, "es_correcta": false},
  {"resp_contenido": "Océano Índico", "fk_preg_resp_pregunta": 4, "es_correcta": false},
  {"resp_contenido": "Océano Pacífico", "fk_preg_resp_pregunta": 4, "es_correcta": true},
  {"resp_contenido": "Gabriel García Márquez", "fk_preg_resp_pregunta": 5, "es_correcta": false},
  {"resp_contenido": "Miguel de Cervantes", "fk_preg_resp_pregunta": 5, "es_correcta": true},
  {"resp_contenido": "Jorge Luis Borges", "fk_preg_resp_pregunta": 5, "es_correcta": false},
  {"resp_contenido": "10", "fk_preg_resp_pregunta": 6, "es_correcta": false},
  {"resp_contenido": "12", "fk_preg_resp_pregunta": 6, "es_correcta": true},
  {"resp_contenido": "14", "fk_preg_resp_pregunta": 6, "es_correcta": false},
  {"resp_contenido": "Central Process Unit", "fk_preg_resp_pregunta": 7, "es_correcta": true},
  {"resp_contenido": "Computer Personal Unit", "fk_preg_resp_pregunta": 7, "es_correcta": false},
  {"resp_contenido": "Control Processing Unit", "fk_preg_resp_pregunta": 7, "es_correcta": false},
  {"resp_contenido": "Wolfgang Amadeus Mozart", "fk_preg_resp_pregunta": 8, "es_correcta": false},
  {"resp_contenido": "Ludwig van Beethoven", "fk_preg_resp_pregunta": 8, "es_correcta": true},
  {"resp_contenido": "Johann Sebastian Bach", "fk_preg_resp_pregunta": 8, "es_correcta": false},
  {"resp_contenido": "Martin Scorsese", "fk_preg_resp_pregunta": 9, "es_correcta": false},
  {"resp_contenido": "Francis Ford Coppola", "fk_preg_resp_pregunta": 9, "es_correcta": true},
  {"resp_contenido": "Quentin Tarantino", "fk_preg_resp_pregunta": 9, "es_correcta": false},
  {"resp_contenido": "4", "fk_preg_resp_pregunta": 10, "es_correcta": false},
  {"resp_contenido": "5", "fk_preg_resp_pregunta": 10, "es_correcta": true},
  {"resp_contenido": "6", "fk_preg_resp_pregunta": 10, "es_correcta": false},
  {"resp_contenido": "Saturno", "fk_preg_resp_pregunta": 11, "es_correcta": false},
  {"resp_contenido": "Júpiter", "fk_preg_resp_pregunta": 11, "es_correcta": true},
  {"resp_contenido": "Marte", "fk_preg_resp_pregunta": 11, "es_correcta": false},
  {"resp_contenido": "Hierro", "fk_preg_resp_pregunta": 12, "es_correcta": false},
  {"resp_contenido": "Aluminio", "fk_preg_resp_pregunta": 12, "es_correcta": true},
  {"resp_contenido": "Cobre", "fk_preg_resp_pregunta": 12, "es_correcta": false},
  {"resp_contenido": "Charles Dickens", "fk_preg_resp_pregunta": 13, "es_correcta": false},
  {"resp_contenido": "William Shakespeare", "fk_preg_resp_pregunta": 13, "es_correcta": true},
  {"resp_contenido": "Jane Austen", "fk_preg_resp_pregunta": 13, "es_correcta": false},
  {"resp_contenido": "El Támesis", "fk_preg_resp_pregunta": 14, "es_correcta": false},
  {"resp_contenido": "El Sena", "fk_preg_resp_pregunta": 14, "es_correcta": true},
  {"resp_contenido": "El Rin", "fk_preg_resp_pregunta": 14, "es_correcta": false},
  {"resp_contenido": "Un tipo de hardware de computadora.", "fk_preg_resp_pregunta": 15, "es_correcta": false},
  {"resp_contenido": "Una secuencia de pasos para resolver un problema.", "fk_preg_resp_pregunta": 15, "es_correcta": true},
  {"resp_contenido": "Un lenguaje de programación.", "fk_preg_resp_pregunta": 15, "es_correcta": false}
]

-- preguntas en tests

[
  {"fk_tsts_pgte_test": 1, "fk_preg_pgte_pregunta": 1},
  {"fk_tsts_pgte_test": 1, "fk_preg_pgte_pregunta": 5},
  {"fk_tsts_pgte_test": 1, "fk_preg_pgte_pregunta": 8},
  {"fk_tsts_pgte_test": 1, "fk_preg_pgte_pregunta": 12},
  {"fk_tsts_pgte_test": 1, "fk_preg_pgte_pregunta": 14},
  {"fk_tsts_pgte_test": 2, "fk_preg_pgte_pregunta": 2},
  {"fk_tsts_pgte_test": 2, "fk_preg_pgte_pregunta": 6},
  {"fk_tsts_pgte_test": 2, "fk_preg_pgte_pregunta": 9},
  {"fk_tsts_pgte_test": 2, "fk_preg_pgte_pregunta": 13},
  {"fk_tsts_pgte_test": 2, "fk_preg_pgte_pregunta": 15},
  {"fk_tsts_pgte_test": 3, "fk_preg_pgte_pregunta": 3},
  {"fk_tsts_pgte_test": 3, "fk_preg_pgte_pregunta": 7},
  {"fk_tsts_pgte_test": 3, "fk_preg_pgte_pregunta": 10},
  {"fk_tsts_pgte_test": 3, "fk_preg_pgte_pregunta": 11},
  {"fk_tsts_pgte_test": 3, "fk_preg_pgte_pregunta": 1},
  {"fk_tsts_pgte_test": 4, "fk_preg_pgte_pregunta": 4},
  {"fk_tsts_pgte_test": 4, "fk_preg_pgte_pregunta": 8},
  {"fk_tsts_pgte_test": 4, "fk_preg_pgte_pregunta": 11},
  {"fk_tsts_pgte_test": 4, "fk_preg_pgte_pregunta": 14},
  {"fk_tsts_pgte_test": 4, "fk_preg_pgte_pregunta": 2},
  {"fk_tsts_pgte_test": 5, "fk_preg_pgte_pregunta": 5},
  {"fk_tsts_pgte_test": 5, "fk_preg_pgte_pregunta": 9},
  {"fk_tsts_pgte_test": 5, "fk_preg_pgte_pregunta": 12},
  {"fk_tsts_pgte_test": 5, "fk_preg_pgte_pregunta": 15},
  {"fk_tsts_pgte_test": 5, "fk_preg_pgte_pregunta": 3},
  {"fk_tsts_pgte_test": 6, "fk_preg_pgte_pregunta": 6},
  {"fk_tsts_pgte_test": 6, "fk_preg_pgte_pregunta": 10},
  {"fk_tsts_pgte_test": 6, "fk_preg_pgte_pregunta": 13},
  {"fk_tsts_pgte_test": 6, "fk_preg_pgte_pregunta": 1},
  {"fk_tsts_pgte_test": 6, "fk_preg_pgte_pregunta": 4},
  {"fk_tsts_pgte_test": 7, "fk_preg_pgte_pregunta": 7},
  {"fk_tsts_pgte_test": 7, "fk_preg_pgte_pregunta": 11},
  {"fk_tsts_pgte_test": 7, "fk_preg_pgte_pregunta": 14},
  {"fk_tsts_pgte_test": 7, "fk_preg_pgte_pregunta": 2},
  {"fk_tsts_pgte_test": 7, "fk_preg_pgte_pregunta": 5},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 8},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 12},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 15},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 3},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 6},
  {"fk_tsts_pgte_test": 9, "fk_preg_pgte_pregunta": 9},
  {"fk_tsts_pgte_test": 9, "fk_preg_pgte_pregunta": 13},
  {"fk_tsts_pgte_test": 9, "fk_preg_pgte_pregunta": 1},
  {"fk_tsts_pgte_test": 9, "fk_preg_pgte_pregunta": 4},
  {"fk_tsts_pgte_test": 9, "fk_preg_pgte_pregunta": 7},
  {"fk_tsts_pgte_test": 10, "fk_preg_pgte_pregunta": 10},
  {"fk_tsts_pgte_test": 10, "fk_preg_pgte_pregunta": 14},
  {"fk_tsts_pgte_test": 10, "fk_preg_pgte_pregunta": 2},
  {"fk_tsts_pgte_test": 10, "fk_preg_pgte_pregunta": 5},
  {"fk_tsts_pgte_test": 10, "fk_preg_pgte_pregunta": 8}
]