
class Productos{
    constructor(id,nombre,precio,descripcion,imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        
    }
}

const productsDB = [new Productos(1, 'Calabresa', 1950, 'Pizza de Muzzarella, Longaniza Calabresa, Morrones, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'Images/Calabresa.png'),
                    new Productos(2, 'Especial', 2000, "Pizza de Muzzarella, Jamon Natural, Morrones , Salsa de Tomate, Condimentos y Aceitunas Verdes.", 'Images/Especial.png'),
                    new Productos(3, 'Fugazza', 1050, 'Pizza de Cebolla, Condimentos y Aceitunas Verdes. (sin Quesos)', 'Images/Fugazza.png'),
                    new Productos(4, 'Muzza y jamon', 1950, 'Pizza de Muzzarella, Jamon Natural, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'Images/Muzza y jamon.png'),
                    new Productos(5, 'Muzza y Morron', 1950, 'Pizza de Muzzarella, Morrones, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'Images/Muzza y Morron.png'),
                    new Productos(6, 'Muzzarella', 1950, 'Pizza de Muzzarella, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'Images/Muzzarella.png')
]
console.log(productsDB)


localStorage.setItem("productsDB", JSON.stringify(productsDB));



let carrito = [];

const items = document.querySelector("#items");
const carritoHTML = document.querySelector("#carrito");
const divisa = '$';



function renderizarProductos() {
    let productsDB = JSON.parse(localStorage.getItem("productsDB"));
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


function agregarProductoAlCarrito(id) {
    let productsDB = JSON.parse(localStorage.getItem("productsDB"));
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

        <div class="card w-50 p-1 >
       
            <div class="card-body p-1">
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
    carrito[id].cantidad === 0 && carrito.splice(id, 1)
   
    carrito.length === 0 && (carritoHTML.innerHTML = "");
    
    calcularTotal();
    
    renderizarCarrito();

}

function vaciarCarrito() {
    carrito = [];
    carrito.length === 0 && (carritoHTML.innerHTML = "");
    renderizarCarrito();
    calcularTotal();
    
}

const botonVaciar = document.querySelector("#boton-vaciar");
botonVaciar.addEventListener("click", vaciarCarrito);

// // //**Guardar los datos en Storage**/
// // const guardarCarritoStorage = (carrito) => {
// //     let carrito = JSON.parse(localStorage.getItem("carrito"));
// //   };
  
// //   const getCarritoStorage = () => {
// //     const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
// //     renderizarCarrito(carritoStorage);
// //   };
  
// //   document.addEventListener("DOMContentLoaded", () => {
// //     if (localStorage.getItem("carrito")) {
// //       getCarritoStorage();
// //     }
// //   });
  