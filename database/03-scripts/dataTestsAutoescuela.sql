-- Primero, elimina los datos de la tabla que *hace referencia* a la otra
DELETE FROM drht_preguntas_test_pgte;

-- Segundo, elimina los tests que halla;
TRUNCATE TABLE drht_tests_tsts RESTART IDENTITY CASCADE;

-- Luego, trunca la tabla referenciada y reinicia su identidad
TRUNCATE TABLE drht_preguntas_preg RESTART IDENTITY CASCADE;

-- Finalmente, trunca la tabla original y reinicia su identidad
TRUNCATE TABLE drht_preguntas_test_pgte RESTART IDENTITY CASCADE;

-- Primero, elimina los datos de la tabla que *hace referencia* a la otra
DELETE FROM drht_respuestas_resp;

-- Finalmente, trunca la tabla original y reinicia su identidad
TRUNCATE TABLE drht_respuestas_resp RESTART IDENTITY CASCADE;


-- Eliminar datos de la tabla logros_usuarios
DELETE FROM drht_logros_usuario_lgus;

-- Truncar la tabla logros_usuarios y reiniciar su identidad
TRUNCATE TABLE drht_logros_usuario_lgus RESTART IDENTITY CASCADE;

-- Eliminar datos de la tabla respuestas del foro
DELETE FROM drht_respuestas_foro_refe;

-- Truncar la tabla respuestas del foro y reiniciar su identidad
TRUNCATE TABLE drht_respuestas_foro_refe RESTART IDENTITY CASCADE;

-- Eliminar datos de la tabla foro
DELETE FROM drht_post_foro_pofr;

-- Truncar la tabla foro y reiniciar su identidad
TRUNCATE TABLE drht_post_foro_pofr RESTART IDENTITY CASCADE;

-- Eliminar datos de la tabla tests_usuario
DELETE FROM drht_tests_usuario_teus;

-- Truncar la tabla drht_tests_usuario_teus y reiniciar su identidad
TRUNCATE TABLE drht_tests_usuario_teus RESTART IDENTITY CASCADE;

-- Eliminar datos de la tabla usuarios
DELETE FROM drht_usuarios_usus;

-- Truncar la tabla usuarios y reiniciar su identidad
TRUNCATE TABLE drht_usuarios_usus RESTART IDENTITY CASCADE;



/*TESTS*/

[
  {
    "tsts_nombre": "Test Autoescuela 1 - Normas Básicas",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 1
  },
  {
    "tsts_nombre": "Test Autoescuela 2 - Señales de Tráfico",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 2
  },
  {
    "tsts_nombre": "Test Autoescuela 3 - Seguridad Vial",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 3
  },
  {
    "tsts_nombre": "Test Autoescuela 4 - Conducción Nocturna",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 1
  },
  {
    "tsts_nombre": "Test Autoescuela 5 - Situaciones de Riesgo",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 2
  },
  {
    "tsts_nombre": "Test Autoescuela 6 - Primeros Auxilios",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 3
  },
  {
    "tsts_nombre": "Test Autoescuela 7 - Mecánica Básica",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 1
  }
]

/*PREGUNTAS*/

