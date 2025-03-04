CREATE TABLE IF NOT EXISTS drht_respuestas_resp(
pk_resp_id serial primary key,
fk_preg_resp_pregunta_id INTEGER references drht_preguntas_preg(pk_preg_id),
resp_contenido TEXT,
resp_correcta BOOLEAN
);