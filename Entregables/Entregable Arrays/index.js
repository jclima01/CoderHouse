
alert("Bienvenido al simulador de prestamos")
let ingreso = prompt(`¿Acepta las condiciones para ingreasr al simulador? si o no`).toLowerCase();

class Prestamo {
    constructor (nombre, montoPedido, cantidadDeCoutas) {
        this.nombre = nombre;
        this.montoPedido = montoPedido;
        this.cantidadDeCoutas = cantidadDeCoutas;
       
    }

    calcularPrecioCuota() {
        var precioCuota = 0;     
        if (this.cantidadDeCoutas === 3) {
            this.montoPedido = this.montoPedido * 1.30;
            alert(`${this.nombre}, su monto con interes: ${this.montoPedido}`);
            precioCuota = this.montoPedido / 3;
            alert(`${this.nombre}, El precio de su cuota es ${precioCuota}`);
        } else if (this.cantidadDeCoutas === 6) {
            montoPedido = this.montoPedido * 1.35;
            alert(`${this.nombre}, su monto con interes: ${this.montoPedido}`);
            precioCuota = this.montoPedido / 6
            alert(`${this.nombre}, El precio de su cuota es ${precioCuota}`);
        } else if (this.cantidadDeCoutas === 12) {
            montoPedido = this.montoPedido * 1.45;
            alert(`${this.nombre}, su monto con interes: ${this.montoPedido}`);
            precioCuota = this.montoPedido / 12;
            alert(`${this.nombre}, El precio de su cuota es ${precioCuota}`);
        } else {
            alert("ingreso cuotas invalidas.");
        }

    }
   
    

}

let prestamos = [];
prestamos.push(new Prestamo(prompt("ingrese su nombre"), parseInt(prompt("ingrese el monto solicitado")) , parseInt(prompt("ingrese la cantidad de cuotas, puede elegir entre 3, 6 o 12"))));
for (const prestamo of prestamos) {
    prestamo.calcularPrecioCuota()
}
console.log(prestamos)