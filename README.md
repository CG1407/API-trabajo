# API REST con Node.js y Express

Esta API incluye autenticación con JWT y refresh tokens, un CRUD completo para productos, conexión a una base de datos MySQL, y middlewares para verificar tokens de autenticación y roles de usuario.

## Instalación

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Configura la base de datos en el archivo `src/db.js`.
4. Inicia el servidor con `npm start`.

## Endpoints

### Autenticación
- `POST /auth/register`: Registro de usuarios.
- `POST /auth/login`: Inicio de sesión.
- `POST /auth/refresh-token`: Renovación de tokens.

### Productos
- `GET /products`: Obtener todos los productos (requiere autenticación).
- `POST /products`: Crear un producto (requiere rol de admin).
- `PUT /products/:id`: Actualizar un producto (requiere rol de admin).
- `DELETE /products/:id`: Eliminar un producto (requiere rol de admin).

## Roles
- `admin`: Acceso completo.
- `user`: Acceso limitado.

## Base de datos

La base de datos debe incluir las siguientes tablas:

### Tabla `users`
- `id`: INT, PRIMARY KEY, AUTO_INCREMENT
- `username`: VARCHAR(255)
- `password`: VARCHAR(255)
- `role`: ENUM('admin', 'user')

### Tabla `products`
- `id`: INT, PRIMARY KEY, AUTO_INCREMENT
- `name`: VARCHAR(255)
- `price`: DECIMAL(10, 2)

## Notas

- Asegúrate de configurar correctamente las credenciales de la base de datos.
- Los tokens de acceso tienen una duración de 15 minutos.
- Los tokens de refresh no tienen expiración pero pueden ser revocados manualmente.
