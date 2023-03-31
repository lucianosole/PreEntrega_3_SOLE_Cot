class Contacto {
    constructor(nombre,email,telefono,mensaje){
        this.nombre=nombre;
        this.email=email;
        this.telefono=telefono;
        this.mensaje=mensaje;
    }
}

const arrayContacto = [];

formulario.addEventListener("submit", (e)=>{

    e.preventDefault();
    const nombre = document.getElementById("nombre");
    const email = document.getElementById ("email");
    const telefono = document.getElementById ("telefono");
    const mensaje = document.getElementById ("mensaje");

    const contacto = new Contacto (nombre.value, email.value, telefono.value, mensaje.value);

    arrayContacto.push(contacto);
    localStorage.setItem("consuta",JSON.stringify(arrayContacto));
    Swal.fire('Su mensaje ha sido enviado')
    formulario.reset();
})
