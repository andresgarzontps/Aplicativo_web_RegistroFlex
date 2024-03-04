import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import mysql from 'mysql2/promise';
dotenv.config();

async function soloAdmin(req, res, next) {
  const logueado = await revisarCookie(req);
  if (logueado) {
    return next();
  }
  return res.redirect("/");
}

async function soloPublico(req, res, next) {
  const logueado = await revisarCookie(req);
  if (!logueado) {
    return next();
  }
  return res.redirect("/principal");
}

async function revisarCookie(req) {
  try {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      return false;
    }

    const cookieJWT = cookieHeader.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificada);

    // Conectar a la base de datos
    let connection;
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });

      // Obtener el usuario de la base de datos
      const [rows] = await connection.execute('SELECT * FROM usuario WHERE username = ?', [decodificada.user]);
      console.log(rows);

      // Verificar si el usuario existe en la base de datos
      return rows.length !== 0;
    } finally {
      if (connection) {
        await connection.destroy();
      }
    }
  } catch (error) {
    console.error("Error al revisar la cookie:", error);
    return false;
  }
}

export const methods = {
  soloAdmin,
  soloPublico,
};
