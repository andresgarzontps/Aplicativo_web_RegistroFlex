

const mensajeError = document.getElementsByClassName("error")[0];

async function logueo(){
    const UserValue = document.querySelector("#UsuarioLogueo").value;
    const ContraseñaValue = document.querySelector("#ContraseñaLogueo").value;


    const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            UserValue, ContraseñaValue
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
        console.log(resJson);
        console.log(resJson.user);
        localStorage.setItem('user', resJson.user);

        
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: resJson.message,
            showConfirmButton: false,
            timer: 1500
        }).then((result) => {
            if (resJson.redirect) {
                window.location.href = resJson.redirect;
            }
        });

    }
}