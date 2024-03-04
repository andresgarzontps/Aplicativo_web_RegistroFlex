import express from "express";
import cookieParser from "cookie-parser";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";

import { methods as ConsultaDataUser } from "./controllers/Consultas.controller.js";

//serv
const app = express();

app.disable('x-powered-by');
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));

// Configuración de seguridad
app.use((req, res, next) => {
  // Configuración de X-Frame-Options para prevenir Clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  // Configuración de Content-Security-Policy para prevenir Clickjacking y otros ataques
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");

  next();
});

// Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/Librerias/Bootstrap/CSS"));
app.use(express.static(__dirname + "/Librerias/Bootstrap/JS"));
app.use(express.static(__dirname + "/Librerias/sweetalert2/JS"));
app.use(express.static(__dirname + "/Librerias/kit.fontawesome/JS"));
app.use(express.static(__dirname + "/Librerias/Jquery/JS"));
app.use(express.static(__dirname + "/Librerias/Datatable/JS"));
app.use(express.static(__dirname + "/Librerias/Datatable/CSS"));
app.use(express.static(__dirname + "/Images"));
app.use(express.json());
app.use(cookieParser());

// Resto del código...
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/register.html"));
app.get("/principal", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/Admin/Admin.html"));

app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

app.post("/api/ConsultaDataUser", ConsultaDataUser.DataUser);

app.post("/api/ConsultaDatosPersonales", ConsultaDataUser.ConsultaDatosPersonales);
app.post("/api/TipoDocumento", authentication.TipoDocumento);

app.post("/api/ConsultaDataUserEditarMisDatos", ConsultaDataUser.ConsultaDatosPersonalesActualizar);
app.post("/api/TipoDocumentoFormulario", ConsultaDataUser.ConsultaDatosTipoDocumentoActualizar);
app.post("/api/PaisFormulario", ConsultaDataUser.ConsultaDatosPaisActualizar);
app.post("/api/ResidenciaFormulario", ConsultaDataUser.ConsultaDatosResidenciaActualizar);
app.post("/api/ActualizarMisDatosFormulario", ConsultaDataUser.ActualizarMisDatos);
app.post("/api/EliminarDatosUsuarioFormulario", ConsultaDataUser.EliminarMisDatos);
