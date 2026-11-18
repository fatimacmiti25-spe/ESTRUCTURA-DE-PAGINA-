
// Productos iniciales
const productosIniciales = [
    {
        id: 1,
        nombre: "Lápiz",
        categoria: "Papelería",
        descripcion: "Lápiz de escritura",
        cantidad: 120
    },
    {
        id: 2,
        nombre: "Cuaderno",
        categoria: "Papelería",
        descripcion: "Cuaderno escolar",
        cantidad: 50
    },
    {
        id: 3,
        nombre: "Borrador",
        categoria: "Papelería",
        descripcion: "Borrador blanco",
        cantidad: 35
    },
    {
        id: 4,
        nombre: "Regla",
        categoria: "Papelería",
        descripcion: "Regla de 30 cm",
        cantidad: 40
    }
];

// Crear almacenamiento local
if (localStorage.getItem("productos") === null) {
    localStorage.setItem(
        "productos",
        JSON.stringify(productosIniciales)
    );
}

// Obtener productos
function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

// Guardar productos
function guardarProductos(productos) {
    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}

// Mostrar productos
function mostrarProductos() {

    const tabla = document.getElementById("listaProductos");

    if (!tabla) return;

    const productos = obtenerProductos();

    tabla.innerHTML = "";

    if (productos.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="6">No hay productos registrados.</td>
            </tr>
        `;
        return;
    }

    productos.forEach(producto => {

        const fila = document.createElement("tr");

        const datos = [
            producto.id,
            producto.nombre,
            producto.categoria,
            producto.descripcion,
            producto.cantidad
        ];

        datos.forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        const acciones = document.createElement("td");

        acciones.innerHTML = `
            <button class="btn-editar">
                Modificar
            </button>

            <button class="btn-eliminar">
                Eliminar
            </button>
        `;

        acciones.querySelector(".btn-editar").onclick = () => {
            modificarProducto(producto.id);
        };

        acciones.querySelector(".btn-eliminar").onclick = () => {
            eliminarProducto(producto.id);
        };

        fila.appendChild(acciones);
        tabla.appendChild(fila);
    });
}

// Modificar producto
function modificarProducto(id) {
    window.location.href = "editar.html?id=" + id;
}

// Eliminar producto
function eliminarProducto(id) {

    const confirmar = confirm(
        "¿Estás seguro de eliminar este producto?"
    );

    if (confirmar) {

        let productos = obtenerProductos();

        productos = productos.filter(
            producto => producto.id !== id
        );

        guardarProductos(productos);
        mostrarProductos();

        alert("Producto eliminado correctamente.");
    }
}

// Cargar productos al abrir la página
document.addEventListener(
    "DOMContentLoaded",
    mostrarProductos
);