[
  {
    "preg_enunciado": "¿Cuál es la velocidad máxima permitida en una vía urbana?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué significa una señal de stop?",
    "preg_image": "/imagenesPreguntas/senialStop.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuándo se debe usar el intermitente izquierdo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué debe hacer un conductor ante un semáforo en rojo?",
    "preg_image": "/imagenesPreguntas/semaforoRojo.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué indica una línea continua en la carretera?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Quién tiene prioridad en una rotonda?",
    "preg_image": "/imagenesPreguntas/rotonda.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cómo se debe señalizar un cambio de dirección?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué significa una señal de ceda el paso?",
    "preg_image": "/imagenesPreguntas/cedaElPaso.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuándo está permitido adelantar a otro vehículo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué distancia mínima se debe guardar al adelantar a un ciclista?",
    "preg_image": "/imagenesPreguntas/ciclistas.jpg",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál es el límite máximo de alcoholemia permitido para conductores noveles?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué debe hacer el conductor en una intersección sin señalización?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué indica una señal de peligro por curvas?",
    "preg_image": "/imagenesPreguntas/peligroCurvas.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué hacer si un vehículo de emergencia se acerca con luces y sirena encendidas?",
    "preg_image": "/imagenesPreguntas/vehiculoEmergencia.jpg",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué es un paso de peatones?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál es la señal que indica prohibido el paso a vehículos de motor?",
    "preg_image": "/imagenesPreguntas/prohibidoElPaso.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué se debe hacer ante un accidente de tráfico sin heridos?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿En qué casos está permitido estacionar en doble fila?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué significa una señal de fin de limitación de velocidad?",
    "preg_image": "/imagenesPreguntas/finLimitacion.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cómo debe colocarse el cinturón de seguridad?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué indica una señal de zona escolar?",
    "preg_image": "/imagenesPreguntas/señalNiños.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué debe hacer el conductor si ve una señal de obras en la vía?",
    "preg_image": "/señal_obras.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál es la señal que indica prioridad sobre los vehículos que circulan por la vía transversal?",
    "preg_image": "/imagenesPreguntas/prioridadTransversal.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué debe hacer un conductor si sufre un fallo en los frenos?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál es la señal que indica paso prohibido a vehículos pesados?",
    "preg_image": "/imagenesPreguntas/vehiculosPesados.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué se debe hacer si un vehículo se detiene delante de un paso de peatones?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué indica una señal de prioridad en un paso estrecho?",
    "preg_image": "/prioridad_paso_estrecho.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cuándo está permitido utilizar el claxon en ciudad?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál es el significado de una señal de prohibido girar a la izquierda?",
    "preg_image": "/imagenesPreguntas/prohibidoGirarIzquierda.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué se debe hacer en un cruce sin semáforo y sin señalización de prioridad?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué indica una señal de límite de peso para vehículos?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cuál es la distancia mínima para encender las luces antiniebla traseras?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué debe hacer el conductor si ve una señal de peligro por obras?",
    "preg_image": "/imagenesPreguntas/peligroObras.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cómo debe reaccionar el conductor ante un paso a nivel sin barreras?",
    "preg_image": "/imagenesPreguntas/pasoNivelSinBarrera.jpg",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué indica una señal de prohibido estacionar?",
    "preg_image": "/imagenesPreguntas/prohibidoEstacionar.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿En qué situaciones está permitido usar el teléfono móvil conduciendo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué indica una señal de sentido obligatorio a la derecha?",
    "preg_image": "/imagenesPreguntas/sentidoDerecha.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cómo debe colocarse el triángulo de emergencia en una parada imprevista?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué significa una luz amarilla intermitente en un semáforo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué debe hacer un conductor que circula por autopista y se encuentra un vehículo detenido en el arcén?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál es la señal que indica un cruce con prioridad?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué efectos tiene el consumo de alcohol en la conducción?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué debe hacer el conductor en caso de niebla densa?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué indica una señal de prioridad a la derecha?",
    "preg_image": "/imagenesPreguntas/interseccionPrioridadDerecha.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué documentos debe llevar siempre el conductor?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cómo debe actuar ante una señal de fin de autopista?",
    "preg_image": "/imagenesPreguntas/finAutopista.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué indica una señal de obligación de detenerse para inspección policial?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál es la velocidad máxima permitida en autopista para turismos?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué debe hacer el conductor al aproximarse a un paso de peatones con peatones esperando para cruzar?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué indica una señal de carril reversible?",
    "preg_image": "/imagenesPreguntas/carrilReversible.jpg",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuándo está permitido conducir con luces largas?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué debe hacer si un vehículo de gran tamaño ocupa todo el carril contrario en una vía estrecha?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué indica una señal de prohibido girar a la derecha?",
    "preg_image": "/imagenesPreguntas/prohibidoGirarDerecha.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué acciones se deben tomar en caso de aquaplaning?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué indica una señal de carril para vehículos lentos?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué precauciones debe tomar el conductor al circular cerca de un colegio?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué significa una señal de prohibido el paso a peatones?",
    "preg_image": "/imagenesPreguntas/prohibidoPasoPeatones.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cómo debe actuar un conductor ante un autobús escolar detenido?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué debe hacer el conductor si sufre una avería en la carretera?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál es la señal que indica una curva peligrosa a la derecha?",
    "preg_image": "/imagenesPreguntas/curvaPeligrosaDerecha.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué distancia de seguridad se recomienda mantener en autopista?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué indica una señal de límite de altura para vehículos?",
    "preg_image": "/imagenesPreguntas/limiteAltura.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cuándo debe utilizar el conductor las luces antiniebla delanteras?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué acciones están prohibidas en un túnel?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué indica una señal de zona de carga y descarga?",
    "preg_image": "/imagenesPreguntas/cargaDescarga.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué debe hacer el conductor ante una señal de paso de peatones sin semáforo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál es la señal que indica que se aproxima un paso a nivel con barreras?",
    "preg_image": "/imagenesPreguntas/pasoNivelBarrera.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué significa una señal de velocidad mínima obligatoria?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cómo debe actuar el conductor si se encuentra con una señal de prioridad en sentido contrario?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué significa una señal de prohibido el paso a bicicletas?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuándo está permitido utilizar las luces de emergencia?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },{
    "preg_enunciado": "¿Está permitido circular con un vehículo cuyas placas de matrícula presentan obstáculos que impiden o dificultan su lectura e identificación?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "Respecto al uso del cinturón de seguridad, como norma general, el ocupante de un turismo distinto del conductor está obligado a...",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "En vías interurbanas con tres carriles para el mismo sentido, ¿le está permitido circular por el carril izquierdo a un turismo con remolque?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "El conductor de este vehículo está indicando que va a...",
    "preg_image": "/imagenesPreguntas/intermitenteDerecha.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "Cuando se adelante a vehículos de tracción animal, fuera de poblado, la separación lateral...",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué alumbrado deberá dejar encendido, como norma general, el conductor de un vehículo inmovilizado entre la puesta y la salida del sol en el arcén de una travesía insuficientemente iluminada?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿De qué peligro advierte esta señal?",
    "preg_image": "/imagenesPreguntas/pasoNivelSinBarrera.jpg",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "Esta señal, ¿prohíbe proseguir la marcha si no dispone de cadenas para nieve?",
    "preg_image": "/imagenesPreguntas/neumaticoNieve.jpg",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué alteración provoca con mayor frecuencia el consumo de alcohol en el comportamiento del conductor?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué indica esta señal situada en la parte posterior de un vehículo?",
    "preg_image": "/imagenesPreguntas/cargaSobresaliente.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "Si ha dormido mal o no ha dormido lo suficiente debe tener en cuenta que...",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Con qué dos factores suelen relacionarse muchos de los accidentes más graves que sufren los jóvenes conductores?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál de las siguientes circunstancias hace que aumente el consumo de combustible?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál de las siguientes razones puede explicar que el vehículo sea el factor de riesgo que aparece en un grado menor como causa principal de los accidentes de tráfico?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "Para mantener la seguridad, ¿qué elementos se deben revisar periódicamente y con mayor frecuencia que el resto de componentes del vehículo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué distancia mínima debe mantener un vehículo respecto al vehículo que circula delante en condiciones normales?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué documento debe llevar siempre el conductor cuando conduce un vehículo a motor?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Está permitido estacionar en zonas reservadas para personas con discapacidad si no se dispone del correspondiente permiso?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué significa una señal de tráfico con fondo azul y una letra blanca 'P'?",
    "preg_image": "/imagenesPreguntas/Pazul.jpg",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál es la velocidad máxima permitida en una vía urbana para turismos, salvo señalización específica?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿En qué situaciones se recomienda utilizar las luces de emergencia?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué debe hacer un conductor ante un semáforo en ámbar intermitente?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué precauciones debe tomar un conductor al aproximarse a un paso de peatones sin semáforo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Cuál es la principal causa de accidentes por fatiga al volante?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Qué elementos debe revisar un conductor antes de iniciar un viaje largo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué se debe hacer si un vehículo comienza a derrapar en una curva?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  },
  {
    "preg_enunciado": "¿Cuál es el significado de una señal triangular con borde rojo y fondo blanco?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuándo está permitido usar el teléfono móvil mientras se conduce?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 2
  },
  {
    "preg_enunciado": "¿Qué debe hacer un conductor ante un accidente de tráfico con heridos?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 3
  }
]


/*RESPUESTAS*/

