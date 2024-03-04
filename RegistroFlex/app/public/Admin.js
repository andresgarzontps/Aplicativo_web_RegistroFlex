$(document).ready(function () {
    DataUsurioLogueado();

});

$('#OpcionCrearUsuarioNuevoMenu').click(function () {


    $('#DivCrearUsuario').show();
    $('#DivConsultarUsuarios').hide();
    $('#DivConsultarUsuarioGeneral').hide();

});

$('#DivConsultarUsuarioMenu').click(function () {
    $('#DivCrearUsuario').hide();
    $('#DivConsultarUsuarios').show();
    $('#DivConsultarUsuarioGeneral').hide();
});

$('#UausrioGeneralMenu').click(function () {
    $('#DivCrearUsuario').hide();
    $('#DivConsultarUsuarios').hide();
    $('#DivConsultarUsuarioGeneral').show();
});



document.getElementById("BotonCerrarLogueo").addEventListener("click", () => {
    Swal.fire({
        title: "¿Estás seguro de cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí"
    }).then((result) => {
        if (result.isConfirmed) {
            document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.location.href = "/";
        } else {
            Swal.fire({
                title: "Cancelado",
                text: "Tu sesión no se ha cerrado.",
                icon: "info"
            });
        }
    });

});

function toggleSubMenu() {
    var submenu = document.querySelector('.sidebar-submenu');
    submenu.style.display = (submenu.style.display === 'none' || submenu.style.display === '') ? 'block' : 'none';

}


function toggleSubMenu2() {
    var submenu2 = document.querySelector('.sidebar-submenu2');
    submenu2.style.display = (submenu2.style.display === 'none' || submenu2.style.display === '') ? 'block' : 'none';
}


function openNav() {
    document.getElementById("mySidebar").style.width = "260px";
    document.getElementById("main").style.marginLeft = "260px";

}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


async function DataUsurioLogueado() {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
        Swal.fire({
            title: 'Error',
            text: 'Error Interno por favor Intenta Nuevamente',
            icon: 'warning',
        });
    } else {

        const res = await fetch("http://localhost:4000/api/ConsultaDataUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: storedUser,
            })
        });

        if (res.ok) {
            const resJson = await res.json();
            if (resJson.status === 'Success') {
                const userInfo = resJson.user;
                
                const userIdperfil = userInfo.id_perfil;
                const perfil = await ConsultaDataPerfil(userIdperfil, userInfo);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Usuario no encontrado',
                    icon: 'error',
                });
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Error en la solicitud al servidor',
                icon: 'error',
            });
        }

    }
}


async function ConsultaDataPerfil(userIdperfil, userInfo) {
    document.getElementById('NombreUsuario').innerHTML = userInfo.Nombre + ' ' + userInfo.Apellidos;
    document.getElementById('CorreoUsuario').innerHTML = userInfo.correo;

    switch (userIdperfil) {

        case 1:
            $('#OpcionesUsuario').show();
            $('#OpcionesAdmin').show();

            Swal.fire({
                title: 'Bienvenid@ a RegistroFlex',
                text: `${userInfo.Nombre}` + ` ` + `${userInfo.Apellidos}`,
                icon: 'success',
            });
            break;

        case 2:
            $('#OpcionesAdmin').hide();
            $('#OpcionesUsuario').show();
            Swal.fire({
                title: 'Bienvenid@ a RegistroFlex',
                text: `${userInfo.Nombre}` + ` ` + `${userInfo.Apellidos}`,
                icon: 'success',
            });

            break;
        default:
            $('#OpcionesAdmin').hide();
            $('#OpcionesUsuario').hide();
            Swal.fire({
                title: 'Error',
                text: 'Su usuario no tiene perfil en la página RegistroFlex, por favor contacte al administrador del sitio web.',
                icon: 'info',
            });
            break;
    }
}
function EliminarDataTableMiInformacion() {
    if ($.fn.DataTable.isDataTable('#MiInformacion')) {
        $('#MiInformacion').DataTable().destroy();
    }
    $('#MiInformacion tbody').empty();
    ConsultarDatosPersonales();
}

