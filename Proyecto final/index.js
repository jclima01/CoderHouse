const formulario = document.getElementById("form");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const montoSolicitado = document.getElementById("montoSolicitado");
const cantidadDeCuotas = document.getElementById("cantidadDeCuotas");
const montoFinal = document.getElementById("montoFinal");
const cuotasFinales = document.getElementById("cuotasFinales");
const intereses = document.getElementById("intereses");
const montoTotalADevolver = document.getElementById("montoTotalADevolver");
const detallePrestamo = document.getElementById("detallePrestamo");

const interes = 0.15; 

// class Prestamo {
//     constructor(nombre,apellido,email,monto,cantidadDeCuotas){
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.email = email;
//         this.monto = monto;
//         this.cantidadDeCuotas = cantidadDeCuotas; 
//     }
// }

// var establecerDatos = function () {
//     nombre = document.getElementById("nombre").value
//     apellido = document.getElementById("apellido").value
//     email = document.getElementById("email").value
//     monto = document.getElementById('monto').value
//     cantidadDeCuotas = document.getElementById('cuotas').value
//     
// }


const CalcularCuotaPrestamo = () => {
  const cuotaPrestamo = (interes * montoSolicitado.value) / (1 - (1 + interes) ** -cantidadDeCuotas.value);
  obtenerTotal(cuotaPrestamo);

};

// Obtener el total del préstamo
const obtenerTotal = (cuotaPrestamo) => {
  const montoTotalADevolver = Math.ceil(cuotaPrestamo) * cantidadDeCuotas.value;

  // Creamos nuestro objeto
  const prestamo = {
    montoSolicitado: montoSolicitado.value,
    cantidadDeCuotas: cantidadDeCuotas.value,
    intereses: montoTotalADevolver - montoSolicitado.value,
    montoTotalADevolver: montoTotalADevolver,
  };

  pintarPrestamo(prestamo);
  guardarPrestamoStorage(prestamo);
};

const pintarPrestamo = (prestamo) => {
  montoFinal.textContent = `$${prestamo.montoSolicitado}`;
  cuotasFinales.textContent = `${prestamo.cantidadDeCuotas}`;
  intereses.textContent = `$${prestamo.intereses}`;
  montoTotalADevolver.textContent = `$${prestamo.montoTotalADevolver}`;
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  CalcularCuotaPrestamo();
});


const guardarPrestamoStorage = (prestamo) => {
  localStorage.setItem("prestamo", JSON.stringify(prestamo));
};

const obtenerPrestamoStorage = () => {
  const prestamoStorage = JSON.parse(localStorage.getItem("prestamo"));
  pintarPrestamo(prestamoStorage);
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("prestamo")) {
    obtenerPrestamoStorage();
  }
});





// cuota préstamo = (Monto * (TEM x (1 + TEM) ^ n)) / ((1 + TEM) ^ n) - 1)
// Monto (valor a ser prestado), n (numero de meses), TEM (Tasa Efectiva Mensual)