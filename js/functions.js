//Alerta Mayor de edad//

function mayorEdad () {
  Swal.fire({
    title: 'Bienvenid@ a Bartender!',
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
        'A disfrutar de la tienda!',
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
  document.querySelector(".botonVaciar").classList.toggle("modoOscuroClaro");
  document.querySelector(".botonFin").classList.toggle("modoOscuroClaro");
  document.querySelector(".dropdown_contenido a").classList.toggle("modoOscuroClaro");

  let textoSidebar = document.querySelectorAll(".sidebarTexto a");
  textoSidebar.forEach(texto => {
    texto.classList.toggle("modoOscuroTexto");
  });
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
  
  let logo = document.querySelector(".logoMenu");
  if (logo.style.display === "none") {
    logo.style.display = "block";
  } else {
    logo.style.display = "none";
  }

  let logoBlanco = document.querySelector(".logoMenuBlanco");
  if (logoBlanco.style.display === "block") {
    logoBlanco.style.display = "none";
  } else {
    logoBlanco.style.display = "block";
  }

  let logoMenu = document.querySelector(".logoNombre");
  if (logoMenu.style.display === "none") {
    logoMenu.style.display = "block";
  } else {
    logoMenu.style.display = "none";
  }
  let logoMenuBlanco = document.querySelector(".logoNombreBlanco");
  if (logoMenuBlanco.style.display === "block") {
    logoMenuBlanco.style.display = "none";
  } else {
    logoMenuBlanco.style.display = "block"; 
  }
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
      <td  class="borrar-producto" data-id="${producto.id}"><ion-icon name="trash-outline"></ion-icon></td>  
    `;

    contenidoCarrito.appendChild(row);
  })
}

// Calcular el total del carrito
let totalCarro = 0;

function calcularTotal () {
  totalCarro = 0;
  articulosCarro.forEach( producto => {
    console.log(totalCarro);
    console.log(producto.precio);
    console.log(producto.cantidad);
    totalCarro = totalCarro + producto.precio * producto.cantidad;
    document.getElementById("totalNumero").innerHTML = "$" + totalCarro;
  })
  console.log(totalCarro);
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
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
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

// ventana emergente fin de compra //

let modal = document.getElementById("myModal");
let boton = document.getElementById("botonFin");
let span = document.getElementsByClassName("close")[0];

boton.onclick = function() {
  modal.style.display = "block";
  closeCarro();
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Ventana de calculo de cuotas //

function continuarPago() {
  let modalEnvio = document.getElementById("myModal");
  let modalPago = document.getElementById("modalPago");

  modalEnvio.style.display = "none";
  modalPago.style.display = "block";
}
function volverPago() {
  let modalEnvio = document.getElementById("myModal");
  let modalPago = document.getElementById("modalPago");
  let contenidoCuotas = document.getElementById("contenidoCuotas");

  modalEnvio.style.display = "block";
  modalPago.style.display = "none";
  contenidoCuotas.innerHTML = "";
}

function calcularCuotas() {

  let nombre = document.getElementById("firstname").value;
  let apellido = document.getElementById("lastname").value;
  let direccion = document.getElementById("address").value;
  let ciudad = document.getElementById("city").value;
  let provincia = document.getElementById("state").value;
  let codigoPostal = document.getElementById("zipcode").value;
  let total = document.getElementById("totalNumero").value;
  let cuotas = document.getElementById("cuotas").value;
  let botonContinuar = document.getElementById("botonPago");
  let modalEnvio = document.getElementById("myModal")
  let modalPago = document.getElementById("modalPago")
  let contenidoCuotas = document.getElementById("contenidoCuotas");

  if (cuotas === "1") {
    contenidoCuotas.innerHTML = `<h2 id="subtituloPago">Resumen de compra</h2>
    <p id="mensajePago">Por favor, revise que los datos sean correctos</p>
    <div id="datosEnvio">
      <p>Nombre: ${nombre}</p>
      <p>Apellido: ${apellido}</p>
      <p>Direccion de envio: ${direccion}, ${codigoPostal}, ${ciudad}, ${provincia}</p>
      <p class="totalPago">Total: $${totalCarro}</p>
    </div>
    <hr/ > 
    <p id="mensajePago">Ingrese su correo electronico para recibir actualizaciones de su pedido y ofertas especiales</p>
    <label class="field">
      <span class="field__label" for="firstname">Correo electronico</span>
      <input class="field__input" type="text" id="firstname"/>
    </label>`;
  }
  if (cuotas === "3") {
    valorCuota = totalCarro / 3;
    let valorCuotaFinal = valorCuota.toFixed(2);
    contenidoCuotas.innerHTML = `<h2 id="subtituloPago">Resumen de compra</h2>
    <p id="mensajePago">Por favor, revise que los datos sean correctos</p>
    <div id="datosEnvio">
      <p>Nombre: ${nombre}</p>
      <p>Apellido: ${apellido}</p>
      <p>Direccion de envio: ${direccion}, ${codigoPostal}, ${ciudad}, ${provincia}</p>
      <p class="totalPago">Total: $${totalCarro}</p>
      <p class="totalCuotas">3 Cuotas sin interes de $${valorCuotaFinal}</p>
    </div>
    <hr/ > 
    <p id="mensajePago">Ingrese su correo electronico para recibir actualizaciones de su pedido y ofertas especiales</p>
    <label class="field">
      <span class="field__label" for="firstname">Correo electronico</span>
      <input class="field__input" type="text" id="firstname"/>
    </label>`;
  }
  if (cuotas === "6") {
    valorCuota = totalCarro / 6;
    let valorCuotaFinal = valorCuota.toFixed(2);
    contenidoCuotas.innerHTML = `<h2 id="subtituloPago">Resumen de compra</h2>
    <p id="mensajePago">Por favor, revise que los datos sean correctos</p>
    <div id="datosEnvio">
      <p>Nombre: ${nombre}</p>
      <p>Apellido: ${apellido}</p>
      <p>Direccion de envio: ${direccion}, ${codigoPostal}, ${ciudad}, ${provincia}</p>
      <p class="totalPago">Total: $${totalCarro}</p>
      <p class="totalCuotas">6 Cuotas sin interes de $${valorCuotaFinal}</p>
    </div>
    <hr/ > 
    <p id="mensajePago">Ingrese su correo electronico para recibir actualizaciones de su pedido y ofertas especiales</p>
    <label class="field">
      <span class="field__label" for="firstname">Correo electronico</span>
      <input class="field__input" type="text" id="firstname"/>
    </label>`;
  }
}

function closePago() {
  let modalEnvio = document.getElementById("myModal");
  let modalPago = document.getElementById("modalPago");

  modalEnvio.style.display = "none";
  modalPago.style.display = "none";
}

// al tocar el boton de finalizar compra //

function finalizarCompra() {
  let modalEnvio = document.getElementById("myModal");
  let modalPago = document.getElementById("modalPago");

  modalEnvio.style.display = "none";
  modalPago.style.display = "none";

  articulosCarro = [];
  limpiarHTML();
  document.getElementById("totalNumero").innerHTML = "$0";
  calcularTotal()

  Swal.fire({
    title: 'Gracias por tu compra!',
    text: 'Recibiras los detalles en tu email',
    imageUrl: './assets/Logo.png',
    imageWidth: 140,
    imageHeight: 150,
    imageAlt: 'Custom image',
  })
}

// Ventana de Contacto //


let modalContacto = document.getElementById("modalContacto");
let botonContacto = document.getElementById("botonContacto");
let spanContacto = document.getElementById("cerrar");
let botonFinContacto = document.getElementById("botonFinContacto");
let contactoFooter = document.getElementById("contactoFooter");

botonContacto.onclick = function() {
  modalContacto.style.display = "block";
  closeMenu();
}
spanContacto.onclick = function() {
  modalContacto.style.display = "none";
}
window.onclick = function(event) {
  if (event.target === modalContacto) {
    modalContacto.style.display = "none";
  }
}
botonFinContacto.onclick = function() {
  modalContacto.style.display = "none";

  Swal.fire({
    title: 'Gracias por contactarte!',
    text: 'Recibiras una respuesta a la brevedad en tu correo electronico',
    imageUrl: './assets/Logo.png',
    imageWidth: 140,
    imageHeight: 150,
    imageAlt: 'Custom image',
  })
}
contactoFooter.onclick = function() {
  modalContacto.style.display = "block";
  closeMenu();
}  

// Funcion "Elegi tu Trago" //

function openTragos() {

  let modalTragos = document.getElementById("modalTragos");

  modalTragos.style.display = "block";
  closeMenu();
}

function closeTragos() {
  let modalTragos = document.getElementById("modalTragos");

  modalTragos.style.display = "none";
}

function tragos() {
  let tragoSeleccionado = document.getElementById("tragos").value;
  let contenidoTrago = document.getElementById("contenidoTragos");
  let botonTragos = document.getElementById("botonTragos");

  if (tragoSeleccionado === "1") {
    contenidoTrago.innerHTML = `
    <h2 id="subtituloTrago">Fernet-Cola</h2>
    <div id="datosTrago">
      <img src="./assets/Fernet-coca.jpg" alt="FernetCola" style="width:42%;">
      <ion-icon name="reorder-two-outline" style="font-size: 12rem; font-weight: bold;"></ion-icon>
      <div id="productosTrago">
        <img src="./assets/Branca.jpg" alt="Branca" style="width:60%;">
        <img src="./assets/CocaCola.jpg" alt="coca" style="width:60%;">
      </div>
    </div>
    <hr>
    <button id="botonTragos" class="button">Añadir al Carro ($1230)</button>`;

    let botonTragos = document.getElementById("botonTragos");

    botonTragos.onclick = function() {

      let productoSeleccionado = document.getElementById("fernet");
      leerDatosProducto(productoSeleccionado);

      productoSeleccionado = document.getElementById("coca");
      leerDatosProducto(productoSeleccionado);

      calcularTotal();
      closeTragos();  
      openCarro();
      
    }
  }
  if (tragoSeleccionado === "2") {
    contenidoTrago.innerHTML = `
    <h2 id="subtituloTrago">Cuba Libre</h2>
    <div id="datosTrago">
      <img src="./assets/CubaLibre.jpg" alt="CubaLibre" style="width:42%;">
      <ion-icon name="reorder-two-outline" style="font-size: 12rem; font-weight: bold;"></ion-icon>
      <div id="productosTragoTriple">
        <img src="./assets/RonHavana.jpg" alt="ron" style="width:100%;">
        <img src="./assets/CocaCola.jpg" alt="coca" style="width:100%;">
        <img src="./assets/Lima.jpg" alt="lima" style="width:80%; grid-area:producto3;">
      </div>
    </div>
    <hr>
    <button id="botonTragos" class="button">Añadir al Carro ($2230)</button>`;

    let botonTragos = document.getElementById("botonTragos");

    botonTragos.onclick = function() {

      let productoSeleccionado = document.getElementById("ron");
      leerDatosProducto(productoSeleccionado);

      productoSeleccionado = document.getElementById("coca");
      leerDatosProducto(productoSeleccionado);

      productoSeleccionado = document.getElementById("lima");
      leerDatosProducto(productoSeleccionado);

      calcularTotal();
      closeTragos();  
      openCarro();
      
    }
  }
  if (tragoSeleccionado === "3") {
    contenidoTrago.innerHTML = `
    <h2 id="subtituloTrago">Campari Orange</h2>
    <div id="datosTrago">
      <img src="./assets/CampariOrange.jpg" alt="CampariOrange" style="width:42%;">
      <ion-icon name="reorder-two-outline" style="font-size: 12rem; font-weight: bold;"></ion-icon>
      <div id="productosTrago">
        <img src="./assets/Campari.png" alt="campari" style="width:60%;">
        <img src="./assets/Citric.webp" alt="citric" style="width:60%;">
      </div>
    </div>
    <hr>
    <button id="botonTragos" class="button">Añadir al Carro ($970)</button>`;

    let botonTragos = document.getElementById("botonTragos");

    botonTragos.onclick = function() {

      let productoSeleccionado = document.getElementById("campari");
      leerDatosProducto(productoSeleccionado);

      productoSeleccionado = document.getElementById("citricNaranja");
      leerDatosProducto(productoSeleccionado);

      calcularTotal();
      closeTragos();  
      openCarro();
      
    }
  }
}