async function ConsultarDatosPersonales() {
    const CorreoUsuario = localStorage.getItem('user');


    if (!CorreoUsuario) {
        Swal.fire({
            title: 'Error',
            text: 'Error Interno de consulta por favor Intenta Nuevamente',
            icon: 'warning',
        });
    } else {

        const res = await fetch("http://localhost:4000/api/ConsultaDatosPersonales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: CorreoUsuario,
            })
        });

        if (res.ok) {
            const resJson = await res.json();
            if (resJson.status === 'Success') {
                const InforUsuario = resJson.user;
                const VariableApellidos = resJson.user.Apellidos;
                const VariableEdad = resJson.user.Edad;
                const VariableNombre = resJson.user.Nombre;
                const VariableCedula = resJson.user.cedula;
                const VariableCiudad = resJson.user.ciudad;
                const VariableCorreo = resJson.user.correo;
                const VariableFechaNacimiento = resJson.user.fecha_nacimiento;
                const VariableIdPais = resJson.user.id_pais;
                const VariableIdRecidencia = resJson.user.id_recidencia;
                const VariableIdDocumento = resJson.user.id_tipoDocumento;
                const VariableIdUsuario = resJson.user.id_usuario;
                const VariableNombrePais = resJson.user.nombre_pais;
                const VariableNombreTipoDocumento = resJson.user.nombre_tipoDocumento;
                const VariableTelefono = resJson.user.telefono;
                const fechaFormateada = new Date(VariableFechaNacimiento).toLocaleDateString('es-ES');

                var html = '<tr>' +

                    '<td>' + VariableIdUsuario + '</td>' +
                    '<td>' + VariableNombre + '</td>' +
                    '<td>' + VariableApellidos + '</td>' +
                    '<td>' + VariableEdad + '</td>' +
                    '<td>' + VariableIdPais + '</td>' +
                    '<td>' + VariableNombrePais + '</td>' +
                    '<td>' + fechaFormateada + '</td>' +
                    '<td>' + VariableIdRecidencia + '</td>' +
                    '<td>' + VariableCiudad + '</td>' +
                    '<td>' + VariableIdDocumento + '</td>' +
                    '<td>' + VariableNombreTipoDocumento + '</td>' +
                    '<td>' + VariableCedula + '</td>' +
                    '<td>' + VariableTelefono + '</td>' +
                    '<td>' + VariableCorreo + '</td>' +
                    '<td><center><i class="fa fa-edit" data-toggle="modal" data-target="#ModalEditarMisDatos" onclick="editInformacion(' + VariableIdUsuario + ')"role="button"></i>' + ' - ' + '<i class="fa fa-trash" onclick="EliminarDatosUsuarioFormulario(' + VariableIdUsuario + ')" role="button"></i></td>' +

                    '</tr>';

                var idTabla = document.getElementById('MiInformacionTbody');
                idTabla.insertAdjacentHTML('beforeend', html);



            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Usuario no encontrado',
                    icon: 'error',
                });
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Error en la solicitud al servidor',
                icon: 'error',
            });
        }
    }
    DatatableMiIfnfromacion();
}


function DatatableMiIfnfromacion() {

    $("#MiInformacion").DataTable({
        destroy: true,
        responseve:true,
        lengthMenu: [
            [-1, 10, 25, 50],
            ["Todo", 10, 25, 50],
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
        },
        columnDefs: [
            { targets: [0, 4, 7, 9,], visible: false }
        ]
    });
}

