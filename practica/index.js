// Variables
const productsDB = [
    {
        id: 1,
        nombre: 'Calabresa',
        precio: 1950,
        descripcion: 'Pizza de Muzzarella, Longaniza Calabresa, Morrones, Salsa de Tomate, Condimentos y Aceitunas Verdes.',
        imagen: 'Images/Calabresa.png'
    },
    {
        id: 2,
        nombre: 'Especial',
        precio: 2000,
        descripcion: 'Pizza de Muzzarella, Jamon Natural, Morrones , Salsa de Tomate, Condimentos y Aceitunas Verdes.',
        imagen: 'Images/Especial.png'
    },
    {
        id: 3,
        nombre: 'Fugazza',
        precio: 1050,
        descripcion: 'Pizza de Cebolla, Condimentos y Aceitunas Verdes. (sin Quesos)',
        imagen: 'Images/Fugazza.png'
    },
    {
        id: 4,
        nombre: 'Muzza y jamon',
        precio: 1950,
        descripcion: 'Pizza de Muzzarella, Jamon Natural, Salsa de Tomate, Condimentos y Aceitunas Verdes.',
        imagen: 'Images/Muzza y jamon.png'
    },
    {
        id: 5,
        nombre: 'Muzza y Morron',
        precio: 1500,
        descripcion: 'Pizza de Muzzarella, Morrones, Salsa de Tomate, Condimentos y Aceitunas Verdes.',
        imagen: 'Images/Muzza y Morron.png'
    },

    {
        id: 6,
        nombre: 'Muzzarella',
        precio: 1100,
        descripcion: 'Pizza de Muzzarella, Salsa de Tomate, Condimentos y Aceitunas Verdes.',
        imagen: 'Images/Muzzarella.png'
    }


];

let carrito = [];

const items = document.querySelector("#items");
const carritoHTML = document.querySelector("#carrito");
const divisa = '$';

// renderizar productos en la tienda

function renderizarProductos() {
    productsDB.forEach((prod) => {
        let productoHTML = `
        <div class="col-12 col-md-4 nb-5 d-flex p-1 justify-content-center">
        <div class="card text-light bg-dark" style="width: 18rem;">
            <img class="card-Img-top" src="${prod.imagen}" alt="card image cap">
            <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">${prod.descripcion}</p>
                <p>$${prod.precio}
                <button class="btn btn-primary" onclick="agregarProductoAlCarrito(${prod.id})">Añadir al carrito</button>
            </div>
            </div> 
        `;
        items.innerHTML += productoHTML;

    });
}
renderizarProductos();
//*** añadir productos al carrito ***/
//* Identificar que producto eligió
//* Mostrar la informacion del producto
//* Si el producto ya está en el carrito modifico la cantidad. renderizar
//* Calcular el total


function agregarProductoAlCarrito(id) {

    let producto = productsDB.find((producto) => producto.id === id)


    let productoEnCarrito = carrito.find((producto) => producto.id === id)
    productoEnCarrito? productoEnCarrito.cantidad++ : 
        (producto.cantidad = 1,
        carrito.push(producto))
    

    renderizarCarrito()
    calcularTotal()

}
function renderizarCarrito() {
    let htmlCarrito = ""
    carrito.forEach((prod, id) => {
        htmlCarrito += `

        <div class="card w-50">
            <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">Cantidad: ${prod.cantidad}</p>
                <button class="btn btn-danger" onclick="eliminarProductoDelCarrito(${id})">Eliminar</button>
            </div>
        </div>
        `
;

        carritoHTML.innerHTML = htmlCarrito;
    });

}

function actualizarCarrito() {
    //Borrar HTML
    carrito.textContent = '';
}
function calcularTotal() {
    let total = 0;
    carrito.forEach((prod) => {
        total += prod.precio * prod.cantidad
    });

    // console.log(total);
    const t = document.getElementById("total");
    t.innerHTML = `<h5>$${total}</h5>`

}

//****Editar carrito */
//* Cuantos hay? Eliminar un producto o vacir el carrito */
function eliminarProductoDelCarrito(id) {

    carrito[id].cantidad--;

    if (carrito[id].cantidad === 0) {
        carrito.splice(id, 1);

    }

    calcularTotal();
    
    renderizarCarrito();

}

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    calcularTotal();
}

const botonVaciar = document.querySelector("#boton-vaciar");
botonVaciar.addEventListener("click", vaciarCarrito);