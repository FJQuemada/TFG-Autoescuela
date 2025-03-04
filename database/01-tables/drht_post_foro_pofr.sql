CREATE TABLE IF NOT EXISTS drht_post_foro_pofr(
pk_pofr_id serial primary key,
fk_usus_pofr_usuario_id INTEGER references drht_usuarios_usus(pk_usus_id),
pofr_titulo TEXT,
pofr_contenido TEXT,
pofr_fecha TIMESTAMP,
pofr_likes INTEGER,
pofr_dislikes INTEGER
);