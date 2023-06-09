
Swal.fire({
  title: '¡Atención!',
  text: "Última llamada a tu próximo viaje",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '¡Si,acepto!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      '¡Perfecto!',
      'Busquemos tu destino ideal.',
      'success'
    )
  }
})


// Array de destinos
const destinos = ['Mexico', 'Colombia', 'New York', 'Francia'];

// Obtener elementos del DOM
const destinoInput = document.getElementById('destinoInput');
const buscarDestinoButton = document.getElementById('buscarDestino');
const resultadoDestino = document.getElementById('resultadoDestino');

// Evento de click para buscar el destino
buscarDestinoButton.addEventListener('click', buscarDestino);


function buscarDestino() {
  const nombreDestino = destinoInput.value;

  // Método find() para buscar el destino
  let destinoEncontrado = destinos.find(destino => destino === nombreDestino);

  if (destinoEncontrado) {
    resultadoDestino.textContent = `Usted seleccionó vuelo a ${destinoEncontrado}`;
  } else {
    resultadoDestino.textContent = 'No encontramos vuelos para su destino';
  }


  // Guardar el destino en storage como JSON
  localStorage.setItem('destino', JSON.stringify(destinoEncontrado));
}

// Función abstracción para sumar millas
function sumarMillas(millasActuales, millasNuevas) {
  return millasActuales + millasNuevas;
}

// Obtener elementos del DOM
const millasActualesInput = document.getElementById('millasActualesInput');
const millasNuevasInput = document.getElementById('millasNuevasInput');
const calcularMillasButton = document.getElementById('calcularMillas');
const resultadoMillas = document.getElementById('resultadoMillas');

// Evento de click para calcular las millas
calcularMillasButton.addEventListener('click', calcularMillas);

function calcularMillas() {
  const millasActuales = parseInt(millasActualesInput.value);
  const millasNuevas = parseInt(millasNuevasInput.value);

  const millasTotales = sumarMillas(millasActuales, millasNuevas);

  resultadoMillas.textContent = `Las millas totales son: ${millasTotales}`;

  // Guardar las millas totales en storage como JSON
  localStorage.setItem('millasTotales', JSON.stringify(millasTotales));
}

// Obtener el destino y las millas totales guardadas en storage (si existen)

window.addEventListener('DOMContentLoaded', () => {
  const destinoGuardado = localStorage.getItem('destino');
  const millasTotalesGuardadas = localStorage.getItem('millasTotales');

  if (destinoGuardado) {
    resultadoDestino.textContent = `Usted seleccionó vuelo a ${JSON.parse(destinoGuardado)}`;
    resultadoDestino.classList.add('highlight');
  }

  if (millasTotalesGuardadas) {
    resultadoMillas.textContent = `Las millas totales son: ${JSON.parse(millasTotalesGuardadas)}`;
    resultadoMillas.classList.add('highlight');
  }
});

//-----------EVENTOS ---------------


// Evento mouseover para cambiar el botón buscarDestino

buscarDestinoButton.addEventListener('mouseover', () => {
  buscarDestinoButton.style.backgroundColor = 'green';
  buscarDestinoButton.style.color = "white"
});


// Evento mouseover para cambiar el color de fondo del botón CalcularMillas
buscarDestinoButton.addEventListener('mouseover', () => {
  calcularMillasButton.style.backgroundColor = 'yellow';
});


//--- FETCH ---------


const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
  const response = await fetch("data.json");

  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price">${product.precio} $</p>
    `;
  
    shopContent.append(content);
  
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";
  
    content.append(comprar);
  
    comprar.addEventListener("click", () => {
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
  
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        saveLocal();
      }
    });
  });
}



//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
