async function mostrarDetalle(nombre){
    const app = document.getElementById("app");
    
    // Mostrar pantalla de carga
    app.innerHTML = `
        <div class="loading">
            <div class="pokeball-loading"></div>
            <p>Cargando datos de ${nombre}...</p>
        </div>
    `;
    
    try {
        // Obtener datos del Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const pokemon = await response.json();
        
        // Preparar tipos
        let tipos = "";
        for (let i = 0; i < pokemon.types.length; i++) {
            tipos += `<span class="pokemon-type">${pokemon.types[i].type.name}</span> `;
        }
        
        // Preparar estadísticas
        let stats = "";
        for (let i = 0; i < pokemon.stats.length; i++) {
            const porcentaje = (pokemon.stats[i].base_stat / 255) * 100; // 255 es el valor máximo de estadística
            stats += `
                <div class="stat-container">
                    <div class="stat-name">${pokemon.stats[i].stat.name}</div>
                    <div class="stat-value">${pokemon.stats[i].base_stat}</div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${porcentaje}%"></div>
                    </div>
                </div>
            `;
        }
        
        // Preparar habilidades
        let habilidades = "";
        for (let i = 0; i < pokemon.abilities.length; i++) {
            if (i > 0) habilidades += ", ";
            habilidades += pokemon.abilities[i].ability.name;
        }
        
        // Mostrar detalles del Pokémon con diseño responsive
        app.innerHTML = `
            <div class="detalle-header">
                <button onclick="General()" class="back-btn">
                    <i class="fas fa-arrow-left"></i> Volver
                </button>
                <h1 class="pokemon-title">#${pokemon.id} ${pokemon.name}</h1>
            </div>
            
            <div class="c-detalle">
                <div class="detalle-img-container">
                    <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
                        alt="${pokemon.name}" class="detalle-img">
                    <div class="detalle-tipos">${tipos}</div>
                </div>
                
                <div class="detalle-info">
                    <div class="detalle-seccion">
                        <h3>Información básica</h3>
                        <div class="detalle-datos">
                            <div class="detalle-dato">
                                <i class="fas fa-ruler-vertical"></i>
                                <span>Altura: ${pokemon.height / 10} m</span>
                            </div>
                            <div class="detalle-dato">
                                <i class="fas fa-weight"></i>
                                <span>Peso: ${pokemon.weight / 10} kg</span>
                            </div>
                            <div class="detalle-dato">
                                <i class="fas fa-magic"></i>
                                <span>Habilidades: ${habilidades}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detalle-seccion">
                        <h3>Estadísticas</h3>
                        <div class="detalle-stats">
                            ${stats}
                        </div>
                    </div>
                    
                    <div class="detalle-acciones">
                        <button onclick="agregarAMisPokemon(${pokemon.id}, '${pokemon.name}', '${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}')" class="action-btn">
                            <i class="fas fa-bookmark"></i> Agregar a Mis Pokémon
                        </button>
                        <button onclick="agregarAFavoritos(${pokemon.id}, '${pokemon.name}', '${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}')" class="action-btn">
                            <i class="fas fa-heart"></i> Agregar a Favoritos
                        </button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al cargar los detalles:", error);
        app.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Hubo un error al cargar los detalles de ${nombre}.</p>
                <button onclick="General()" class="action-btn">Volver al inicio</button>
            </div>
        `;
    }
}