[
  
  {"resp_contenido": "80 km/h", "fk_preg_resp_pregunta": 1, "resp_correcta": false},
  {"resp_contenido": "30 km/h", "fk_preg_resp_pregunta": 1, "resp_correcta": false},
  {"resp_contenido": "50 km/h", "fk_preg_resp_pregunta": 1, "resp_correcta": true},

  {"resp_contenido": "Reducir la velocidad y continuar", "fk_preg_resp_pregunta": 2, "resp_correcta": false},
  {"resp_contenido": "Ceder el paso y detenerse completamente", "fk_preg_resp_pregunta": 2, "resp_correcta": true},
  {"resp_contenido": "Acelerar para pasar rápido", "fk_preg_resp_pregunta": 2, "resp_correcta": false},

  {"resp_contenido": "Al estacionar el vehículo", "fk_preg_resp_pregunta": 3, "resp_correcta": false},
  {"resp_contenido": "Solo en autopistas", "fk_preg_resp_pregunta": 3, "resp_correcta": false},
  {"resp_contenido": "Antes de girar a la izquierda", "fk_preg_resp_pregunta": 3, "resp_correcta": true},

  {"resp_contenido": "Detenerse completamente y esperar", "fk_preg_resp_pregunta": 4, "resp_correcta": true},
  {"resp_contenido": "Reducir velocidad y pasar con cuidado", "fk_preg_resp_pregunta": 4, "resp_correcta": false},
  {"resp_contenido": "Acelerar para evitar el atasco", "fk_preg_resp_pregunta": 4, "resp_correcta": false},

  {"resp_contenido": "Prohibido adelantar o cambiar de carril", "fk_preg_resp_pregunta": 5, "resp_correcta": true},
  {"resp_contenido": "Se puede adelantar con precaución", "fk_preg_resp_pregunta": 5, "resp_correcta": false},
  {"resp_contenido": "Zona de estacionamiento permitido", "fk_preg_resp_pregunta": 5, "resp_correcta": false},

  {"resp_contenido": "Los vehículos que ya están dentro de la rotonda", "fk_preg_resp_pregunta": 6, "resp_correcta": true},
  {"resp_contenido": "Los que llegan a la rotonda", "fk_preg_resp_pregunta": 6, "resp_correcta": false},
  {"resp_contenido": "Los peatones que cruzan", "fk_preg_resp_pregunta": 6, "resp_correcta": false},


  {"resp_contenido": "Tocar el claxon antes de girar", "fk_preg_resp_pregunta": 7, "resp_correcta": false},
    {"resp_contenido": "Usar el intermitente para indicar el giro", "fk_preg_resp_pregunta": 7, "resp_correcta": true},
  {"resp_contenido": "Encender las luces largas", "fk_preg_resp_pregunta": 7, "resp_correcta": false},


  {"resp_contenido": "Detenerse siempre, aunque no haya tráfico", "fk_preg_resp_pregunta": 8, "resp_correcta": false},
    {"resp_contenido": "Reducir la velocidad y ceder el paso si es necesario", "fk_preg_resp_pregunta": 8, "resp_correcta": true},
  {"resp_contenido": "Pasar sin detenerse", "fk_preg_resp_pregunta": 8, "resp_correcta": false},


  {"resp_contenido": "En cualquier momento sin precaución", "fk_preg_resp_pregunta": 9, "resp_correcta": false},
  {"resp_contenido": "Nunca está permitido adelantar", "fk_preg_resp_pregunta": 9, "resp_correcta": false},
    {"resp_contenido": "Solo cuando la maniobra sea segura y permitida", "fk_preg_resp_pregunta": 9, "resp_correcta": true},

  {"resp_contenido": "Como mínimo 1,5 metros de separación", "fk_preg_resp_pregunta": 10, "resp_correcta": true},
  {"resp_contenido": "No hay distancia mínima establecida", "fk_preg_resp_pregunta": 10, "resp_correcta": false},
  {"resp_contenido": "A menos de 1 metro está permitido", "fk_preg_resp_pregunta": 10, "resp_correcta": false},

  {"resp_contenido": "0,3 gramos por litro", "fk_preg_resp_pregunta": 11, "resp_correcta": true},
  {"resp_contenido": "0,5 gramos por litro", "fk_preg_resp_pregunta": 11, "resp_correcta": false},
  {"resp_contenido": "0,8 gramos por litro", "fk_preg_resp_pregunta": 11, "resp_correcta": false},

  {"resp_contenido": "Continuar sin detenerse", "fk_preg_resp_pregunta": 12, "resp_correcta": false},
  {"resp_contenido": "Detenerse siempre", "fk_preg_resp_pregunta": 12, "resp_correcta": false},
  {"resp_contenido": "Ceder el paso al vehículo de la derecha", "fk_preg_resp_pregunta": 12, "resp_correcta": true},

  {"resp_contenido": "Prohibido girar en curvas", "fk_preg_resp_pregunta": 13, "resp_correcta": false},
  {"resp_contenido": "Velocidad máxima en curva 30 km/h", "fk_preg_resp_pregunta": 13, "resp_correcta": false},
  {"resp_contenido": "Precaución por curvas peligrosas adelante", "fk_preg_resp_pregunta": 13, "resp_correcta": true},

  {"resp_contenido": "Continuar sin modificar la marcha", "fk_preg_resp_pregunta": 14, "resp_correcta": false},
  {"resp_contenido": "Apartarse y facilitar el paso", "fk_preg_resp_pregunta": 14, "resp_correcta": true},
  {"resp_contenido": "Acelerar para despejar la vía", "fk_preg_resp_pregunta": 14, "resp_correcta": false},

  {"resp_contenido": "Zona para estacionar bicicletas", "fk_preg_resp_pregunta": 15, "resp_correcta": false},
  {"resp_contenido": "Zona exclusiva para vehículos", "fk_preg_resp_pregunta": 15, "resp_correcta": false},
  {"resp_contenido": "Zona para que los peatones crucen la calle", "fk_preg_resp_pregunta": 15, "resp_correcta": true},

  {"resp_contenido": "Señal roja con coche tachado", "fk_preg_resp_pregunta": 16, "resp_correcta": true},
  {"resp_contenido": "Señal azul con coche permitido", "fk_preg_resp_pregunta": 16, "resp_correcta": false},
  {"resp_contenido": "Señal amarilla de precaución", "fk_preg_resp_pregunta": 16, "resp_correcta": false},

  {"resp_contenido": "Abandonar el lugar rápidamente", "fk_preg_resp_pregunta": 17, "resp_correcta": false},
  {"resp_contenido": "Señalizar el lugar y avisar a la autoridad", "fk_preg_resp_pregunta": 17, "resp_correcta": true},
  {"resp_contenido": "Ignorar el accidente y continuar", "fk_preg_resp_pregunta": 17, "resp_correcta": false},

  {"resp_contenido": "Está permitido siempre", "fk_preg_resp_pregunta": 18, "resp_correcta": false},
  {"resp_contenido": "Nunca está permitido", "fk_preg_resp_pregunta": 18, "resp_correcta": false},
  {"resp_contenido": "Solo para carga y descarga breve", "fk_preg_resp_pregunta": 18, "resp_correcta": true},

  {"resp_contenido": "Finaliza la restricción de velocidad máxima", "fk_preg_resp_pregunta": 19, "resp_correcta": true},
  {"resp_contenido": "Comienza una zona escolar", "fk_preg_resp_pregunta": 19, "resp_correcta": false},
  {"resp_contenido": "Zona de obras adelante", "fk_preg_resp_pregunta": 19, "resp_correcta": false},

  {"resp_contenido": "Debe ir ajustado sobre la cadera y hombro", "fk_preg_resp_pregunta": 20, "resp_correcta": true},
  {"resp_contenido": "Solo sobre la cintura", "fk_preg_resp_pregunta": 20, "resp_correcta": false},
  {"resp_contenido": "No es obligatorio usarlo en ciudad", "fk_preg_resp_pregunta": 20, "resp_correcta": false},

   {"resp_contenido": "Zona con presencia frecuente de niños y límite de velocidad reducido", "fk_preg_resp_pregunta": 21, "resp_correcta": true},
  {"resp_contenido": "Zona exclusiva para peatones", "fk_preg_resp_pregunta": 21, "resp_correcta": false},
  {"resp_contenido": "Zona de estacionamiento para escolares", "fk_preg_resp_pregunta": 21, "resp_correcta": false},

  {"resp_contenido": "Acelerar para evitar retrasos", "fk_preg_resp_pregunta": 22, "resp_correcta": false},
  {"resp_contenido": "Reducir la velocidad y extremar la precaución", "fk_preg_resp_pregunta": 22, "resp_correcta": true},
  {"resp_contenido": "Ignorar la señal y continuar", "fk_preg_resp_pregunta": 22, "resp_correcta": false},

  {"resp_contenido": "Señal que indica ceda el paso", "fk_preg_resp_pregunta": 23, "resp_correcta": false},
  {"resp_contenido": "Señal que indica prioridad en la vía principal", "fk_preg_resp_pregunta": 23, "resp_correcta": true},
  {"resp_contenido": "Señal de stop", "fk_preg_resp_pregunta": 23, "resp_correcta": false},

  {"resp_contenido": "Seguir conduciendo normalmente", "fk_preg_resp_pregunta": 24, "resp_correcta": false},
  {"resp_contenido": "Accionar el freno de emergencia y usar el freno motor", "fk_preg_resp_pregunta": 24, "resp_correcta": true},
  {"resp_contenido": "Apagar el motor inmediatamente", "fk_preg_resp_pregunta": 24, "resp_correcta": false},

  {"resp_contenido": "Señal que permite el paso solo a vehículos pesados", "fk_preg_resp_pregunta": 25, "resp_correcta": false},
  {"resp_contenido": "Señal que prohíbe el paso a camiones y vehículos pesados", "fk_preg_resp_pregunta": 25, "resp_correcta": true},
  {"resp_contenido": "Señal de estacionamiento para vehículos pesados", "fk_preg_resp_pregunta": 25, "resp_correcta": false},

  {"resp_contenido": "Detenerse siempre delante del paso de peatones", "fk_preg_resp_pregunta": 26, "resp_correcta": false},
  {"resp_contenido": "Ignorar a los peatones si hay semáforo en verde", "fk_preg_resp_pregunta": 26, "resp_correcta": false},
  {"resp_contenido": "Permitir el paso a los peatones y no detenerse encima del paso", "fk_preg_resp_pregunta": 26, "resp_correcta": true},

  {"resp_contenido": "Prioridad para el vehículo que entra al paso estrecho", "fk_preg_resp_pregunta": 27, "resp_correcta": false},
  {"resp_contenido": "No hay prioridad, ambos deben detenerse", "fk_preg_resp_pregunta": 27, "resp_correcta": false},
  {"resp_contenido": "Prioridad para el vehículo que circula en sentido contrario", "fk_preg_resp_pregunta": 27, "resp_correcta": true},

  {"resp_contenido": "Para saludar a otros conductores", "fk_preg_resp_pregunta": 28, "resp_correcta": false},
  {"resp_contenido": "Siempre que se circule en ciudad", "fk_preg_resp_pregunta": 28, "resp_correcta": false},
  {"resp_contenido": "Solo en casos de emergencia para evitar accidentes", "fk_preg_resp_pregunta": 28, "resp_correcta": true},

  {"resp_contenido": "Está prohibido girar a la izquierda en esa intersección", "fk_preg_resp_pregunta": 29, "resp_correcta": true},
  {"resp_contenido": "Se permite girar a la izquierda con precaución", "fk_preg_resp_pregunta": 29, "resp_correcta": false},
  {"resp_contenido": "Obligatorio girar a la izquierda", "fk_preg_resp_pregunta": 29, "resp_correcta": false},

  {"resp_contenido": "Ceder el paso a vehículos que vienen por la derecha", "fk_preg_resp_pregunta": 30, "resp_correcta": true},
  {"resp_contenido": "Continuar sin detenerse", "fk_preg_resp_pregunta": 30, "resp_correcta": false},
  {"resp_contenido": "Detenerse siempre", "fk_preg_resp_pregunta": 30, "resp_correcta": false},

  {"resp_contenido": "Indica el límite de velocidad para vehículos pesados", "fk_preg_resp_pregunta": 31, "resp_correcta": false},
  {"resp_contenido": "Indica el peso máximo permitido para vehículos en esa vía", "fk_preg_resp_pregunta": 31, "resp_correcta": true},
  {"resp_contenido": "Señal para zonas de carga y descarga", "fk_preg_resp_pregunta": 31, "resp_correcta": false},

  {"resp_contenido": "Siempre que haya lluvia", "fk_preg_resp_pregunta": 32, "resp_correcta": false},
  {"resp_contenido": "Cuando la visibilidad es inferior a 50 metros", "fk_preg_resp_pregunta": 32, "resp_correcta": true},
  {"resp_contenido": "Al circular por autopista", "fk_preg_resp_pregunta": 32, "resp_correcta": false},

  {"resp_contenido": "Acelerar para pasar rápido", "fk_preg_resp_pregunta": 33, "resp_correcta": false},
  {"resp_contenido": "Reducir la velocidad y extremar la precaución", "fk_preg_resp_pregunta": 33, "resp_correcta": true},
  {"resp_contenido": "Ignorar la señal y continuar", "fk_preg_resp_pregunta": 33, "resp_correcta": false},

  {"resp_contenido": "Acelerar para cruzar rápido", "fk_preg_resp_pregunta": 34, "resp_correcta": false},
  {"resp_contenido": "Parar, mirar en ambas direcciones y cruzar solo si es seguro", "fk_preg_resp_pregunta": 34, "resp_correcta": true},
  {"resp_contenido": "Ignorar el paso a nivel", "fk_preg_resp_pregunta": 34, "resp_correcta": false},

  {"resp_contenido": "Prohíbe el paso de vehículos", "fk_preg_resp_pregunta": 35, "resp_correcta": false},
  {"resp_contenido": "Prohíbe estacionar en la zona indicada", "fk_preg_resp_pregunta": 35, "resp_correcta": true},
  {"resp_contenido": "Indica zona de estacionamiento permitido", "fk_preg_resp_pregunta": 35, "resp_correcta": false},

  {"resp_contenido": "Solo con dispositivos manos libres", "fk_preg_resp_pregunta": 36, "resp_correcta": true},
  {"resp_contenido": "En cualquier situación", "fk_preg_resp_pregunta": 36, "resp_correcta": false},
  {"resp_contenido": "Nunca está permitido", "fk_preg_resp_pregunta": 36, "resp_correcta": false},

  {"resp_contenido": "Obligación de girar a la derecha en el próximo cruce", "fk_preg_resp_pregunta": 37, "resp_correcta": true},
  {"resp_contenido": "Prohibición de girar a la derecha", "fk_preg_resp_pregunta": 37, "resp_correcta": false},
  {"resp_contenido": "Zona de estacionamiento a la derecha", "fk_preg_resp_pregunta": 37, "resp_correcta": false},

  {"resp_contenido": "Colocarlo a 50 metros detrás del vehículo detenido", "fk_preg_resp_pregunta": 38, "resp_correcta": true},
  {"resp_contenido": "Colocarlo justo al lado del vehículo", "fk_preg_resp_pregunta": 38, "resp_correcta": false},
  {"resp_contenido": "No es necesario colocar triángulo", "fk_preg_resp_pregunta": 38, "resp_correcta": false},

  {"resp_contenido": "Parar obligatoriamente", "fk_preg_resp_pregunta": 39, "resp_correcta": false},
  {"resp_contenido": "Acelerar para pasar rápido", "fk_preg_resp_pregunta": 39, "resp_correcta": false},
  {"resp_contenido": "Precaución, se puede pasar pero con cuidado", "fk_preg_resp_pregunta": 39, "resp_correcta": true},

  {"resp_contenido": "Reducir velocidad y cambiar de carril para alejarse del arcén", "fk_preg_resp_pregunta": 40, "resp_correcta": true},
  {"resp_contenido": "Pasar junto al vehículo sin modificar la velocidad", "fk_preg_resp_pregunta": 40, "resp_correcta": false},
  {"resp_contenido": "Tocar el claxon para avisar", "fk_preg_resp_pregunta": 40, "resp_correcta": false},

  {"resp_contenido": "Indica que en el cruce tienes prioridad de paso sobre otros vehículos", "fk_preg_resp_pregunta": 41, "resp_correcta": true},
  {"resp_contenido": "Obliga a detenerse antes de cruzar", "fk_preg_resp_pregunta": 41, "resp_correcta": false},
  {"resp_contenido": "Prohíbe girar en el cruce", "fk_preg_resp_pregunta": 41, "resp_correcta": false},

  {"resp_contenido": "Mejora la concentración y reflejos", "fk_preg_resp_pregunta": 42, "resp_correcta": false},
  {"resp_contenido": "Disminuye la capacidad de reacción y percepción", "fk_preg_resp_pregunta": 42, "resp_correcta": true},
  {"resp_contenido": "No afecta a la conducción", "fk_preg_resp_pregunta": 42, "resp_correcta": false},

  {"resp_contenido": "Acelerar para evitar la niebla", "fk_preg_resp_pregunta": 43, "resp_correcta": false},
  {"resp_contenido": "Apagar todas las luces para no deslumbrar", "fk_preg_resp_pregunta": 43, "resp_correcta": false},
  {"resp_contenido": "Encender luces antiniebla y reducir velocidad", "fk_preg_resp_pregunta": 43, "resp_correcta": true},

  {"resp_contenido": "Prohíbe girar a la derecha", "fk_preg_resp_pregunta": 44, "resp_correcta": false},
  {"resp_contenido": "Indica que debes ceder el paso a vehículos que vienen por la derecha", "fk_preg_resp_pregunta": 44, "resp_correcta": true},
  {"resp_contenido": "Obliga a detenerse antes de seguir", "fk_preg_resp_pregunta": 44, "resp_correcta": false},

  {"resp_contenido": "Solo el permiso de conducir", "fk_preg_resp_pregunta": 45, "resp_correcta": false},
  {"resp_contenido": "Solo la documentación del vehículo", "fk_preg_resp_pregunta": 45, "resp_correcta": false},
  {"resp_contenido": "Permiso de conducir, documentación del vehículo y seguro obligatorio", "fk_preg_resp_pregunta": 45, "resp_correcta": true},

  {"resp_contenido": "Acelerar para salir rápido", "fk_preg_resp_pregunta": 46, "resp_correcta": false},
  {"resp_contenido": "Reducir velocidad y prepararse para salir de la autopista", "fk_preg_resp_pregunta": 46, "resp_correcta": true},
  {"resp_contenido": "Ignorar la señal y continuar", "fk_preg_resp_pregunta": 46, "resp_correcta": false},

  {"resp_contenido": "Obliga a detenerse para control policial", "fk_preg_resp_pregunta": 47, "resp_correcta": true},
  {"resp_contenido": "Indica zona de paso libre", "fk_preg_resp_pregunta": 47, "resp_correcta": false},
  {"resp_contenido": "Prohíbe el paso a vehículos", "fk_preg_resp_pregunta": 47, "resp_correcta": false},

  {"resp_contenido": "120 km/h", "fk_preg_resp_pregunta": 48, "resp_correcta": true},
  {"resp_contenido": "90 km/h", "fk_preg_resp_pregunta": 48, "resp_correcta": false},
  {"resp_contenido": "100 km/h", "fk_preg_resp_pregunta": 48, "resp_correcta": false},

  {"resp_contenido": "Pasar sin detenerse", "fk_preg_resp_pregunta": 49, "resp_correcta": false},
  {"resp_contenido": "Detenerse y ceder el paso a peatones", "fk_preg_resp_pregunta": 49, "resp_correcta": true},
  {"resp_contenido": "Acelerar para evitar que crucen", "fk_preg_resp_pregunta": 49, "resp_correcta": false},

  {"resp_contenido": "Indica que el sentido del carril puede cambiar según la señalización", "fk_preg_resp_pregunta": 50, "resp_correcta": true},
  {"resp_contenido": "Prohíbe circular por ese carril", "fk_preg_resp_pregunta": 50, "resp_correcta": false},
  {"resp_contenido": "Indica carril exclusivo para bicicletas", "fk_preg_resp_pregunta": 50, "resp_correcta": false},

   {
    "resp_contenido": "Cuando no se deslumbra a otros usuarios y fuera de poblado",
    "fk_preg_resp_pregunta": 51,
    "resp_correcta": true
  },
  {
    "resp_contenido": "En todo momento, incluso en ciudad",
    "fk_preg_resp_pregunta": 51,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Solo durante el día y en autopistas",
    "fk_preg_resp_pregunta": 51,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Acelerar para pasar antes que el otro vehículo",
    "fk_preg_resp_pregunta": 52,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Reducir la velocidad y detenerse si es necesario para ceder el paso",
    "fk_preg_resp_pregunta": 52,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Permanecer en el centro de la calzada",
    "fk_preg_resp_pregunta": 52,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Prohíbe girar a la derecha en la próxima intersección",
    "fk_preg_resp_pregunta": 53,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Obliga a girar a la derecha",
    "fk_preg_resp_pregunta": 53,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Prohíbe seguir recto",
    "fk_preg_resp_pregunta": 53,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Soltar el acelerador suavemente y sujetar el volante con firmeza",
    "fk_preg_resp_pregunta": 54,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Frenar bruscamente para detener el coche",
    "fk_preg_resp_pregunta": 54,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Acelerar para recuperar el control",
    "fk_preg_resp_pregunta": 54,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Indica un carril adicional habilitado para vehículos lentos",
    "fk_preg_resp_pregunta": 55,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Obliga a todos los vehículos a circular lentamente",
    "fk_preg_resp_pregunta": 55,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Prohíbe la circulación de vehículos pesados",
    "fk_preg_resp_pregunta": 55,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Reducir la velocidad y estar atento a la posible presencia de niños",
    "fk_preg_resp_pregunta": 56,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Aumentar la velocidad para pasar rápido",
    "fk_preg_resp_pregunta": 56,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Circular con normalidad sin necesidad de precauciones especiales",
    "fk_preg_resp_pregunta": 56,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Prohíbe la entrada a peatones en esa vía",
    "fk_preg_resp_pregunta": 57,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Obliga a los peatones a cruzar por ese punto",
    "fk_preg_resp_pregunta": 57,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Señaliza un paso de peatones",
    "fk_preg_resp_pregunta": 57,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Detenerse si es necesario y extremar la precaución al rebasarlo",
    "fk_preg_resp_pregunta": 58,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Aumentar la velocidad para pasar antes que los niños crucen",
    "fk_preg_resp_pregunta": 58,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Ignorar el autobús si no hay agentes de tráfico",
    "fk_preg_resp_pregunta": 58,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Señalizar la avería, encender luces de emergencia y salir con chaleco reflectante",
    "fk_preg_resp_pregunta": 59,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Esperar dentro del vehículo sin señalizar",
    "fk_preg_resp_pregunta": 59,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Intentar reparar el coche en el arcén sin señalización",
    "fk_preg_resp_pregunta": 59,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Indica que hay una curva peligrosa hacia la derecha",
    "fk_preg_resp_pregunta": 60,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Indica una calle de sentido único",
    "fk_preg_resp_pregunta": 60,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Prohíbe circular a más de 40 km/h",
    "fk_preg_resp_pregunta": 60,
    "resp_correcta": false
  },

  {
    "resp_contenido": "La suficiente para detenerse sin colisionar si el vehículo delantero frena bruscamente",
    "fk_preg_resp_pregunta": 61,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Unos 10 metros en cualquier caso",
    "fk_preg_resp_pregunta": 61,
    "resp_correcta": false
  },
  {
    "resp_contenido": "No es necesario mantener distancia si se circula por el carril izquierdo",
    "fk_preg_resp_pregunta": 61,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Prohíbe el paso a vehículos que superen la altura indicada",
    "fk_preg_resp_pregunta": 62,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Obliga a circular a una altura mínima",
    "fk_preg_resp_pregunta": 62,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Indica un tramo con badenes o resaltos",
    "fk_preg_resp_pregunta": 62,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Solamente en ciudad, por la noche",
    "fk_preg_resp_pregunta": 63,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Siempre que se circule por autovía",
    "fk_preg_resp_pregunta": 63,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Cuando hay niebla densa, lluvia intensa o nevada",
    "fk_preg_resp_pregunta": 63,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Se permite hacer giros en U si no hay tráfico",
    "fk_preg_resp_pregunta": 64,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Se puede detener el vehículo para hacer una llamada",
    "fk_preg_resp_pregunta": 64,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Dar marcha atrás, detenerse y cambiar de sentido están prohibidos",
    "fk_preg_resp_pregunta": 64,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Indica un aparcamiento gratuito",
    "fk_preg_resp_pregunta": 65,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Prohíbe estacionar durante la noche",
    "fk_preg_resp_pregunta": 65,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Indica un espacio reservado para operaciones de carga y descarga",
    "fk_preg_resp_pregunta": 65,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Tocar el claxon para advertir a los peatones",
    "fk_preg_resp_pregunta": 66,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Reducir la velocidad y detenerse si hay peatones cruzando",
    "fk_preg_resp_pregunta": 66,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Pasar rápidamente sin detenerse",
    "fk_preg_resp_pregunta": 66,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Indica la presencia de un túnel",
    "fk_preg_resp_pregunta": 67,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Advierte de un paso a nivel con barreras o semibarreras",
    "fk_preg_resp_pregunta": 67,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Prohíbe el paso a vehículos pesados",
    "fk_preg_resp_pregunta": 67,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Es una recomendación de velocidad mínima",
    "fk_preg_resp_pregunta": 68,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Obliga a circular al menos a la velocidad indicada",
    "fk_preg_resp_pregunta": 68,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Prohíbe circular a la velocidad indicada",
    "fk_preg_resp_pregunta": 68,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Detenerse si se acerca un vehículo en sentido contrario con prioridad",
    "fk_preg_resp_pregunta": 69,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Continuar la marcha sin ceder el paso",
    "fk_preg_resp_pregunta": 69,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Aumentar la velocidad para pasar antes",
    "fk_preg_resp_pregunta": 69,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Prohíbe el paso a bicicletas por esa vía",
    "fk_preg_resp_pregunta": 70,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Indica un carril exclusivo para bicicletas",
    "fk_preg_resp_pregunta": 70,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Permite el paso solo a bicicletas",
    "fk_preg_resp_pregunta": 70,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Para avisar que se va a adelantar",
    "fk_preg_resp_pregunta": 71,
    "resp_correcta": false
  },
  {
    "resp_contenido": "En cualquier situación de tráfico lento",
    "fk_preg_resp_pregunta": 71,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Cuando se sufre una avería o accidente que obliga a detener el vehículo",
    "fk_preg_resp_pregunta": 71,
    "resp_correcta": true
  },
  {
    "resp_contenido": "No, está prohibido circular con matrículas ilegibles",
    "fk_preg_resp_pregunta": 72,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Sí, si el obstáculo es temporal",
    "fk_preg_resp_pregunta": 72,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Sí, en trayectos cortos dentro de poblado",
    "fk_preg_resp_pregunta": 72,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Colocárselo solo en vías interurbanas",
    "fk_preg_resp_pregunta": 73,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Llevarlo abrochado correctamente durante todo el trayecto",
    "fk_preg_resp_pregunta": 73,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Ponérselo solo si el conductor lo indica",
    "fk_preg_resp_pregunta": 73,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Sí, si el carril izquierdo está libre",
    "fk_preg_resp_pregunta": 74,
    "resp_correcta": false
  },
  {
    "resp_contenido": "No, debe circular por el carril derecho o el central",
    "fk_preg_resp_pregunta": 74,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Sí, si circula a velocidad adecuada",
    "fk_preg_resp_pregunta": 74,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Adelantar a otro vehículo",
    "fk_preg_resp_pregunta": 75,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Girar a la derecha",
    "fk_preg_resp_pregunta": 75,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Realizar una parada de emergencia",
    "fk_preg_resp_pregunta": 75,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Bastará con mantener un metro de separación",
    "fk_preg_resp_pregunta": 76,
    "resp_correcta": false
  },
  {
    "resp_contenido": "No se exige una distancia mínima específica",
    "fk_preg_resp_pregunta": 76,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Será de al menos 1,5 metros",
    "fk_preg_resp_pregunta": 76,
    "resp_correcta": true
  },
  {
    "resp_contenido": "El de largo alcance",
    "fk_preg_resp_pregunta": 77,
    "resp_correcta": false
  },
  {
    "resp_contenido": "El intermitente izquierdo",
    "fk_preg_resp_pregunta": 77,
    "resp_correcta": false
  },
  {
    "resp_contenido": "El de posición y, si procede, el de gálibo",
    "fk_preg_resp_pregunta": 77,
    "resp_correcta": true
  },
  {
    "resp_contenido": "De la proximidad de un túnel",
    "fk_preg_resp_pregunta": 78,
    "resp_correcta": false
  },
  {
    "resp_contenido": "De la proximidad de un cambio de rasante",
    "fk_preg_resp_pregunta": 78,
    "resp_correcta": false
  },
  {
    "resp_contenido": "De la proximidad de un paso a nivel sin barreras",
    "fk_preg_resp_pregunta": 78,
    "resp_correcta": true
  },
  {
    "resp_contenido": "No, es solo una señal informativa",
    "fk_preg_resp_pregunta": 79,
    "resp_correcta": false
  },
  {
    "resp_contenido": "No, si se circula a baja velocidad",
    "fk_preg_resp_pregunta": 79,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Sí, cuando la vía esté cubierta de nieve y no se lleven neumáticos especiales",
    "fk_preg_resp_pregunta": 79,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Mejora de la percepción del riesgo",
    "fk_preg_resp_pregunta": 80,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Disminución de la capacidad de atención y aumento de la euforia",
    "fk_preg_resp_pregunta": 80,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Mayor rapidez de reacción",
    "fk_preg_resp_pregunta": 80,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Que es un vehículo prioritario",
    "fk_preg_resp_pregunta": 81,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Que transporta una carga que sobresale por detrás",
    "fk_preg_resp_pregunta": 81,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Que transporta mercancías peligrosas",
    "fk_preg_resp_pregunta": 81,
    "resp_correcta": false
  },
  {
    "resp_contenido": "No tiene repercusión en la conducción",
    "fk_preg_resp_pregunta": 82,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Mejora el nivel de atención y reflejos",
    "fk_preg_resp_pregunta": 82,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Aumenta el riesgo de sufrir somnolencia al volante",
    "fk_preg_resp_pregunta": 82,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Uso del cinturón y exceso de equipaje",
    "fk_preg_resp_pregunta": 83,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Condiciones meteorológicas y tipo de vía",
    "fk_preg_resp_pregunta": 83,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Velocidad excesiva y consumo de alcohol",
    "fk_preg_resp_pregunta": 83,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Revisar periódicamente la presión de los neumáticos",
    "fk_preg_resp_pregunta": 84,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Utilizar marchas largas",
    "fk_preg_resp_pregunta": 84,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Conducir con las ventanillas abiertas",
    "fk_preg_resp_pregunta": 84,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Porque los vehículos actuales no requieren mantenimiento",
    "fk_preg_resp_pregunta": 85,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Porque los avances tecnológicos han mejorado la seguridad de los vehículos",
    "fk_preg_resp_pregunta": 85,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Porque el conductor no influye en la seguridad",
    "fk_preg_resp_pregunta": 85,
    "resp_correcta": false
  },
  {
    "resp_contenido": "La pintura y la tapicería",
    "fk_preg_resp_pregunta": 86,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Los frenos, los neumáticos y el sistema de dirección",
    "fk_preg_resp_pregunta": 86,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Los altavoces y el aire acondicionado",
    "fk_preg_resp_pregunta": 86,
    "resp_correcta": false
  },
  {
    "resp_contenido": "La que le permita detenerse sin colisionar si el vehículo que va delante frena de forma brusca",
    "fk_preg_resp_pregunta": 87,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Dos metros en todo caso",
    "fk_preg_resp_pregunta": 87,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Un metro si se circula por ciudad",
    "fk_preg_resp_pregunta": 87,
    "resp_correcta": false
  },
  {
    "resp_contenido": "El permiso de conducción",
    "fk_preg_resp_pregunta": 88,
    "resp_correcta": true
  },
  {
    "resp_contenido": "La ficha técnica del vehículo",
    "fk_preg_resp_pregunta": 88,
    "resp_correcta": false
  },
  {
    "resp_contenido": "El contrato del seguro obligatorio",
    "fk_preg_resp_pregunta": 88,
    "resp_correcta": false
  },
  {
    "resp_contenido": "No, está prohibido",
    "fk_preg_resp_pregunta": 89,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Sí, si es por un breve periodo de tiempo",
    "fk_preg_resp_pregunta": 89,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Sí, si no hay otras plazas disponibles",
    "fk_preg_resp_pregunta": 89,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Que es una zona reservada a vehículos prioritarios",
    "fk_preg_resp_pregunta": 90,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Que está prohibido el estacionamiento",
    "fk_preg_resp_pregunta": 90,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Que es una zona de estacionamiento permitido",
    "fk_preg_resp_pregunta": 90,
    "resp_correcta": true
  },
  {
    "resp_contenido": "30 km/h",
    "fk_preg_resp_pregunta": 91,
    "resp_correcta": false
  },
  {
    "resp_contenido": "50 km/h",
    "fk_preg_resp_pregunta": 91,
    "resp_correcta": true
  },
  {
    "resp_contenido": "60 km/h",
    "fk_preg_resp_pregunta": 91,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Al estacionar en línea",
    "fk_preg_resp_pregunta": 92,
    "resp_correcta": false
  },
  {
    "resp_contenido": "En caso de avería o accidente para advertir peligro",
    "fk_preg_resp_pregunta": 92,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Cuando se circula por un túnel",
    "fk_preg_resp_pregunta": 92,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Detenerse obligatoriamente",
    "fk_preg_resp_pregunta": 93,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Acelerar rápidamente",
    "fk_preg_resp_pregunta": 93,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Pasar con precaución si la situación lo permite",
    "fk_preg_resp_pregunta": 93,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Reducir la velocidad y estar preparado para detenerse",
    "fk_preg_resp_pregunta": 94,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Pitar para advertir a los peatones",
    "fk_preg_resp_pregunta": 94,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Pasar rápidamente para no obstaculizar el tráfico",
    "fk_preg_resp_pregunta": 94,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Conducir durante muchas horas sin descansar",
    "fk_preg_resp_pregunta": 95,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Usar el aire acondicionado continuamente",
    "fk_preg_resp_pregunta": 95,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Parar cada 4 horas a descansar",
    "fk_preg_resp_pregunta": 95,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Estado de la carrocería y cristales",
    "fk_preg_resp_pregunta": 96,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Niveles de aceite, presión de neumáticos y luces",
    "fk_preg_resp_pregunta": 96,
    "resp_correcta": true
  },
  {
    "resp_contenido": "La limpieza del interior del vehículo",
    "fk_preg_resp_pregunta": 96,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Soltar el acelerador y girar suavemente en la dirección del derrape",
    "fk_preg_resp_pregunta": 97,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Frenar bruscamente",
    "fk_preg_resp_pregunta": 97,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Girar el volante en sentido contrario al derrape",
    "fk_preg_resp_pregunta": 97,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Peligro",
    "fk_preg_resp_pregunta": 98,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Obligación",
    "fk_preg_resp_pregunta": 98,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Prohibición",
    "fk_preg_resp_pregunta": 98,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Cuando se utilice un dispositivo manos libres",
    "fk_preg_resp_pregunta": 99,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Siempre que se conduzca en ciudad",
    "fk_preg_resp_pregunta": 99,
    "resp_correcta": false
  },
  {
    "resp_contenido": "En autopistas y autovías",
    "fk_preg_resp_pregunta": 99,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Proteger, alertar y socorrer",
    "fk_preg_resp_pregunta": 100,
    "resp_correcta": true
  },
  {
    "resp_contenido": "Retirar inmediatamente a los heridos del lugar",
    "fk_preg_resp_pregunta": 100,
    "resp_correcta": false
  },
  {
    "resp_contenido": "Llamar al seguro para que se encargue",
    "fk_preg_resp_pregunta": 100,
    "resp_correcta": false
  }

]