async function editInformacion(Id) {
    await ConsultarTipoDocumentoFormulario();
    await ConsultarPaisFormulario();
    await ConsultarResidenciaFormulario();

    const IdConsultar = Id;

    if (!IdConsultar) {
        Swal.fire({
            title: 'Error',
            text: 'Error Interno por favor Intenta Nuevamente',
            icon: 'warning',
        });
    } else {
        try {
            const res = await fetch("http://localhost:4000/api/ConsultaDataUserEditarMisDatos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ID: IdConsultar,
                })
            });

            if (res.ok) {
                const resJson = await res.json();

                if (resJson.status === 'Success') {
                    const userInfo = resJson.user;
                    
                    let fechaOriginal = userInfo[0].fecha_nacimiento;
                    fechaOriginal = moment(fechaOriginal).format('YYYY-MM-DD');
                    document.getElementById('Id_Usuario').value = userInfo[0].id_usuario;
                    document.getElementById('AppelidosMisDatos').value = userInfo[0].Apellidos;
                    document.getElementById('EdadMisDatos').value = userInfo[0].Edad;
                    document.getElementById('NombreMisDatos').value = userInfo[0].Nombre;
                    document.getElementById('NumeroDocumentMisDatos').value = userInfo[0].cedula;
                    document.getElementById('CorreoMisDatos').value = userInfo[0].correo;
                    document.getElementById('FechaNacimientoMisDatos').value = fechaOriginal;
                    document.getElementById('PaisMisDatos').value = userInfo[0].id_pais;
                    document.getElementById('residenciaMisDatos').value = userInfo[0].id_recidencia;
                    document.getElementById('TipoDocumentoMisDatos').value = userInfo[0].id_tipoDocumento;
                    document.getElementById('TelefonoMisDatos').value = userInfo[0].telefono;
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Datos no encontrados',
                        icon: 'error',
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error en la solicitud al servidor',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error("Error inesperado:", error);
            Swal.fire({
                title: 'Error',
                text: 'Error inesperado',
                icon: 'error',
            });
        }
    }
}






async function ConsultarTipoDocumentoFormulario() {
    try {
        const res = await fetch("http://localhost:4000/api/TipoDocumentoFormulario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            const resJson = await res.json();
            Swal.fire({
                title: 'Error',
                text: resJson.message || 'Hubo un problema en la solicitud.', 
                icon: 'warning',
            });
        } else {
            const resJson = await res.json();
            const TiposDocumentosActualizar =  resJson.data;
            var htmlTipoDocumentoActualizar = "<option >Seleccione...</option>";

            for (let i = 0; i < TiposDocumentosActualizar.length; i++) {
                const NombreDocumento = TiposDocumentosActualizar[i].nombre_tipoDocumento;
                const IdDocumento = TiposDocumentosActualizar[i].id_tipoDocumento;
                htmlTipoDocumentoActualizar += "<option value='" + IdDocumento + "'>" + NombreDocumento + "</option>";
                
            }

            document.getElementById("TipoDocumentoMisDatos").innerHTML = ("beforeend", htmlTipoDocumentoActualizar);

            
        }
    } catch (error) {
        console.error(error);  
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema en la solicitud.',
            icon: 'error',
        });
    }
}


async function ConsultarPaisFormulario() {
    try {
        const res = await fetch("http://localhost:4000/api/PaisFormulario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            const resJson = await res.json();
            Swal.fire({
                title: 'Error',
                text: resJson.message || 'Hubo un problema en la solicitud.', 
                icon: 'warning',
            });
        } else {
            const resJson = await res.json();
            const Paises =  resJson.data;
            var htmlpaises = "<option >Seleccione...</option>";

            for (let i = 0; i < Paises.length; i++) {
                const NombrePais = Paises[i].nombre_pais;
                const IdPais = Paises[i].id_pais;
                htmlpaises += "<option value='" + IdPais + "'>" + NombrePais + "</option>";
            }

            document.getElementById("PaisMisDatos").innerHTML = ("beforeend", htmlpaises);

            
        }
    } catch (error) {
        console.error(error);  
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema en la solicitud.',
            icon: 'error',
        });
    }
}


async function ConsultarResidenciaFormulario() {
    try {
        const res = await fetch("http://localhost:4000/api/ResidenciaFormulario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            const resJson = await res.json();
            console.error(resJson); 
            Swal.fire({
                title: 'Error',
                text: resJson.message || 'Hubo un problema en la solicitud.', 
                icon: 'warning',
            });
        } else {
            const resJson = await res.json();
            const Residencias =  resJson.data;
            var htmlResidencias = "<option >Seleccione...</option>";

            for (let i = 0; i < Residencias.length; i++) {
                const NombreResidencia = Residencias[i].ciudad;
                const IdResidencia = Residencias[i].id_recidencia;
                htmlResidencias += "<option value='" + IdResidencia + "'>" + NombreResidencia + "</option>";
                
            }

            document.getElementById("residenciaMisDatos").innerHTML = ("beforeend", htmlResidencias);

            
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema en la solicitud.',
            icon: 'error',
        });
    }
}



