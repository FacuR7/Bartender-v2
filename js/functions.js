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

  carritoCompras.addEventListener('click', eliminarProducto)
}
Registro();

function agregarProducto(e) {
  
  if (e.target.classList.contains('agregarCarro')) {
  
    const productoSeleccionado = e.target.parentElement.parentElement;
    leerDatosProducto(productoSeleccionado);
  }  
}

function eliminarProducto(e) {
  if(e.target.classList.contains('borrar-producto')) {
    const productoId = e.target.getAttribute('data-id');

    articulosCarro = articulosCarro.filter(producto => producto.id !== productoId);

    carritoVisible();
    }
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
}

function limpiarHTML() {
  while(contenidoCarrito.firstChild) {
    contenidoCarrito.removeChild(contenidoCarrito.firstChild)
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
