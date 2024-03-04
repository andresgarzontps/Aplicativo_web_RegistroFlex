import mysql from 'mysql2/promise';
import bcryptjs from 'bcryptjs';
import json from 'express';
import JsonWebTokenError from 'jsonwebtoken';


import JsonWebToken from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

async function login(req, res) {
    const user = req.body.UserValue;
    const passwordFor = req.body.ContraseñaValue;
    if (!user || !passwordFor) {
        return res.status(400).send({ status: 'Error', message: 'Los campos están incompletos' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        
        const [rows] = await connection.execute('SELECT * FROM usuario WHERE username = ?', [user]);
        if (rows.length === 0) {
            return res.status(401).send({ status: 'Error', message: 'Usuario no encontrado' });
        }
        const storedHashPassword = rows[0].password;
        const passwordMatch = await bcryptjs.compare(passwordFor, storedHashPassword);

        if (!passwordMatch) {
            return res.status(401).send({ status: 'Error', message: 'Contraseña incorrecta' });
        }

        const token = JsonWebToken.sign(
            { user }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
        };

        res.cookie("jwt", token, cookieOption);
        res.status(200).send({ status: 'ok', message: 'Inicio de sesión exitoso', redirect: '/principal', user:user});
        await connection.end();
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}

async function register(req, res) {
    const user = req.body.email;
    const NombreUser= req.body.Nombre;
    const ApellidoUser= req.body.Apellidos;
    const passwordFor = req.body.password;
    const IdDocument = req.body.IdDocumento;
    const NumeroDocumentoForm = req.body.NumeroDocumento;
    
    

    if (!user || !passwordFor || !NombreUser || !ApellidoUser) {
        return res.status(400).send({ status: 'Error', message: 'Los campos están incompletos' });
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])(?=.{8,})/;

    if (!passwordRegex.test(passwordFor)) {
        return res.status(400).send({ 
            status: 'Error', 
            message: 'La contraseña debe tener al menos 8 caracteres, incluyendo Numeros, letras mayúsculas, minúsculas y caracteres especiales'});
    }


    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        await connection.beginTransaction();
        const [userRows] = await connection.execute('SELECT * FROM usuario WHERE username = ?', [user]);

        if (userRows.length > 0) {
            await connection.rollback();
            return res.status(400).send({ status: 'Error', message: 'Este usuario ya existe' });
        }

        const [userRows2] = await connection.execute('SELECT * FROM datos_usuarios WHERE correo = ?', [user]);

        if (userRows2.length > 0) {
            await connection.rollback();
            return res.status(400).send({ status: 'Error', message: 'Este usuario ya existe' });
        }

        const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(passwordFor, salt);

        const [insertUserResult] = await connection.execute(
            'INSERT INTO usuario (username, password) VALUES (?, ?)',
            [user, hashPassword]
        );

        const idUsuario = insertUserResult.insertId;

        await connection.execute(
            'INSERT INTO datos_usuarios (Nombre, Apellidos, id_tipoDocumento, cedula, correo) VALUES (?, ?, ?, ?, ?)',
            [NombreUser, ApellidoUser, IdDocument, NumeroDocumentoForm, user]
        );
        const [datosUsuarioRows] = await connection.execute(
            'SELECT id_usuario FROM datos_usuarios WHERE correo = ?',
            [user]
        );

        const idDatosUsuario = datosUsuarioRows[0].id_usuario;
        await connection.execute(
            'UPDATE usuario SET id_datos_usuario = ? WHERE id_usuario = ?',
            [idDatosUsuario, idUsuario]
        );

        await connection.commit();

        await connection.end();

        return res.status(201).send({ status: 'ok', message: `Usuario ${user} agregado`, redirect: '/' });
    } catch (error) {
        console.error(error);

        await connection.rollback();
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}
async function TipoDocumento(req,res){
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [TipoDocumentoDataRows, fields] = await connection.execute('SELECT * FROM datos_tipodocumento');

        connection.end();

        if (TipoDocumentoDataRows.length > 0) {
            
            return res.status(200).send({ status: 'ok', message: 'Datos de tipo documento obtenidos', data: TipoDocumentoDataRows });
        }else{
            return res.status(404).send({ status: 'Error', message: 'Error al obtener perfiles' });
        }
    } catch (error) {
        console.error(error);

        await connection.rollback();
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}


export const methods = {
    login,
    register,
    TipoDocumento
}
