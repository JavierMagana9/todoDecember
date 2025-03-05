# ToDo List Spanish

Aplicación ToDo List, que permite crear, editar y eliminar tareas, con conexión a una base de datos MongoDB.

## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Autor](#autor)

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para aplicaciones web en Node.js.
- **MongoDB**: Base de datos NoSQL orientada a documentos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Carga variables de entorno desde un archivo `.env`.
- **express-validator**: Middleware para validación de datos en las solicitudes.
- **jest**: Framework de pruebas en JavaScript.
- **mongodb-memory-server**: Servidor MongoDB en memoria para pruebas.
- **supertest**: Librería para pruebas de solicitudes HTTP.

## Requisitos Previos

- **Node.js**: Asegúrate de tener instalada la versión 14 o superior. Puedes descargarla desde [nodejs.org](https://nodejs.org/).
- **MongoDB**: Se requiere una instancia de MongoDB en funcionamiento. Puedes instalar MongoDB localmente o utilizar un servicio en la nube como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu_usuario/todo-list-backend.git
   cd todo-list-backend/back

2. **Instalar dependencias**:
    ```bash
    npm install

3. **Configurar variables de entorno:**:
Crea un archivo .env en la carpeta back con el siguiente contenido:

    ```bash
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/todolist


