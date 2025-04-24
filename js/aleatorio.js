async function mostrarAleatorio() {
    const app = document.getElementById("app");
    
    // Mostrar pantalla de carga
    app.innerHTML = `
        <div class="c-aleatorio">
            <h1>Pokémon Aleatorio</h1>
            <div class="loading">Cargando...</div>
        </div>
    `;
    
    try {
        // Generar un ID aleatorio (entre 1 y 1025)
        const idAleatorio = Math.floor(Math.random() * 1025) + 1;
        
        // Obtener datos del Pokémon aleatorio
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idAleatorio}`);
        const pokemon = await response.json();
        
        // Preparar los tipos del Pokémon
        let tipos = "";
        for (let i = 0; i < pokemon.types.length; i++) {
            tipos += `<span class="pokemon-type">${pokemon.types[i].type.name}</span> `;
        }
        
        // Preparar las estadísticas
        let stats = "";
        for (let i = 0; i < pokemon.stats.length; i++) {
            stats += `
                <p>${pokemon.stats[i].stat.name}: ${pokemon.stats[i].base_stat}</p>
            `;
        }
        
        // Crear HTML para el Pokémon aleatorio
        app.innerHTML = `
            <div class="c-aleatorio">
                <h1>¡Pokémon Aleatorio!</h1>
                
                <div class="c-detalle">
                    <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
                        alt="${pokemon.name}">
                    
                    <div>
                        <h2>#${pokemon.id} ${pokemon.name}</h2>
                        <div>${tipos}</div>
                        
                        <div>
                            <p>Altura: ${pokemon.height / 10} m</p>
                            <p>Peso: ${pokemon.weight / 10} kg</p>
                        </div>
                        
                        <div>
                            <h3>Estadísticas</h3>
                            ${stats}
                        </div>
                        
                        <div>
                            <button onclick="mostrarAleatorio()">¡Otro Pokémon!</button>
                            <button onclick="agregarAMisPokemon(${pokemon.id}, '${pokemon.name}', '${pokemon.sprites.other['official-artwork'].front_default}')">
                                Agregar a Mis Pokémon
                            </button>
                            <button onclick="agregarAFavoritos(${pokemon.id}, '${pokemon.name}', '${pokemon.sprites.other['official-artwork'].front_default}')">
                                Agregar a Favoritos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al cargar Pokémon aleatorio:", error);
        app.innerHTML = `
            <div>
                <h1>Pokémon Aleatorio</h1>
                <p>¡Ups! Hubo un error al buscar un Pokémon.</p>
                <button onclick="mostrarAleatorio()">Intentar de nuevo</button>
            </div>
        `;
    }
}

// Función para agregar un Pokémon a "Mis Pokémon"
function agregarAMisPokemon(id, nombre, imagen) {
    // Obtener la lista actual o crear una nueva
    let misPokemon = localStorage.getItem('misPokemon');
    
    if (misPokemon) {
        misPokemon = JSON.parse(misPokemon);
    } else {
        misPokemon = [];
    }
    
    // Verificar si ya existe
    let yaExiste = false;
    for (let i = 0; i < misPokemon.length; i++) {
        if (misPokemon[i].id === id) {
            yaExiste = true;
            break;
        }
    }
    
    if (!yaExiste) {
        // Crear el nuevo Pokémon
        const nuevoPokemon = {
            id: id,
            nombre: nombre,
            imagen: imagen,
            fechaCaptura: new Date().toISOString()
        };
        
        // Agregar a la lista
        misPokemon.push(nuevoPokemon);
        
        // Guardar en localStorage
        localStorage.setItem('misPokemon', JSON.stringify(misPokemon));
        
        alert(`¡${nombre} ha sido agregado a tu colección!`);
    } else {
        alert(`¡${nombre} ya está en tu colección!`);
    }
}
