








class Prestamo {
    constructor (nombre, montoPedido, cantidadDeCoutas) {
        this.nombre = nombre;
        this.montoPedido = montoPedido;
        this.cantidadDeCoutas = cantidadDeCoutas;
       
    }

   
    calcularPrecioCuota() {
        let precioCuota = 0
        let interesAnual = 0.25

        if (this.cantidadDeCoutas === 3) {
            this.montoPedido = this.montoPedido + this.montoPedido * interesAnual/12*3;
            precioCuota = this.montoPedido / 3;
        } else if (this.cantidadDeCoutas === 6) {
            this.montoPedido = this.montoPedido + this.montoPedido * interesAnual/12*6;
            precioCuota = this.montoPedido / 6
        } else if (this.cantidadDeCoutas === 12) {
            this.montoPedido = this.montoPedido + this.montoPedido * interesAnual/12*12;
            precioCuota = this.montoPedido / 12;
        } else {
            alert("ingreso cuotas invalidas.");
        }
        return precioCuota;
    }
   
    

}

const prestamos = [];
alert("Primer Prestamo")
prestamos.push(new Prestamo(prompt("ingrese su nombre"), parseInt(prompt("ingrese el monto solicitado")) , parseInt(prompt("ingrese la cantidad de cuotas, puede elegir entre 3, 6 o 12"))));
alert("Segundo Prestamo")
prestamos.push(new Prestamo(prompt("ingrese su nombre"), parseInt(prompt("ingrese el monto solicitado")) , parseInt(prompt("ingrese la cantidad de cuotas, puede elegir entre 3, 6 o 12"))));

let prestamosEn3 = prestamos.filter(element => element.cantidadDeCoutas === 3)
let prestamosEn6 = prestamos.filter(element => element.cantidadDeCoutas === 6)
let prestamosEn12 = prestamos.filter(element => element.cantidadDeCoutas === 12)

let contenedor = document.getElementById("contenedor")
for (const prestamo of prestamos) {
    let div = document.createElement("div")
    div.innerHTML =`
        <h3>Nombre: ${prestamo.nombre}</h3>
        <p>Monto pedido:${prestamo.montoPedido}</p>
        <p>Cuotas solicitadas:${prestamo.cantidadDeCoutas}</p>
        <p>Precio cuota:${prestamo.calcularPrecioCuota()}</p>
    `;
    contenedor.append(div);
}


