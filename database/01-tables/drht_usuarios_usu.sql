CREATE TABLE drht_usuarios_usu(
pk_usu_id serial primary key,
usu_nombre TEXT,
usu_email TEXT unique,
usu_password TEXT,
usu_fecha_alta TIMESTAMP,
usu_nivel INTEGER default 1);


select * from drht_usuarios_usu;