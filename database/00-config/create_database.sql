CREATE DATABASE drive_hub;

CREATE USER root WITH superuser
PASSWORD 'root';

CREATE USER db_user
PASSWORD 'db_user';

--permisos a db_user para conectarse a la db
GRANT CONNECT ON DATABASE drive_hub TO db_user;
--permisos en todas las tablas

-- ** PERMISOS PARA DB_USER CADA VEZ QUE HAGAMOS UNA TABLA NUEVA: MODIFICAR NOMBRE TALA **
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA PUBLIC TO db_user;
