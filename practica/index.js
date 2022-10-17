// class Producto {
//     constructor(id, nombre, precio, descripcion, imagen) {
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = precio;
//         this.descripcion = descripcion;
//         this.imagen = imagen;

//     }
// }

// let productsDB = [new Producto(1, 'Calabresa', 1950, 'Pizza de Muzzarella, Longaniza Calabresa, Morrones, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'https://i.ibb.co/27zLq3m/Calabresa.png'),
// new Producto(2, 'Especial', 2000, "Pizza de Muzzarella, Jamon Natural, Morrones , Salsa de Tomate, Condimentos y Aceitunas Verdes.", 'https://i.ibb.co/5cn3fQW/Especial.png'),
// new Producto(3, 'Fugazza', 1050, 'Pizza de Cebolla, Condimentos y Aceitunas Verdes. (sin Quesos)', 'https://i.ibb.co/MV4TzFG/Fugazza.png'),
// new Producto(4, 'Muzza y jamon', 1950, 'Pizza de Muzzarella, Jamon Natural, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'https://i.ibb.co/Dz9H9kr/Muzza-y-jamon.png'),
// new Producto(5, 'Muzza y Morron', 1950, 'Pizza de Muzzarella, Morrones, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'https://i.ibb.co/Qjn7RSP/Muzza-y-Morron.png'),
// new Producto(6, 'Muzzarella', 1950, 'Pizza de Muzzarella, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'https://i.ibb.co/x8XQjc6/Muzzarella.png')
// ]
// console.log(JSON.stringify(productsDB))

let url = 'https://633ef66c83f50e9ba3bcfbe2.mockapi.io/Api'
let carrito = [];
let productsDB = []
const items = document.querySelector("#items");
const carritoHTML = document.querySelector("#carrito");
const botonVaciar = document.querySelector("#boton-vaciar");
const botonAgregar = document.getElementById("boton-agregar")
const botonEliminar = document.getElementById("boton-eliminar");
const botonEnviar = document.getElementById("boton-enviar");
//cargando data desde API
let cargarDatos = async () => {
    await fetch(url)
        .then(response => response.json())
        .then(data => {

            productsDB = [...data]
            guardarProductosStorage()
            renderizarProductos()
        })
}
cargarDatos()
//storage
let guardarCarritoStorage = () => {
    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
}
let guardarProductosStorage = () => {
    localStorage.setItem("productsDBStorage", JSON.stringify(productsDB));

}

let obtenerProductosStorage = () => {
    if (localStorage.getItem("productsDBStorage") != null) {
        productsDB = JSON.parse(localStorage.getItem("productsDBStorage"))
    }
}
let obtenerCarritoStorage = () => {
    if (localStorage.getItem("carritoStorage") != null) {
        productsDB = JSON.parse(localStorage.getItem("carritoStorage"))
    }
}


// Checks
let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage"));
carritoStorage ? carrito = carritoStorage : carrito = []
let productsDBStorage = JSON.parse(localStorage.getItem("productsDBStorage"))
productsDBStorage ? productsDB = productsDBStorage : {}


renderizarCarrito();
calcularTotal();

