CREATE TABLE IF NOT EXISTS drht_tests_tsts(
pk_tsts_id serial primary key,
tsts_nombre TEXT,
fk_diff_tsts_dificultad_id INTEGER references drht_dificultad_diff(pk_diff_id),
tsts_fecha_creacion TIMESTAMP,
tsts_activo BOOLEAN
);