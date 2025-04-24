async function mostrarDetalle(nombre){
    const app = document.getElementById("app");
    
    // Mostrar pantalla de carga
    app.innerHTML = `
        <div>
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
            stats += `
                <p>${pokemon.stats[i].stat.name}: ${pokemon.stats[i].base_stat}</p>
            `;
        }
        
        // Preparar habilidades
        let habilidades = "";
        for (let i = 0; i < pokemon.abilities.length; i++) {
            if (i > 0) habilidades += ", ";
            habilidades += pokemon.abilities[i].ability.name;
        }
        
        // Mostrar detalles del Pokémon
        app.innerHTML = `
            <button onclick="General()">← Volver al inicio</button>
            
            <div class="c-detalle">
                <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
                     alt="${pokemon.name}">
                
                <div>
                    <h2>#${pokemon.id} ${pokemon.name}</h2>
                    <div>${tipos}</div>
                    
                    <div>
                        <p>Altura: ${pokemon.height / 10} m</p>
                        <p>Peso: ${pokemon.weight / 10} kg</p>
                        <p>Habilidades: ${habilidades}</p>
                    </div>
                    
                    <div>
                        <h3>Estadísticas</h3>
                        ${stats}
                    </div>
                    
                    <div>
                        <button onclick="agregarAMisPokemon(${pokemon.id}, '${pokemon.name}', '${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}')">
                            Agregar a Mis Pokémon
                        </button>
                        <button onclick="agregarAFavoritos(${pokemon.id}, '${pokemon.name}', '${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}')">
                            Agregar a Favoritos
                        </button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al cargar los detalles:", error);
        app.innerHTML = `
            <div>
                <p>Hubo un error al cargar los detalles de ${nombre}.</p>
                <button onclick="General()">Volver al inicio</button>
            </div>
        `;
    }
}