function renderizarProductos() {
    let productoHTML = ""

    productsDB.forEach((prod) => {
        productoHTML = `
        <div class="col-12 col-md-4 nb-5 d-flex p-1 justify-content-center">
        <div class="card text-light bg-dark" style="width: 18rem;">
            <img class="card-Img-top" src="${prod?.imagen}" alt="card image cap">
            <div class="card-body">
                <h5 class="card-title">${prod?.nombre}</h5>
                <p class="card-text">${prod?.descripcion}</p>
                <p>$${prod?.precio}
                <button class="btn btn-primary" onclick="agregarProductoAlCarrito(${prod.id})">Añadir al carrito</button>
            </div>
            </div> 
        `;
        items.innerHTML += productoHTML;
        // 
    });

}
//carrito
function agregarProductoAlCarrito(id) {

    let producto = productsDB.find((producto) => producto.id === id)

    let productoEnCarrito = carrito.find((producto) => producto.id === id)
    productoEnCarrito ? productoEnCarrito.cantidad++ : (producto.cantidad = 1,
        carrito.push(producto))
    guardarCarritoStorage()
    renderizarCarrito()
    calcularTotal()

}
function renderizarCarrito() {
    htmlCarrito = ""
    carrito.forEach((prod, id) => {
        htmlCarrito += `

        <div class="card w-50 p-1 >
            
            <div class="card-body p-1">
                <img class="card-Img-top" src="${prod?.imagen}" alt="card image cap">
                <h5 class="card-title">${prod?.nombre}</h5>
                <p class="card-text">Cantidad: ${prod?.cantidad}</p>
                <button class="btn btn-danger" onclick="eliminarProductoDelCarrito(${id})">Eliminar</button>
            </div>
        </div>
        `
            ;

        carritoHTML.innerHTML = htmlCarrito;
    });

}
function calcularTotal() {

    let total = 0;
    carrito.forEach((prod) => {
        total += prod.precio * prod.cantidad
    });


    const t = document.getElementById("total");
    t.innerHTML = `<h5>$${total}</h5>`

}
function eliminarProductoDelCarrito(id) {

    carrito[id].cantidad--;
    carrito[id].cantidad === 0 && carrito.splice(id, 1)

    carrito.length === 0 && (carritoHTML.innerHTML = "");
    guardarCarritoStorage();
    calcularTotal();

    renderizarCarrito();

}
function vaciarCarrito() {
    carrito = [];
    carrito.length === 0 && (carritoHTML.innerHTML = "");
    guardarCarritoStorage();

    renderizarCarrito();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Carrito vacio!',
        showConfirmButton: false,
        timer: 800
    })
    calcularTotal();


}
function iniciarChat() {
    obtenerCarritoStorage();
    let total = document.getElementById("total")
    let direccion = document.getElementById("direccion").value;
    let nombreUsuario = document.getElementById("nombre-usuario").value;
    let apellidoUsuario = document.getElementById("apellido-usuario").value;
    let telefonoUsuario = document.getElementById("telefono-usuario").value;

    let mensaje = `Nombre: ${nombreUsuario}
                    %0AApellido: ${apellidoUsuario}
                    %0ATeléfono: ${telefonoUsuario}
                    %0ADirección: ${direccion}
                    %0ASu pedido es:`
    carrito.forEach(producto => {

        mensaje += `%0A*${producto.nombre} - ${producto.cantidad}, 
        `;
    });
    mensaje += `%0ATotal: ${total.textContent}`



    botonEnviar.href = `https://wa.me/5492235304745?text=${mensaje}`

    guardarCarritoStorage()

}
//catalogo
async function eliminarProducto() {
    obtenerProductosStorage()
    let nombre = document.getElementById("nombre-eliminar").value.toLowerCase()
    let producto = productsDB.find((producto) => producto.nombre.toLowerCase() === nombre)
    let productoIx = productsDB.indexOf(producto)
    console.log(productoIx)
    console.log(producto.id)

    if (productoIx != -1) {
        productsDB.splice(productoIx, 1)
        await fetch(`https://633ef66c83f50e9ba3bcfbe2.mockapi.io/Api/${producto.id}`, {
        method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => console.log(data))
        ;
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto eliminado',
            showConfirmButton: false,
            timer: 800
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Producto no encontrado',
            footer: '<a href="">Ingrese un producto válido</a>'
        })
    }

    guardarProductosStorage()

}
function isValidImageURL(imagen) {
    if (typeof imagen !== 'string') return false;
    return !!imagen.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
}
async function agregarNuevosProducto() {

    obtenerProductosStorage()

    let lastProduct = productsDB[productsDB.length - 1]
    let id = lastProduct.id + 1;
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;
    if (productsDB.find((producto) => producto.nombre === nombre)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Producto ya existente',
            footer: '<a>Ingrese un producto nuevo</a>'
        })
    } else if (!isValidImageURL(imagen)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ruta de la imagen invalida',
            footer: '<a>Ingrese una ruta valida</a>'
        })
    } else {
        productsDB.push(
            {
                id: parseInt(id),
                nombre: nombre,
                precio: precio,
                descripcion: descripcion,
                imagen: imagen
            }
        );
        await fetch(url,
            {
                method: 'POST',
                body: JSON.stringify(productsDB[productsDB.length - 1]),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then(response => response.json())
            .then(data => console.log(data))
    }




    guardarProductosStorage()


}
// //time

// const getTime = async () => {
//     const date = document.getElementById("date");
//     fetch('http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires')
//         .then(response => response.json())
//         .then(data => {
//             let date_time = data.datetime;
//             let time_zone = data.timezone;
//             let dayOfYear = data.day_of_year;
//             date.innerHTML = `
//             <li> Zona horaria: ${time_zone}</li>
//             <li> Fecha y hora: ${date_time}</li>
//             <li> Día del año: ${dayOfYear}</li>
//         `;
//         })


// }
// getTime();


//listeners
botonVaciar.addEventListener("click", (e) => {
    e.preventDefault();
    vaciarCarrito();
});
botonAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    agregarNuevosProducto();
    items.innerHTML = ""
    renderizarProductos();

})
botonEliminar.addEventListener("click", (e) => {
    e.preventDefault();
    eliminarProducto()
    items.innerHTML = ""
    renderizarProductos();

})
botonEnviar.addEventListener("click", (e) => {

    vaciarCarrito()

    mensaje = ""
    guardarCarritoStorage()

})

