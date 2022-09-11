class producto {
    constructor(id, nombre, descripcion, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.descripcion = descripcion;
        this.precio = Number(precio);
    }
}
const productos = []
productos.push(new producto(1,"Iphone 13", "256 GB", 1000000))
productos.push(new producto(2,"Samsung Galaxy S22", "128 GB", 800000))
productos.push(new producto(3,"Xiaomi 12", "128 GB", 700000))
productos.push(new producto(4,"Computador Ryzen 7", "HP", 1200000))
productos.push(new producto(5,"Laptop i7", "Asus", 2000000))
productos.push(new producto(6,"Laptop i5", "Acer", 2100000))
productos.push(new producto(7,"Audifonos", "Hyper X", 100000))
productos.push(new producto(8,"Mouse", "Razer", 80000))
productos.push(new producto(9,"Case", "Original", 30000))

// A partir de aqui aplico interacción de Eventos

let carrito = [];
let sectionProductos = document.getElementById("section-productos");
let sectionCarrito = document.getElementById("section-carrito");


// Creación de la seccion carrito con DOM
let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total: $</h2>";
sectionCarrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("h2");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let cantidadProductos = document.createElement("div");
cantidadProductos.innerHTML = "<h3>Cantidad de productos: </h3>";
sectionCarrito.appendChild(cantidadProductos);

let cantProductos = document.createElement("h3");
cantProductos.innerText = " 0";
cantidadProductos.appendChild(cantProductos);

let botonFinalizar = document.createElement("button");
botonFinalizar.innerText = "Finalizar compra";
sectionCarrito.appendChild(botonFinalizar);
botonFinalizar.setAttribute("class", "boton");

let botonVaciar = document.createElement("button");
botonVaciar.innerText = "Vaciar Carrito";
sectionCarrito.appendChild(botonVaciar);
botonVaciar.setAttribute("class", "boton");


// Se agrega evento al boton para que muestre el precio final y uno que vacie el carrito (Al finalizar la compra también se vacia el carrito)
botonFinalizar.onclick = () => {
    const precioFinal = montoTotalCompra.innerText;     
    alert("Total a pagar es: $" + precioFinal);
    vaciarCarrito();
}

botonVaciar.onclick = () => {
    vaciarCarrito();
}


// Creación de las product cards
for (const producto of productos) {
    let container = document.createElement("div");
    container.setAttribute("class", "card-product");
    container.innerHTML = ` <div class="img-container">
                            <img src= "./media/${producto.id}.jpg" alt="${producto.nombre}" class="img-product"/>
                            </div>
                            <div class="info-producto">
                            <p class="font">${producto.nombre}</p>
                            <p class="font">${producto.descripcion}</p>
                            <strong class="font">$${producto.precio}</strong>
                            <button class="boton" id="${producto.id}"> Agregar al carrito </button>
                            </div>`;
    sectionProductos.appendChild(container);
    //Evento para que los productos se agreguen al carrito
    document.getElementById(`${producto.id}`).onclick = () => agregarAlCarrito(`${producto.id}`);
}


// Funciones
function agregarAlCarrito(id) {
    carrito.push(productos.find(p => p.id == id));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotalCarrito();
}

function calcularTotalCarrito() {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio;
    }
    montoTotalCompra.innerText = total;
    cantProductos.innerText = carrito.length;
}

function vaciarCarrito() {
    montoTotalCompra.innerText = "0";
    cantProductos.innerText = "0";
    localStorage.clear();
    carrito=[];
}


