$(document).ready(function () {
    ConsultarTipoDocumento();

});

const mensajeError = document.getElementsByClassName("error")[0];

async function Registro(){
    
    const UserValue = document.querySelector("#username").value;
    const NombreValue = document.querySelector("#NombreUsuario").value;
    const ApellidoValue = document.querySelector("#ApellidoUsuario").value;
    const ContraseñaValue = document.querySelector("#password").value;
    const TipoDocumentoValue = document.querySelector("#TipoDocumentoFormRegistro").value; 
    const NumeroDocumentoValue = document.querySelector("#NumeroDocumento").value;
    
        const res = await fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: UserValue,
                Nombre: NombreValue,
                Apellidos: ApellidoValue,
                password: ContraseñaValue,
                IdDocumento:TipoDocumentoValue,
                NumeroDocumento:NumeroDocumentoValue,
            })
        });
        if (!res.ok) {
            const resJson = await res.json();
            Swal.fire({
                title: 'Error',
                text: resJson.message, 
                icon: 'warning',
            });
            return mensajeError.classList.toggle('escondido', false);
        }

        if (res.ok) {
            const resJson = await res.json();
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: resJson.message,
                showConfirmButton: false,
                timer: 1800
            }).then((result) => {
                if (resJson.redirect) {
                    window.location.href = resJson.redirect;
                }
            });
    
        }
        
    
}


async function ConsultarTipoDocumento() {
    try {
        const res = await fetch("http://localhost:4000/api/TipoDocumento", {
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
            console.log(resJson.data);
            const TiposDocumentos =  resJson.data;
            var htmlTipoDocumento = "<option >Seleccione...</option>";

            for (let i = 0; i < TiposDocumentos.length; i++) {
                const NombreDocumento = TiposDocumentos[i].nombre_tipoDocumento;
                const IdDocumento = TiposDocumentos[i].id_tipoDocumento;

                console.log(NombreDocumento);
                console.log(IdDocumento);
                htmlTipoDocumento += "<option value='" + IdDocumento + "'>" + NombreDocumento + "</option>";
                
            }

            document.getElementById("TipoDocumentoFormRegistro").innerHTML = ("beforeend", htmlTipoDocumento);
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
