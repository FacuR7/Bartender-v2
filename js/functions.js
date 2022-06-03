function openMenu() {
  document.getElementById("sidebarMenu").style.width = "300px";
}

function closeMenu() {
  document.getElementById("sidebarMenu").style.width = "0";
}
function openCarro() {
  document.getElementById("sidebarCarro").style.width = "300px";
}

function closeCarro() {
  document.getElementById("sidebarCarro").style.width = "0";
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
  document.querySelector(".subtitulos").classList.toggle("modoOscuro");
  document.querySelector(".indexProductos").classList.toggle("modoOscuro");
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
}
Registro();

function agregarProducto(e) {
  const productoSeleccionado = e.target.parentElement.parentElement;
  leerDatosProducto(productoSeleccionado);
}

function leerDatosProducto(productoSeleccionado) {
  const infoProducto = {
    imagen: productoSeleccionado.querySelector('img').src,
    titulo: productoSeleccionado.querySelector('h1').textContent,
    precio: productoSeleccionado.querySelector('.precio').textContent,
    cantidad: 1,
  }
  articulosCarro = [...articulosCarro, infoProducto]
  console.log(articulosCarro);
  carritoVisible();
}

function carritoVisible() {

  articulosCarro.forEach( producto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
          ${producto.titulo}

      </td>
    `;

    contenidoCarrito.appendChild(row);
  })
}
function limpiarHTML() {
  while(articulosCarro.firstChild) {
    articulosCarro.removeChild(articulosCarro.firstChild)
  }
}
