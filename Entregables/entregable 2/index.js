alert("Bienvenido al simulador de prestamos")
let simulador = function () {

    let ingreso = prompt("Acepta las condiciones para ingreasr al simulador? si o no").toLowerCase()
    if (ingreso === "si") {
        let calcularPrecioCuota = function () {
            let montoPedido = parseInt(prompt("ingrese el monto solicitado"))
            let cantidadDeCoutas = parseInt(prompt("ingrese la cantidad de cuotas, puede elegir entre 3, 6 o 12"))
            
            if (cantidadDeCoutas === 3) {
                montoPedido = montoPedido * 1.30;
                alert(`monto con interes: ${montoPedido}`)
                precioCuota = montoPedido / 3;
                alert(`El precio de su cuota es ${precioCuota}`);
            } else if (cantidadDeCoutas === 6) {
                montoPedido = montoPedido * 1.35;
                alert(`monto con interes: ${montoPedido}`)
                precioCuota = montoPedido / 6
                alert(`El precio de su cuota es ${precioCuota}`);
            } else if (cantidadDeCoutas === 12) {
                montoPedido = montoPedido * 1.45;
                alert(`monto con interes: ${montoPedido}`)
                precioCuota = montoPedido / 12;
                alert(`El precio de su cuota es ${precioCuota}`);
            } else {
                alert("ingreso cuotas invalidas.");
            }

        }
        calcularPrecioCuota()
    } else {
        alert("no acepto las condiciones")
    }
}

simulador()