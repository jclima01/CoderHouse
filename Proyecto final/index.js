const formulario = document.getElementById("formulario");


const nombre = document.getElementById("nombre");

const apellido = document.getElementById("apellido");
const email = document.getElementById("email");

const montoSolicitado = document.getElementById("montoSolicitado");
const cantidadDeCuotas = document.getElementById("cantidadDeCuotas");
const intereses = document.getElementById("intereses")
const interes = 0.14; 

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
//     montoSolicitado = document.getElementById('montoSolicitado').value
//     cantidadDeCuotas = document.getElementById('cantidadDeCuotas').value
//     
// }
function validarEmail(elemento){

  var texto = document.getElementById(elemento.id).value;
  var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  
  if (!regex.test(texto)) {
      document.getElementById("resultado").innerHTML = "Correo invalido";
  } else {
    document.getElementById("resultado").innerHTML = "";
  }

}
function validaNumericos(elemento) {
  if(elemento.charCode >= 48 && elemento.charCode <= 57){
    return true;
   }
   return false;        
}

const obtenerTotal = (cuotaPrestamo) => {
  const montoTotalADevolver = Math.ceil(cuotaPrestamo) * cantidadDeCuotas.value;

  const prestamo = {
    montoSolicitado: montoSolicitado.value,
    cantidadDeCuotas: cantidadDeCuotas.value,
    montoTotalADevolver: montoTotalADevolver,
    intereses: montoTotalADevolver - montoSolicitado.value,
   
  };

  pintarPrestamo(prestamo);
  guardarPrestamoStorage(prestamo);
};
const CalcularCuotaPrestamo = () => {
  const cuotaPrestamo = (interes * montoSolicitado.value) / (1 - (1 + interes) ** -cantidadDeCuotas.value);
  obtenerTotal(cuotaPrestamo);

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