/*Preguntas en tests*/

[
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 20
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 72
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 44
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 62
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 4
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 13
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 15
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 37
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 91
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 35
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 61
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 12
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 76
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 57
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 5
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 1
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 9
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 95
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 94
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 27
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 19
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 40
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 48
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 99
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 84
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 6
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 69
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 43
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 34
  },
  {
    "fk_tsts_pgte_test": 1,
    "fk_preg_pgte_pregunta": 79
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 48
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 23
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 81
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 2
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 89
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 72
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 73
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 32
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 71
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 10
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 47
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 20
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 34
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 9
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 94
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 84
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 79
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 63
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 91
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 46
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 96
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 36
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 25
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 42
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 53
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 19
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 35
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 78
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 85
  },
  {
    "fk_tsts_pgte_test": 2,
    "fk_preg_pgte_pregunta": 83
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 68
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 76
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 4
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 94
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 19
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 90
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 27
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 67
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 11
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 56
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 59
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 10
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 99
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 65
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 9
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 73
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 54
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 69
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 84
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 21
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 81
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 50
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 25
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 48
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 88
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 83
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 60
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 41
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 30
  },
  {
    "fk_tsts_pgte_test": 3,
    "fk_preg_pgte_pregunta": 38
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 43
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 6
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 26
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 17
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 24
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 10
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 98
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 21
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 89
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 41
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 71
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 28
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 44
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 57
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 48
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 94
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 8
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 3
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 82
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 65
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 80
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 88
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 29
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 74
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 68
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 19
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 61
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 23
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 75
  },
  {
    "fk_tsts_pgte_test": 4,
    "fk_preg_pgte_pregunta": 2
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 25
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 29
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 60
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 7
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 92
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 47
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 33
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 5
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 21
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 46
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 1
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 52
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 20
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 11
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 78
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 23
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 6
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 38
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 99
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 79
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 45
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 75
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 48
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 88
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 64
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 53
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 14
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 18
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 13
  },
  {
    "fk_tsts_pgte_test": 5,
    "fk_preg_pgte_pregunta": 40
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 64
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 21
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 34
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 47
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 65
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 28
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 69
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 97
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 80
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 32
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 3
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 4
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 36
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 70
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 12
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 58
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 8
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 59
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 72
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 73
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 60
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 38
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 83
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 74
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 26
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 22
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 82
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 76
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 43
  },
  {
    "fk_tsts_pgte_test": 6,
    "fk_preg_pgte_pregunta": 79
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 54
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 45
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 12
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 3
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 53
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 57
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 58
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 93
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 25
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 73
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 26
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 65
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 2
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 20
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 31
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 17
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 76
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 41
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 30
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 71
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 22
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 59
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 15
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 88
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 34
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 19
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 4
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 50
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 16
  },
  {
    "fk_tsts_pgte_test": 7,
    "fk_preg_pgte_pregunta": 97
  }
]


