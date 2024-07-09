const card = document.getElementById('tarjetas');
const carrit = document.getElementById('carrito')
const bs = document.getElementById('busqueda')
const lupita= document.getElementById('lupa')
const cant= document.getElementById('cantidadcarriti')
const abri= document.querySelector('#abrigos')
const pant= document.querySelector('#pantalones')
const acct= document.querySelector('#accesorios')
const rem = document.querySelector('#remeras')
const productos=[]
// const UrlJson= "js/usuario.json"
const UrlJson= "https://668d50f6099db4c579f28cd1.mockapi.io/api/final/productos"
const carrito = JSON.parse(localStorage.getItem("carritonube")) || [];
console.log('Carrito inicial:', carrito);

// window.onload =function(){
//     $('#onload').fadeOut() 
//     $('body').removeClass('hidden')
    
// }

function alerta(mensaje,icono){
    Swal.fire({
        title: 'FLIPPO',
        text: mensaje,
        icon: icono,
        timer:3500,
        showConfirmButton: false,
      })
}
function AlertFueagregado( mensaje, color){
    Toastify({

        text:mensaje,
        
        duration: 3000,
        style: {
            background: color,
          }
        }).showToast();
}
function retornarCardHTML(producto) {
    return `<div class="card mb-3 ">
                <div class="image"><span class="text ">${producto.imagen}</span></div>
                <span class="title">${producto.nombre}</span>
                <span class="price">${producto.precio}</span>
                <button id="${producto.id}" class="boton add-to-cart">Agregar</button>
            </div>`
}
// haceme una funcion para cargar el producto
function retornarCardError() {
    return `<div class="div-card-error ">
                <h2>Se ha producido un error</h2>
                <h3>Intenta nuevamente en unos instantes...🤦🏻‍♂️</h3>
            </div>`
}

function buscarproductoJSON() {
    fetch(UrlJson)
    .then((response)=> response.json())
    .then((datos)=> productos.push(...datos) )
    .then(()=> cargarProductos(productos))
    .catch((error)=> {
            console.error('Error al cargar productos:',error)
            card.innerHTML = retornarCardError()
        })
    
}





function cargarProductos(array) {
    try {
        if (array.length > 0) {
            card.innerHTML=""
            productos.forEach((producto) => card.innerHTML += retornarCardHTML(producto))
            CargarProducalCarrito()
            cantidadCarro()
        } 
    }catch(error){
        console.error('Error al cargar productos:', error);
        card.innerHTML = retornarCardError()
    }
}
function filtrarProduct(){
    let resultado= productos.filter((producto)=> producto.nombre.toLocaleLowerCase().includes(bs.value.toLocaleLowerCase()))
    if (resultado.length > 0) {
        cargarProductos(resultado)
    }
}


function CargarProducalCarrito() {
    const AgregarProducto = document.querySelectorAll("button.add-to-cart");
    console.log('Botones encontrados:', AgregarProducto.length);
    
    if (AgregarProducto.length > 0) {
        AgregarProducto.forEach((boton) => {
            boton.addEventListener("click", () => {
                console.log('Botón clicado:', boton.id);
                const productosel = productos.find((producto) => producto.id == boton.id);
                console.log('Producto seleccionado:', productosel);

                if (productosel) {
                    carrito.push(productosel);
                    cantidadCarro()
                    localStorage.setItem("carritonube", JSON.stringify(carrito));
                    console.table(carrito);
                    AlertFueagregado("Producto agregado al carrito","green")
                } else {
                    alert("Producto no encontrado");
                }
            });
        });
    }
}

function cantidadCarro(){
    cant.innerHTML = carrito.length;
}
carrit.addEventListener("mousemove", () => {
    if (carrito.length > 0) {
        carrit.title = "Producto de carrito: " + carrito.length;
    } else {
        carrit.title = "Producto de carrito: 0";
    }
});

carrit.addEventListener("click", () => {
    console.log("Evento click detectado");  // Depuración
    console.log("Contenido del carrito al hacer clic:", carrito);  // Depuración
    if (carrito.length > 0) {
        console.log("Redirigiendo a carrito.html");  // Depuración
        location.href = "./page/carrito.html";
    } else {
        alerta("⛔️ No hay productos en el carrito ⛔️","error")
    }
});

bs.addEventListener("search", ()=>{
    filtrarProduct()

})

lupita.addEventListener("click",()=>{
    filtrarProduct()
})


    abri.addEventListener("click",()=>{
        card.innerHTML=""
        productos.forEach((producto) => {
            if (producto.categoria === "BUZO") {
                card.innerHTML += retornarCardHTML(producto)
                console.table(producto)
            }
        })
        CargarProducalCarrito()
        cantidadCarro()
    })
    pant.addEventListener("click",()=>{
        card.innerHTML=""
        productos.forEach((producto) => {
            if (producto.categoria === "PANTALONES") {
                card.innerHTML += retornarCardHTML(producto)
                console.table(producto)
            }
        })
        CargarProducalCarrito()
        cantidadCarro()
    })
    acct.addEventListener("click",()=>{
        card.innerHTML=""
        productos.forEach((producto) => {
            if (producto.categoria === "ACCESORIOS") {
                card.innerHTML += retornarCardHTML(producto)
                console.table(producto)
            }
        })
        CargarProducalCarrito()
        cantidadCarro()
    })
    rem.addEventListener("click",()=>{
        card.innerHTML=""
        productos.forEach((producto) => {
            if (producto.categoria === "REMERAS") {
                card.innerHTML += retornarCardHTML(producto)
                console.table(producto)
            }
        })
        CargarProducalCarrito()
        cantidadCarro()
    })
    setTimeout(()=>{
        $('#onload').fadeOut() 
        $('body').removeClass('hidden')
        buscarproductoJSON();
    },5000)


