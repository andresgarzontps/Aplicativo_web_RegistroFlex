Paso 1: Instalación de dependencias
Ejecute el siguiente comando para instalar las dependencias del proyecto:


npm install
Paso 4: Configuración de la base de datos
Descargue e instale MySQL Workbench desde dev.mysql.com.

Importe la base de datos ubicada en la carpeta Base_Datos.

Configure la base de datos con la siguiente contraseña: @dm!n!str@d0r.



Paso 5: Configuración de variables de entorno
En El archivo .env en la raíz del proyecto y configure las siguientes variables:

env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=@dm!n!str@d0r
DB_NAME=RegistroFlex

Paso 6: Ejecución de la aplicación
Ejecute la aplicación con el siguiente comando:

npm start
La aplicación estará disponible en http://localhost:4000.

Librerías utilizadas
Express
jsonwebtoken
dotenv
mysql2
bcryptjs
