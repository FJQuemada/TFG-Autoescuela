CREATE TABLE IF NOT EXISTS drht_tests_usuario_teus(
pk_teus_id serial primary key,
fk_tsts_teus_test_id INTEGER references drht_tests_tsts(pk_tsts_id),
fk_usus_teus_usuario_id INTEGER references drht_usuarios_usus(pk_usus_id),
teus_fecha TIMESTAMP,
teus_aciertos INTEGER,
teus_fallos INTEGER,
teus_tiempo INTEGER
);