CREATE TABLE IF NOT EXISTS drht_preguntas_test_pgte(
pk_pgte_id serial primary key,
fk_tsts_pgte_test_id INTEGER references drht_tests_tsts(pk_tsts_id),
fk_preg_pgte_pregunta_id INTEGER references drht_preguntas_preg(pk_preg_id)
);