class Producto {
    constructor(id, nombre, precio, descripcion, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;

    }
}

let productsDB = [new Producto(1, 'Calabresa', 1950, 'Pizza de Muzzarella, Longaniza Calabresa, Morrones, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'https://i.ibb.co/27zLq3m/Calabresa.png'),
new Producto(2, 'Especial', 2000, "Pizza de Muzzarella, Jamon Natural, Morrones , Salsa de Tomate, Condimentos y Aceitunas Verdes.", 'https://i.ibb.co/5cn3fQW/Especial.png'),
new Producto(3, 'Fugazza', 1050, 'Pizza de Cebolla, Condimentos y Aceitunas Verdes. (sin Quesos)', 'https://i.ibb.co/MV4TzFG/Fugazza.png'),
new Producto(4, 'Muzza y jamon', 1950, 'Pizza de Muzzarella, Jamon Natural, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'https://i.ibb.co/Dz9H9kr/Muzza-y-jamon.png'),
new Producto(5, 'Muzza y Morron', 1950, 'Pizza de Muzzarella, Morrones, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'https://i.ibb.co/Qjn7RSP/Muzza-y-Morron.png'),
new Producto(6, 'Muzzarella', 1950, 'Pizza de Muzzarella, Salsa de Tomate, Condimentos y Aceitunas Verdes.', 'https://i.ibb.co/x8XQjc6/Muzzarella.png')
]


let url = 'https://633ef66c83f50e9ba3bcfbe2.mockapi.io/Api'
let carrito = [];
const items = document.querySelector("#items");
const carritoHTML = document.querySelector("#carrito");
const botonVaciar = document.querySelector("#boton-vaciar");
const botonAgregar = document.getElementById("boton-agregar")
const botonEliminar = document.getElementById("boton-eliminar");
const botonEnviar = document.getElementById("boton-enviar");

let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage"));
carritoStorage ? carrito = carritoStorage : carrito = []
let productsDBStorage = JSON.parse(localStorage.getItem("productsDBStorage"))
productsDBStorage ? productsDB = productsDBStorage : {}

renderizarProductos();
renderizarCarrito();
calcularTotal();

function renderizarProductos() {
    let productoHTML = ""

    productsDB.forEach((prod) => {
        productoHTML = `
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
                <img class="card-Img-top" src="${prod.imagen}" alt="card image cap">
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
function iniciarChat(){
    obtenerCarritoStorage();
    let total = document.getElementById("total")
    let direccion = document.getElementById("direccion").value;
    let nombreUsuario = document.getElementById("nombre-usuario").value;
    let apellidoUsuario = document.getElementById("apellido-usuario").value;
    let telefonoUsuario = document.getElementById("telefono-usuario").value;
    
    let mensaje = ` Nombre: ${nombreUsuario}
                    Apellido: ${apellidoUsuario}
                    Telefono: ${telefonoUsuario}
                    Su pedido es:`
    carrito.forEach(producto => {
        
        mensaje += `*${producto.nombre} - ${producto.cantidad} U, 
        `;
    });
    mensaje += `Dirección: ${direccion} Total: ${total.textContent}`

    
   
    botonEnviar.href = `https://wa.me/5492235304745?text=${mensaje}`
    
    guardarCarritoStorage()
    
}
//catalogo
function eliminarProducto() {
    obtenerProductosStorage()
    let nombre = document.getElementById("nombre-eliminar").value.toLowerCase()
    let producto = productsDB.find((producto) => producto.nombre.toLowerCase() === nombre)
    let productoIx  = productsDB.indexOf(producto)
   
    if (productoIx != -1) {
        productsDB.splice(productoIx, 1)

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
    setDatos();
}

function agregarNuevosProducto() {
    obtenerProductosStorage()

    let lastProduct = productsDB[productsDB.length-1]
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
            footer: '<a href="">Ingrese un producto nuevo</a>'
        })
    } else {
        productsDB.push(new Producto(
            id,
            nombre,
            precio,
            descripcion,
            imagen
        )
        );
    }

    guardarProductosStorage()
    setDatos()

}


//storage
let guardarCarritoStorage = () => {
    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
}
let guardarProductosStorage = () => {
    localStorage.setItem("productsDBStorage", JSON.stringify(productsDB));
    
}

let obtenerProductosStorage = () => {
    if(localStorage.getItem("productsDBStorage")!=null){
        productsDB = JSON.parse(localStorage.getItem("productsDBStorage"))
       }
}
let obtenerCarritoStorage = () => {
    if(localStorage.getItem("carritoStorage")!=null){
        productsDB = JSON.parse(localStorage.getItem("carritoStorage"))
       }
}


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
botonEnviar.addEventListener("click", (e)=>{
    
    vaciarCarrito()
  
    mensaje = ""
    guardarCarritoStorage()
    
})

async function getDatos(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.push(JSON.stringify(productsDB))
        console.log(data)
})}

async function agregarProductosViaApi() {
	productsDB.forEach(producto => {
        let response = await fetch(url,
            {
                method: 'POST',
                body:JSON.stringify(producto) ,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                 },
            }
        );
        let data = await response.json();    
    });
    
}
getResponse()
