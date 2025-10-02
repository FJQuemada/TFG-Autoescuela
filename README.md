# 🚗 Autoescuela Virtual - Preparación Examen Teórico 🚦  

Este proyecto es una plataforma web diseñada para ayudar a los usuarios a prepararse para el examen teórico de conducción. Ofrece tests interactivos, seguimiento de progreso y una comunidad para resolver dudas.  

## 🛠 Tecnologías  
- **Frontend:** React  
- **Backend:** Spring Boot  
- **Base de datos:** PostgreSQL  

## 📌 Funcionalidades  
✔️ Generación de exámenes tipo test aleatorios  
✔️ Chatbot interactivo para guiar a los usuarios  
✔️ Foro y sistema de preguntas creadas por la comunidad  
✔️ Estadísticas y seguimiento del progreso  
✔️ Gamificación con rankings y logros  

🚗 DriveHub - Proceso de Instalación

El proyecto consta de tres entornos principales: Frontend, Backend y
Base de datos.
Antes de empezar asegúrate de tener instalados los siguientes
componentes en tu sistema:

-   🐍 Python 3.10 o superior
-   🟢 Node.js 18 o superior (incluye npm)
-   🐘 PostgreSQL 14 o superior
-   (Opcional pero recomendado) pgAdmin 4 para gestionar visualmente la
    base de datos

------------------------------------------------------------------------

📑 Índice

1.  Base de datos (PostgreSQL)
    -   Con scripts
    -   Con backup
        -   Opción 1: Terminal
        -   Opción 2: pgAdmin4
2.  Backend (Django)
3.  Frontend (React)

------------------------------------------------------------------------

1️⃣ Base de datos (PostgreSQL)

Con scripts

En el directorio TFG-Autoescuela/database/03-scripts se encuentran los
scripts para la creación de tablas y el insert de las dificultades.

Para añadir los tests, preguntas, respuestas y relaciones, usa el
archivo dataTestsAutoescuela.sql del mismo directorio:

-   Tests → http://127.0.0.1:8000/api/tests_a_tope
-   Preguntas → http://127.0.0.1:8000/api/preguntas_a_tope
-   Respuestas → http://127.0.0.1:8000/api/respuestas_a_tope
-   Preguntas en tests →
    http://127.0.0.1:8000/api/preguntas_en_test_a_tope

------------------------------------------------------------------------

Con backup

También se puede usar el backup incluido en
TFG-Autoescuela/database/03-scripts/drive_hub_db_backup_def.

Opción 1: Usando terminal (cmd)

1.  Abre una terminal en la carpeta bin de PostgreSQL:

        C:\Program Files\PostgreSQLin

2.  Abre la terminal desde la barra de direcciones (cmd + Enter).

3.  Crea una base de datos vacía:

        createdb -U postgres drive_hub_db

4.  Restaura el backup:

        pg_restore -U postgres -d drive_hub_db "C:uta\completa  rchivo.backup"

Opción 2: Usando pgAdmin4

1.  Abre pgAdmin4 e inicia sesión con el usuario postgres.
2.  Crea una nueva base de datos llamada drive_hub_db.
    -   También puedes usar el script create_database.sql en
        TFG-Autoescuela/database/00-config.
3.  Restaura el backup: clic derecho sobre la base de datos → Restore… →
    -   Format: Custom
    -   Archivo: drive_hub_db_backup_def

⚠️ Importante: Configura el usuario y contraseña en settings.py (ruta:
TFG-Autoescuela/backend/TFGAutoescuela).
Si no quieres modificar el archivo, se recomienda crear un usuario root
con contraseña root.

------------------------------------------------------------------------

2️⃣ Backend (Django)

1.  Abre una terminal en la carpeta TFG-Autoescuela/backend.

2.  Crea un entorno virtual:

        python -m venv venv

3.  Actívalo (Windows, cmd):

        venv\Scripts ctivate

4.  Instala dependencias:

        pip install -r requirements.txt

5.  Ejecuta el servidor:

        python manage.py runserver

------------------------------------------------------------------------

3️⃣ Frontend (React)

1.  Abre otra terminal en la carpeta TFG-Autoescuela/frontend/drivehub.

2.  Instala dependencias:

        npm install

3.  Inicia la app en modo desarrollo:

        npm run dev

------------------------------------------------------------------------

✍️ Autor: Francisco Javier Quemada Valle
📌 Proyecto: DriveHub
