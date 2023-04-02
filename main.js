const marcas = ['Fiat', 'Toyota', 'Chevrolet']

const autos = [
    {id:1,
        marca:"Chevrolet",
        modelo:"Onix",
        precio:4500000,
        imagen:'./img/chev1.jpg'},
    {id:2,
        marca:"Chevrolet",
        modelo:"Cruze",
        precio:8500000,
        imagen:'./img/chev2.jpg'},
    {id:3,
        marca:"Chevrolet",
        modelo:"Cobalt",
        precio:5800000,
        imagen:'./img/chev3.jpg'},
    {id:4,
        marca:"Toyota",
        modelo:"Yaris",
        precio:6500000,
        imagen:'./img/toy1.jpg'},
    {id:5,
        marca:"Toyota",
        modelo:"Corolla",
        precio:9500000,
        imagen:'./img/toy2.jpg'},
    {id:6,
        marca:"Toyota",
        modelo:"Ethios",
        precio:5000000,
        imagen:'./img/toy3.jpg'},
    {id:7,
        marca:"Fiat",
        modelo:"Cronos",
        precio:5500000,
        imagen:'./img/fiat1.jpg'},
    {id:8,
        marca:"Fiat",
        modelo:"Uno",
        precio:4500000,
        imagen:'./img/fiat2.jpg'},
    {id:9,
        marca:"Fiat",
        modelo:"Pulse",
        precio:7500000,
        imagen:'./img/fiat3.jpg'},
];

function llamadoMarcas(){
let salida = "";
for (const marca of marcas) {
    salida += `<div class="card col-md-3 img-fluid">
    <img src="./img/${marca}.jpg" class="card-img-top" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title">${marca}</h5>
      <p class="card-text">Elija su unidad.</p>
      <a href="#" onclick="renderAutos('${marca}')" class="btn btn-primary">seleccionar</a>
    </div>
  </div>`
}
document.getElementById('marcas').innerHTML = salida
}
llamadoMarcas();

function guardarAutosLS(){
    localStorage.setItem('autos',JSON.stringify(autos));
}

guardarAutosLS();

function cargarAutos() {
    return JSON.parse(localStorage.getItem("autos")) || [];
}

function renderAutos(opcion) {
    const productos = cargarAutos();
    let salida = "";
    
    for (producto of productos) {
        if (producto.marca === opcion){
        salida += `<div class="col-md-4 my-3">
            <div class="card text-center border-0">
                <img src="${producto.imagen}" alt="${producto.marca} ${producto.modelo}" class="card-img-top" />
                <div class="card-body">
                    <h3 class="card-text">${producto.marca}</h3>    
                    <h4 class="card-text">${producto.modelo} $ ${producto.precio}</h4>
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Cotizar</button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" onclick="cotizar(12,${producto.id})" href="#">12 Cuotas</a></li>
                            <li><a class="dropdown-item" onclick="cotizar(24,${producto.id})"href="#">24 Cuotas</a></li>
                            <li><a class="dropdown-item" onclick="cotizar(36,${producto.id})" href="#">36 Cuotas</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`
        }
    }

    document.getElementById("autos").innerHTML = salida;

}

function buscarVehiculo(id){
    const buscar = cargarAutos();
    return buscar.filter (elemento => elemento.id === id);
}

function cotizar(cuotas,id) {
    const busqueda = buscarVehiculo(id);
    let resultado = (((((cuotas/12)*45)/100)*busqueda[0].precio)+busqueda[0].precio);
   
    Swal.fire({
        icon: 'success',
        title: (busqueda[0].marca) + ' ' + (busqueda[0].modelo) + ' Plan de ' + cuotas +' cuotas',
        text: cuotas + ' cuotas de $: ' + Math.round(resultado/cuotas) + ' Monto final $ :' + resultado,
      })

      document.getElementById("autos").innerHTML = "";
      return resultado;
}