CREATE TABLE IF NOT EXISTS drht_usuarios_usus(
pk_usus_id serial primary key,
usus_nombre TEXT,
usus_email TEXT unique,
usus_password TEXT,
usus_fecha_alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
usus_nivel INTEGER default 1);


select * from drht_usuarios_usu;