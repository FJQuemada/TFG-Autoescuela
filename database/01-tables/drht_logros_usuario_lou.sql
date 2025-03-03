CREATE TABLE drht_logros_usuario_lou(
pk_lou_id serial primary key,
fk_usu_lou_usuario_id INTEGER references drht_usuarios_usu(pk_usu_id),
fk_lgr_lou_logro_id INTEGER references drht_logros_lgr(pk_lgr_id),
lou_fecha_obtencion TIMESTAMP);

select * from drht_logros_usuario_lou;