/*TEST DEBUG*/

[{
    "tsts_nombre": "Test DEBUG - BASICS",
    "tsts_activo": true,
    "fk_diff_tsts_dificultad": 1
  }]

  [
  {
    "preg_enunciado": "¿Cuánto es 2 + 2?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál es la capital de Francia?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué color resulta de mezclar rojo y blanco?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál es el planeta más cercano al Sol?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué se debe hacer al ver una luz roja en un semáforo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué instrumento mide la velocidad del vehículo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Para qué sirve el cinturón de seguridad?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuál es la función del freno de mano?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué indica una señal de stop?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué precaución hay que tomar al adelantar a otro vehículo?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Qué debe hacer si ve una ambulancia con luces y sirena encendidas?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  },
  {
    "preg_enunciado": "¿Cuándo se debe usar el intermitente?",
    "preg_image": "/Placeholder.png",
    "fk_diff_preg_dificultad": 1
  }
]

[
  {"resp_contenido": "4", "fk_preg_resp_pregunta": 101, "resp_correcta": true},
  {"resp_contenido": "5", "fk_preg_resp_pregunta": 101, "resp_correcta": false},
  {"resp_contenido": "3", "fk_preg_resp_pregunta": 101, "resp_correcta": false},

  {"resp_contenido": "París", "fk_preg_resp_pregunta": 102, "resp_correcta": true},
  {"resp_contenido": "Londres", "fk_preg_resp_pregunta": 102, "resp_correcta": false},
  {"resp_contenido": "Berlín", "fk_preg_resp_pregunta": 102, "resp_correcta": false},

  {"resp_contenido": "Rosa", "fk_preg_resp_pregunta": 103, "resp_correcta": true},
  {"resp_contenido": "Morado", "fk_preg_resp_pregunta": 103, "resp_correcta": false},
  {"resp_contenido": "Naranja", "fk_preg_resp_pregunta": 103, "resp_correcta": false},

  {"resp_contenido": "Mercurio", "fk_preg_resp_pregunta": 104, "resp_correcta": true},
  {"resp_contenido": "Venus", "fk_preg_resp_pregunta": 104, "resp_correcta": false},
  {"resp_contenido": "Marte", "fk_preg_resp_pregunta": 104, "resp_correcta": false},

  {"resp_contenido": "Parar completamente", "fk_preg_resp_pregunta": 105, "resp_correcta": true},
  {"resp_contenido": "Continuar con precaución", "fk_preg_resp_pregunta": 105, "resp_correcta": false},
  {"resp_contenido": "Acelerar", "fk_preg_resp_pregunta": 105, "resp_correcta": false},

  {"resp_contenido": "Velocímetro", "fk_preg_resp_pregunta": 106, "resp_correcta": true},
  {"resp_contenido": "Tachómetro", "fk_preg_resp_pregunta": 106, "resp_correcta": false},
  {"resp_contenido": "Termómetro", "fk_preg_resp_pregunta": 106, "resp_correcta": false},

  {"resp_contenido": "Proteger al ocupante en caso de choque", "fk_preg_resp_pregunta": 107, "resp_correcta": true},
  {"resp_contenido": "Mejorar la estética del coche", "fk_preg_resp_pregunta": 107, "resp_correcta": false},
  {"resp_contenido": "Reducir el consumo de combustible", "fk_preg_resp_pregunta": 107, "resp_correcta": false},

  {"resp_contenido": "Mantener el vehículo parado", "fk_preg_resp_pregunta": 108, "resp_correcta": true},
  {"resp_contenido": "Acelerar el vehículo", "fk_preg_resp_pregunta": 108, "resp_correcta": false},
  {"resp_contenido": "Cambiar de marcha", "fk_preg_resp_pregunta": 108, "resp_correcta": false},

  {"resp_contenido": "Detenerse completamente y ceder paso", "fk_preg_resp_pregunta": 109, "resp_correcta": true},
  {"resp_contenido": "Continuar sin detenerse", "fk_preg_resp_pregunta": 109, "resp_correcta": false},
  {"resp_contenido": "Reducir velocidad sin parar", "fk_preg_resp_pregunta": 109, "resp_correcta": false},

  {"resp_contenido": "Mirar y asegurarse antes de adelantar", "fk_preg_resp_pregunta": 110, "resp_correcta": true},
  {"resp_contenido": "Adelantar sin mirar", "fk_preg_resp_pregunta": 110, "resp_correcta": false},
  {"resp_contenido": "Solo adelantar en línea continua", "fk_preg_resp_pregunta": 110, "resp_correcta": false},

  {"resp_contenido": "Apartarse y dejar pasar", "fk_preg_resp_pregunta": 111, "resp_correcta": true},
  {"resp_contenido": "Ignorar la ambulancia", "fk_preg_resp_pregunta": 111, "resp_correcta": false},
  {"resp_contenido": "Seguir conduciendo normalmente", "fk_preg_resp_pregunta": 111, "resp_correcta": false},

  {"resp_contenido": "Antes de girar o cambiar de carril", "fk_preg_resp_pregunta": 112, "resp_correcta": true},
  {"resp_contenido": "Solo al arrancar el vehículo", "fk_preg_resp_pregunta": 112, "resp_correcta": false},
  {"resp_contenido": "Nunca es necesario", "fk_preg_resp_pregunta": 112, "resp_correcta": false}
]

[
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 101},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 102},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 103},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 104},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 105},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 106},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 107},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 108},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 109},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 110},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 111},
  {"fk_tsts_pgte_test": 8, "fk_preg_pgte_pregunta": 112}
]
/*TEST DEBUG*/


