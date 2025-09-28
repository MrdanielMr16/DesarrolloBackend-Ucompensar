# 📌 Proyecto Fullstack – Dispositivos

Este proyecto es una aplicación **Fullstack** desarrollada con **Angular (frontend)**, **Node.js + Express (backend)** y **PostgreSQL (base de datos)**.  
Incluye además pruebas de la **API con Postman** y documentación en **PDF/Word**.

---

## 🚀 Instalación y configuración

### 1️⃣ Clonar el repositorio

```bash
# Clonar el repositorio completo
git clone https://github.com/tu-usuario/tu-repositorio.git

# Entrar a la carpeta del proyecto
cd tu-repositorio

### 2️⃣ Configurar la base de datos (PostgreSQL)

Instalar PostgreSQL (si no está instalado).

Abrir pgAdmin o la terminal de PostgreSQL.

Crear una base de datos nueva:

CREATE DATABASE proyecto_db;


Importar el script SQL (ubicado en la carpeta db/):

psql -U tu_usuario -d proyecto_db -f db/proyecto.sql


⚠️ Reemplazar tu_usuario y db/proyecto.sql según corresponda.

### 3️⃣ Iniciar el Back-end (Node.js)

Abrir la carpeta del backend:

cd backend


Instalar dependencias:

npm install


Crear un archivo .env dentro de backend/ con la siguiente configuración:

DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=proyecto_db
PORT=3000


Levantar el servidor:

npm start


👉 El backend quedará disponible en:
📍 http://localhost:3000

### 4️⃣ Iniciar el Front-end (Angular)

Abrir la carpeta del frontend:

cd frontend


Instalar dependencias:

npm install


Levantar el servidor de desarrollo:

ng serve -o


👉 El frontend se abrirá automáticamente en:
📍 http://localhost:4200


Por ultimo tambien agregue el archivo word y pdf con respecto a la ultima actividad
```
