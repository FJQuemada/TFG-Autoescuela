CREATE TABLE IF NOT EXISTS drht_preguntas_preg(
pk_preg_id serial primary key,
preg_enunciado TEXT,
fk_diff_preg_dificultad_id INTEGER references drht_dificultad_diff(pk_diff_id),
preg_image TEXT
);
