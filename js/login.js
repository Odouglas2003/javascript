const card = document.getElementById('tarjetas');
const carrit = document.getElementById('carrito')
const bs = document.getElementById('busqueda')
const lupita= document.getElementById('lupa')
const cant= document.getElementById('cantidadcarriti')

const carrito = JSON.parse(localStorage.getItem("carritonube")) || [];
console.log('Carrito inicial:', carrito);
class usuarioo{
    constructor(id,usuario,clave,nombre,apellido){
        this.id = id;
        this.usuario = usuario;
        this.clave = clave;
        this.nombre = nombre;
        this.apellido = apellido;
    }
}
const usuarios =[
    { id: 1, usuario:'octavio',clave:'753159', nombre: 'Octavio', apellido: 'Douglas'},
    { id: 2, usuario:'ayelen',clave:'050899',nombre: 'Ayelen', apellido: 'Douglas' },
    { id: 3, usuario:'victoria',clave:'753159',nombre: 'Ayelen', apellido: 'Diaz'   },
    { id: 4, usuario:'maria',clave:'000000',nombre: 'Maria', apellido: 'Quiroga'  },
]
function login(){
    let resul = prompt("¿Tiene cuenta? Ingrese 'si' o 'no'");
    if (resul === 'si') {
        let usa = prompt("Ingrese usuario");
        let resultado = usuarios.find(usuario => usuario.usuario === usa);
        if (resultado) {
            let cla = prompt("Ingrese su clave");
            if (resultado.clave === cla) {
                alert("Bienvenido, " + resultado.nombre);
            } else {
                alert("Clave incorrecta");
            }
        } else {
            alert("Usuario incorrecto");
        }
    }else{
        let usu = prompt("ingrese su usuario para ingresar")
        let cla = prompt("ingrese uan clave para su cuenta")
        let nom = prompt("ingrese su nombre")
        let ape = prompt("ingrese su apellido")
        let cant = usuarios.length + 1

        usuarios.push(new usuarioo(cant,usu,cla,nom,ape));
        alert("Bienvenido")
        console.table(usuarios)
    }
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
function cargarProductos(productos) {
    if (productos.length > 0) {
    card.innerHTML=""
    productos.forEach((producto) => card.innerHTML += retornarCardHTML(producto))
    CargarProducalCarrito()
    cantidadCarro()
    } else {
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
                    alert("Producto agregado al carrito");
                    console.table(carrito);
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
        alert("⛔️ No hay productos en el carrito ⛔️");
    }
});

bs.addEventListener("search", ()=>{
    filtrarProduct()

})

lupita.addEventListener("click",()=>{
    filtrarProduct()
})



    //login()
    cargarProductos(productos);
    //filtrar()


