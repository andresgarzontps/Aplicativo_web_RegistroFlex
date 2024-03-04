import mysql from 'mysql2/promise';

async function DataUser(req, res) {
    const userLogueado = req.body.email

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const [userDataRows, fields] = await connection.execute('SELECT * FROM datos_usuarios WHERE correo = ?', [userLogueado]);
        const [perfilRows, perfilFields] = await connection.execute('SELECT id_perfil FROM usuario WHERE username = ?', [userLogueado]);
        connection.end();
        if (userDataRows.length > 0 && perfilRows.length > 0) {
            const userData = userDataRows[0];
            const idPerfil = perfilRows[0].id_perfil;
            const combinedInfo = {
                ...userData,
                id_perfil: idPerfil
            };
            return res.status(200).send({ status: 'Success', message: 'Usuario encontrado', user: combinedInfo });
        } else {
            return res.status(404).send({ status: 'Error', message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);

        await connection.rollback();
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }

}



async function ConsultaDatosPersonales(req, res) {
    
    const CorreoUsuario = req.body.email;
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [DataUsuario, fields] = await connection.execute(
            'SELECT du.*, dp.nombre_pais, dr.ciudad, dt.nombre_tipoDocumento ' +
            'FROM datos_usuarios du ' +
            'LEFT JOIN datos_pais dp ON du.id_pais = dp.id_pais ' +
            'LEFT JOIN datos_recidencia dr ON du.id_recidencia = dr.id_recidencia ' +
            'LEFT JOIN datos_tipodocumento dt ON du.id_tipoDocumento = dt.id_tipoDocumento ' +
            'WHERE du.correo = ?',
            [CorreoUsuario]
        );


        connection.end();

        if (DataUsuario.length > 0) {
            const userData = DataUsuario[0];
            return res.status(200).send({ status: 'Success', message: 'Usuario encontrado', user: userData });
        } else {
            return res.status(404).send({ status: 'Error', message: 'Usuario no encontrado' });
        }


    } catch (error) {
        console.error(error);

        await connection.rollback();
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}



async function ConsultaDatosPersonalesActualizar(req, res) {

    const IdUsuario = req.body.ID;
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [DataUsuarioRows, fields] = await connection.execute('SELECT * FROM datos_usuarios WHERE id_usuario = ?', [IdUsuario]);


        connection.end();

        if (DataUsuarioRows.length > 0) {
            const userData = DataUsuarioRows[0];
            return res.status(200).send({ status: 'Success', message: 'Usuario encontrado', user: DataUsuarioRows });
        } else {
            return res.status(404).send({ status: 'Error', message: 'Usuario no encontrado' });
        }


    } catch (error) {
        console.error(error);

        await connection.rollback();
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}

async function ConsultaDatosTipoDocumentoActualizar(req, res) {


    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [TipoDocumentoData, fields] = await connection.execute('SELECT * FROM datos_tipodocumento');


        connection.end();

        if (TipoDocumentoData.length > 0) {
            return res.status(200).send({ status: 'Success', message: 'Usuario encontrado', data: TipoDocumentoData });
        } else {
            return res.status(404).send({ status: 'Error', message: 'Usuario no encontrado' });
        }


    } catch (error) {
        console.error(error);

        await connection.rollback();
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}

async function ConsultaDatosPaisActualizar(req, res) {


    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [PaisData, fields] = await connection.execute('SELECT * FROM datos_pais');


        connection.end();

        if (PaisData.length > 0) {
            return res.status(200).send({ status: 'Success', message: 'Usuario encontrado', data: PaisData });
        } else {
            return res.status(404).send({ status: 'Error', message: 'Usuario no encontrado' });
        }


    } catch (error) {
        console.error(error);

        await connection.rollback();
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}
async function ConsultaDatosResidenciaActualizar(req, res) {


    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [PaisData, fields] = await connection.execute('SELECT * FROM datos_recidencia');


        connection.end();

        if (PaisData.length > 0) {
            return res.status(200).send({ status: 'Success', message: 'Usuario encontrado', data: PaisData });
        } else {
            return res.status(404).send({ status: 'Error', message: 'Usuario no encontrado' });
        }


    } catch (error) {
        console.error(error);


        await connection.rollback();
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}

async function ActualizarMisDatos(req, res) {
    const IdUser = req.body.IdUser;
    const NombreUser = req.body.NombreUser;
    const ApellidoUser = req.body.ApellidoUser;
    const EdadUser = req.body.EdadUser;
    const PaisUser = req.body.PaisUser;
    const FechaNacimientoUser = req.body.FechaNacimientoUser;
    const ResidenciaUser = req.body.ResidenciaUser;
    const TipoDocumentoUser = req.body.TipoDocumentoUser;
    const NumeroDocumentoUser = req.body.NumerCedulaUser;
    const TelefonoUser = req.body.TelefonoUser;
    const CorreoUser = req.body.CorreoUser;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        await connection.beginTransaction();


        const [result, fields] = await connection.execute(
            'UPDATE datos_usuarios SET Nombre = ?, Apellidos = ?, Edad = ?, id_pais = ?, ' +
            'fecha_nacimiento = ?, id_recidencia = ?, id_tipoDocumento = ?, cedula = ?, ' +
            'telefono = ?, correo = ? WHERE id_usuario = ?',
            [NombreUser, ApellidoUser, EdadUser, PaisUser, FechaNacimientoUser, ResidenciaUser,
                TipoDocumentoUser, NumeroDocumentoUser, TelefonoUser, CorreoUser, IdUser]
        );

        await connection.commit();
        connection.end();

        if (result.affectedRows > 0) {
            return res.status(200).send({ status: 'Success', message: 'Datos actualizados correctamente' });
        } else {
            return res.status(404).send({ status: 'Error', message: 'Usuario no encontrado o ningún dato actualizado' });
        }

    } catch (error) {
        console.error(error);


        if (connection) {
            await connection.rollback();
            connection.end();
        }

        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}

async function EliminarMisDatos(req, res) {
    const IdUser = req.body.IdUser;
    console.log(IdUser);

    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        await connection.beginTransaction();

        const [resultUsuario] = await connection.execute(
            'DELETE FROM usuario WHERE id_datos_usuario = ?',
            [IdUser]
        );


        const [resultDatosUsuarios] = await connection.execute(
            'DELETE FROM datos_usuarios WHERE id_usuario = ?',
            [IdUser]
        );



        await connection.commit();

        if (resultDatosUsuarios.affectedRows > 0 || resultUsuario.affectedRows > 0) {
            return res.status(200).send({ status: 'Success', message: 'Datos eliminados correctamente' });
        } else {
            return res.status(404).send({ status: 'Error', message: 'Usuario no encontrado o ningún dato eliminado' });
        }

    } catch (error) {
        console.error(error);


        if (connection) {
            await connection.rollback();
            connection.end();
        }

        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}



export const methods = {
    DataUser,
    ConsultaDatosPersonales,
    ConsultaDatosPersonalesActualizar,
    ConsultaDatosTipoDocumentoActualizar,
    ConsultaDatosPaisActualizar,
    ConsultaDatosResidenciaActualizar,
    ActualizarMisDatos,
    EliminarMisDatos,
}
