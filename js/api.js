async function  conexionLista() {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // Reduciendo a 151 para mayor rendimiento en móviles
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error("Error al obtener lista de Pokémon:", error);
        return [];
    }
}

async function General() {
    const app = document.getElementById("app");
    
    // Mostrar pantalla de carga
    app.innerHTML = `
        <div class="loading">
            <div class="pokeball-loading"></div>
            <p>Cargando Pokémon...</p>
        </div>
    `;
    
    try {
        const infoPokes = await conexionLista();
        if (infoPokes.length > 0) {
            app.innerHTML = ''; // Limpiar el indicador de carga
            mostrarLista(infoPokes);
        } else {
            app.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>No se pudieron cargar los Pokémon. Inténtalo de nuevo.</p>
                    <button onclick="General()" class="action-btn">Reintentar</button>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error en la función General:", error);
        app.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Ocurrió un error al cargar los Pokémon. Inténtalo de nuevo.</p>
                <button onclick="General()" class="action-btn">Reintentar</button>
            </div>
        `;
    }
}
