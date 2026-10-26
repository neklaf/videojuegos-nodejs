const selectFiltro = document.getElementById('filtro');
const btnBuscar = document.getElementById('btnBuscar');
const tablaResultado = document.getElementById('resultado');

// 1. Cargar estudios en el <select>
async function cargarEstudios() {
    const res = await fetch('/api/estudios');
    const estudios = await res.json();
    
    estudios.forEach(e => {
        const option = document.createElement('option');
        option.value = e.id;
        option.textContent = e.nombre;
        selectFiltro.appendChild(option);
    });
}

// 2. Consultar y mostrar los videojuegos
async function consultarVideojuegos(estudioId = '') {
    const url = estudioId ? `/api/videojuegos?estudio_id=${estudioId}` : '/api/videojuegos';
    const res = await fetch(url);
    const juegos = await res.json();

    tablaResultado.innerHTML = ''; // Limpiar la tabla

    juegos.forEach(j => {
        const fila = `
            <tr>
                <td>${j.id}</td>
                <td>${j.titulo}</td>
                <td>${j.fecha_lanzamiento}</td>
                <td>${j.estudio}</td>
                <td>${j.pais}</td>
            </tr>
        `;
        tablaResultado.innerHTML += fila;
    });
}

// Eventos
btnBuscar.addEventListener('click', () => {
    consultarVideojuegos(selectFiltro.value);
});

// Inicializar la carga de datos
cargarEstudios();
consultarVideojuegos();
