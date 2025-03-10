CREATE TABLE IF NOT EXISTS drht_logros_usuario_lgus(
pk_lgus_id serial primary key,
fk_usus_lgus_usuario_id INTEGER references drht_usuarios_usus(pk_usus_id),
fk_logr_lgus_logro_id INTEGER references drht_logros_logr(pk_logr_id),
lgus_fecha_obtencion TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

