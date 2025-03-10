CREATE TABLE IF NOT EXISTS drht_respuestas_foro_refe(
pk_refe_id serial primary key,
fk_pofr_refe_post_id INTEGER references drht_post_foro_pofr(pk_pofr_id),
refe_contenido TEXT,
refe_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
refe_likes INTEGER,
refe_dislikes INTEGER
);