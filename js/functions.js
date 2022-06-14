//Alerta Mayor de edad//

function mayorEdad () {
  Swal.fire({
    title: 'Sos Mayor de edad?',
    text: "Debes tener al menos 18 años para entrar a la tienda",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Soy mayor de 18 años',
    cancelButtonText: 'No, abandonar la tienda',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Perfecto!',
        'Bienvenid@ a Bartender',
        'OK'
      ) 
    }
    else if (result.dismiss === Swal.DismissReason.cancel) {
      document.querySelector("body").innerHTML = "";
      Swal.fire(
        'Cancelado',
        'Debes ser mayor de 18 años para entrar a la tienda',
        'OK'
      )

    } 
  })
}
mayorEdad();

//Apertura y cerrado de menu y carro //

function openMenu() {
  document.getElementById("sidebarMenu").style.width = "300px";
  document.getElementById("sidebarMenu").classList.add("sidebarSombra");
  document.getElementById("sidebarCarro").classList.remove("carroSombra");
}

function closeMenu() {
  document.getElementById("sidebarMenu").style.width = "0";
  document.getElementById("sidebarMenu").classList.remove("sidebarSombra");
}
function openCarro() {
  document.getElementById("sidebarCarro").style.width = "300px";
  document.getElementById("sidebarCarro").classList.add("carroSombra");
  document.getElementById("sidebarMenu").classList.remove("sidebarSombra");
}

function closeCarro() {
  document.getElementById("sidebarCarro").style.width = "0";
  document.getElementById("sidebarCarro").classList.remove("carroSombra");
}
function openCategorias() {
  document.getElementById("sidebarMenu").style.width = "0";
  let container = document.getElementById("dropdown_contenido");
  container.className = "dropdownAbierto";
}
function cierraMenu() {
  let container = document.getElementById("dropdown_contenido");
  container.className = "dropdown_contenido";
}
function myFunction() {
  document.getElementById("dropdown_contenido").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches('.dropdown_boton')) {
    var dropdowns = document.getElementsByClassName("dropdown_contenido");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Modo Oscuro //

function modoOscuro () {
  document.querySelector(".sidebar").classList.toggle("modoOscuro");
  document.querySelector("body").classList.toggle("modoOscuro");
  document.querySelector("header").classList.toggle("modoOscuro");
  document.querySelector(".sidebarCarro").classList.toggle("modoOscuro");
  document.querySelector(".promos").classList.toggle("modoOscuro");
  document.querySelector(".dropdown").classList.toggle("modoOscuro");
  document.querySelector(".dropdown_boton").classList.toggle("modoOscuroClaro");
  document.querySelector(".dropdown_contenido a").classList.toggle("modoOscuroClaro");
  let botonesAgregarCarro = document.querySelectorAll(".agregarCarro");
  botonesAgregarCarro.forEach(boton => {
    boton.classList.toggle("modoOscuroClaro");
  });
  let subtitulos = document.querySelectorAll(".subtitulos");
  subtitulos.forEach(subtitulo => {
    subtitulo.classList.toggle("modoOscuro");
  });
  let productos = document.querySelectorAll(".indexProductos");
  productos.forEach(producto => {
    producto.classList.toggle("modoOscuro");
  });
  
}

//Carrito de compras//

const carritoCompras = document.getElementById("carro");
const contenidoCarrito = document.getElementById("contenidoCarrito");
const vaciarCarrito = document.getElementById("botonVaciar");
const listaBebidas = document.getElementById("listaBebida");
const listaBebidasSinAlc = document.getElementById("listaBebidaSinAlc");
const listaEspecias = document.getElementById("listaEspecia");
let articulosCarro = [];


const Registro = () => {
  listaBebidas.addEventListener('click', agregarProducto);
  listaBebidasSinAlc.addEventListener('click', agregarProducto);
  listaEspecias.addEventListener('click', agregarProducto);

  carritoCompras.addEventListener('click', eliminarProducto)

  vaciarCarrito.addEventListener('click', ()=> {
    articulosCarro = [];
    limpiarHTML();
    document.getElementById("totalNumero").innerHTML = "$0";
    calcularTotal();
  })
}
Registro();

function agregarProducto(e) {
  
  if (e.target.classList.contains('agregarCarro')) {
  
    const productoSeleccionado = e.target.parentElement.parentElement;
    leerDatosProducto(productoSeleccionado);
    calcularTotal();
    openCarro();
  }
}

function eliminarProducto(e) {
  if(e.target.classList.contains('borrar-producto')) {
    const productoId = e.target.getAttribute('data-id');

    articulosCarro = articulosCarro.filter(producto => producto.id !== productoId);

    carritoVisible();
  }
  calcularTotal();  
}

function leerDatosProducto(productoSeleccionado) {
  const infoProducto = {
    imagen: productoSeleccionado.querySelector('img').src,
    titulo: productoSeleccionado.querySelector('h1').textContent,
    precio: productoSeleccionado.querySelector('.precio').textContent,
    id: productoSeleccionado.querySelector('button').getAttribute('data-id'),
    cantidad: 1,
  }

  const existe = articulosCarro.some ( producto => producto.id === infoProducto.id);
  if(existe) {
    const productos = articulosCarro.map( producto => {
      if(producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
    articulosCarro = [...productos];
  } else {
    articulosCarro = [...articulosCarro, infoProducto]
  }
  console.log(articulosCarro);
  carritoVisible();
  calcularTotal();
}

function limpiarHTML() {
  while(contenidoCarrito.firstChild) {
    contenidoCarrito.removeChild(contenidoCarrito.firstChild);
  }
}

function carritoVisible() {

  limpiarHTML();

  articulosCarro.forEach( producto => {
    const row = document.createElement('tr');
    row.setAttribute("id", "productoCarrito")
    row.innerHTML = `
      <td><img src="${producto.imagen}" witdh="60rem" height="70rem" /></td>
      <td>${producto.titulo}</td>
      <td style="font-size:1rem; font-weight:bold">${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td class="borrar-producto" data-id="${producto.id}"><ion-icon name="trash-outline"></ion-icon></td>  
    `;

    contenidoCarrito.appendChild(row);
  })
}

// Calcular el total del carrito

function calcularTotal () {
  
  let total = 0;
articulosCarro.forEach( producto => {
  console.log(total);
  console.log(producto.precio);
  console.log(producto.cantidad);
  total = total + producto.precio * producto.cantidad;
  console.log(total);
  document.getElementById("totalNumero").innerHTML = "$" + total;
  })
}

//Consultar API para hora y ubicacion (no aplica al proyecto pero es para el desafio)//
const kelvin = 273.15;

const obtenerClima = () => {
  let ciudad = "Argentina";
  let pais = "AR";
  consultarAPI(ciudad, pais);
}

const consultarAPI = async (ciudad, pais) => {
  const apiKey = "14b998e11d412cab5b7d0dffc9be38f1";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();

  const {
    name,
    main
  } = resultado;

  let divResultado = document.querySelector("#temp");
  //cálculo para convertir grados kelvin a celsius - el codigo &#x2103 aplica el simbolo de grados
  divResultado.innerHTML = `<p>${name}</br>${parseFloat(main.temp-kelvin,10).toFixed(1)} <span> &#x2103;</span></p>`;
}

obtenerClima();