async function ActualizarDataFormularioMisDatos() {
    const IdUsuario = document.getElementById('Id_Usuario').value;
    const Nombre = document.getElementById('NombreMisDatos').value;
    const Apellidos = document.getElementById('AppelidosMisDatos').value;
    const Edad = document.getElementById('EdadMisDatos').value;
    const Pais = document.getElementById('PaisMisDatos').value;
    const FechaNacimiento = document.getElementById('FechaNacimientoMisDatos').value;
    const Residencia = document.getElementById('residenciaMisDatos').value;
    const TipoDocumento = document.getElementById('TipoDocumentoMisDatos').value;
    const NumeroDocumento = document.getElementById('NumeroDocumentMisDatos').value;
    const Telefono = document.getElementById('TelefonoMisDatos').value;
    const Correo = document.getElementById('CorreoMisDatos').value;

    const inputImagen = document.getElementById('inputImagen');

    

    if (!IdUsuario || !Nombre || !Apellidos || !Edad || !Pais || !FechaNacimiento || !Residencia || !TipoDocumento || !NumeroDocumento || !Telefono || !Correo) {
        Swal.fire({
            title: 'Error',
            text: 'Campos Vacios',
            icon: 'warning',
        });
    } else {
        try {
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro de Actualizar la información?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí"
            });


            if (confirmacion.isConfirmed) {
                const res = await fetch("http://localhost:4000/api/ActualizarMisDatosFormulario", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        IdUser: IdUsuario,
                        NombreUser: Nombre,
                        ApellidoUser: Apellidos,
                        EdadUser: Edad,
                        PaisUser: Pais,
                        FechaNacimientoUser: FechaNacimiento,
                        ResidenciaUser: Residencia,
                        TipoDocumentoUser: TipoDocumento,
                        NumerCedulaUser: NumeroDocumento,
                        TelefonoUser: Telefono,
                        CorreoUser: Correo,
                        
                    })
                });

                if (res.ok) {
                    const resJson = await res.json();
                    if (resJson.status === 'Success') {
                        Swal.fire({
                            title: "Muy bien!",
                            text: "Datos actualizados correctamente",
                            icon: "success"
                        });

                        await $('#ModalEditarMisDatos').modal('hide');
                        await EliminarDataTableMiInformacion();
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Error en la actualizacion',
                            icon: 'error',
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error en la solicitud al servidor',
                        icon: 'error',
                    });
                }
            } else {
                Swal.fire({
                    title: "Cancelado",
                    text: "Tu sesión no se ha cerrado.",
                    icon: "info"
                });
            }

        } catch (error) {
            console.error("Error inesperado:", error);
            Swal.fire({
                title: 'Error',
                text: 'Error inesperado',
                icon: 'error',
            });
        }
    }
}




async function EliminarDatosUsuarioFormulario(Id) {
    try {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se eliminarán tus datos y se cerrará automáticamente la sesión.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar y cerrar sesión'
        });
    
        if (result.isConfirmed) {
            const res = await fetch("http://localhost:4000/api/EliminarDatosUsuarioFormulario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    IdUser: Id,
                })
            });
    
            const resJson = await res.json();

            if (resJson.status === 'Success') {
                await Swal.fire({
                    title: 'Muy bien!',
                    text: 'Datos eliminados correctamente',
                    icon: 'success'
                });
                document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.location.href = "/";
            } else {
                await Swal.fire({
                    title: 'Error',
                    text: 'Error en la eliminación',
                    icon: 'error',
                });
            }
        } else {
            await Swal.fire({
                title: 'Cancelado',
                text: 'No se realizaron cambios.',
                icon: 'info'
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema en la solicitud.',
            icon: 'error',
        });
    }
}