/*LOGROS*/

[
    {
        "logr_nombre": "Se empieza por algo",
        "logr_descripcion": "Completa un test",
        "logr_image": "",
        "logr_etiqueta":"test"
    },
    {
        "logr_nombre": "Vas en serio",
        "logr_descripcion": "Realiza 3 tests, sin importar el resultado",
        "logr_image": "",
        "logr_etiqueta":"test"
    },
    {
        "logr_nombre": "Experto en práctica",
        "logr_descripcion": "Completa los 7 tests disponibles",
        "logr_image": "",
        "logr_etiqueta":"test"
    },
    {
        "logr_nombre": "¡Lo lograste!",
        "logr_descripcion": "Aprueba un test con al menos 27 respuestas correctas",
        "logr_image": "",
        "logr_etiqueta":"test"
    },
    {
        "logr_nombre": "Constancia que vale",
        "logr_descripcion": "Aprueba 3 tests distintos",
        "logr_image": "",
        "logr_etiqueta":"test"
    },
    {
        "logr_nombre": "Perfecto",
        "logr_descripcion": "Aprueba un test con 30 respuestas correctas",
        "logr_image": "",
        "logr_etiqueta":"test"
    },
    {
        "logr_nombre": "Sanguinario",
        "logr_descripcion": "Ten una racha de 5 en preguntas encadenadas",
        "logr_image": "",
        "logr_etiqueta":"racha"
    },
    {
        "logr_nombre": "Despiadado",
        "logr_descripcion": "Ten una racha de 10 en preguntas encadenadas",
        "logr_image": "",
        "logr_etiqueta":"racha"
    },
    {
        "logr_nombre": "Inexorable",
        "logr_descripcion": "Ten una racha de 15 en preguntas encadenadas",
        "logr_image": "",
        "logr_etiqueta":"racha"
    },
    {
        "logr_nombre": "Implacable",
        "logr_descripcion": "Ten una racha de 20 en preguntas encadenadas",
        "logr_image": "",
        "logr_etiqueta":"racha"
    },
    {
        "logr_nombre": "Brutal",
        "logr_descripcion": "Ten una racha de 25 en preguntas encadenadas",
        "logr_image": "",
        "logr_etiqueta":"racha"
    },
    {
        "logr_nombre": "Nuclear",
        "logr_descripcion": "Ten una racha de 30 en preguntas encadenadas",
        "logr_image": "",
        "logr_etiqueta":"racha"
    }
]
