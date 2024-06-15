const tableBody = document.querySelector("table tbody")
const importeTotalCarrito = document.querySelector("td#importeTotalCarrito")


const carrito = JSON.parse(localStorage.getItem("carritonube")) || [];
console.log('Carrito inicial:', carrito);
function cartaproductoelejido(producto) {
    return `<tr>
                <td class="imagen-carrito">${producto.imagen}</td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio.toLocaleString("es-AR")}</td>
                <td class="quitar-carrito" title="Clic para quitar del carrito">❌</td>
            </tr>`
}
function retornarCardError() {
    return `<div class="div-card-error text-center">
                <h2>No Tiene ningun Producto</h2>
                <h3>Vuelve al inicio para comprar prodcuto</h3>
            </div>`
}
function cargarProductos() {
    if (carrito.length > 0) {
        tableBody.innerHTML=""
    carrito.forEach((producto) => tableBody.innerHTML += cartaproductoelejido(producto))
    eliminar()
    calcularTotalCarrito()

    }else{
        tableBody.innerHTML = retornarCardError()
    }
}
function calcularTotalCarrito() {
    if (carrito.length > 0) {
        let montoTotalCarrito = carrito.reduce((acc, prod)=> acc + prod.precio, 0)
        importeTotalCarrito.textContent = `$ ${montoTotalCarrito.toLocaleString("es-AR")}`
    }
}

function eliminar(){
    const quitarBotones = document.querySelectorAll('.quitar-carrito');
    quitarBotones.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            eliminarProducto(index);
        });
    });
}
function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminar producto del carrito en la posición index
    localStorage.setItem('carritonube', JSON.stringify(carrito)); // Actualizar almacenamiento local
    cargarProductos(); // Volver a cargar los productos en la tabla
}
cargarProductos()