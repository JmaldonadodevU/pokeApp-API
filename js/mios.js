function mostrarMios(){
    const app = document.getElementById("app");
    
    // Obtener la lista de Pokémon del usuario
    let misPokemon = localStorage.getItem('misPokemon');
    
    if (misPokemon) {
        misPokemon = JSON.parse(misPokemon);
    } else {
        misPokemon = [];
    }
    
    // Preparar el HTML
    let contenido = `
        <div>
            <h1>Mi Colección de Pokémon</h1>
            <p>Tienes ${misPokemon.length} Pokémon</p>
        </div>
    `;
    
    // Verificar si hay Pokémon en la colección
    if (misPokemon.length === 0) {
        contenido += `
            <div>
                <p>Aún no has agregado ningún Pokémon a tu colección.</p>
                <p>Ve a la sección "Aleatorio" para encontrar Pokémon.</p>
                <button onclick="mostrarAleatorio()">Ir a Pokémon Aleatorio</button>
            </div>
        `;
    } else {
        // Agregar botones de ordenar
        contenido += `
            <div>
                <button onclick="ordenarPorID()">Ordenar por ID</button>
                <button onclick="ordenarPorFecha()">Ordenar por Fecha</button>
                <button onclick="limpiarColeccion()">Limpiar Colección</button>
            </div>
            
            <div class="c-lista">
        `;
        
        // Mostrar cada Pokémon
        for (let i = 0; i < misPokemon.length; i++) {
            const pokemon = misPokemon[i];
            const fecha = new Date(pokemon.fechaCaptura);
            const fechaFormateada = fecha.toLocaleDateString() + " " + fecha.toLocaleTimeString();
            
            contenido += `
                <div class="c-lista-pokemon">
                    <p>#${pokemon.id}</p>
                    <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
                    <p>${pokemon.nombre}</p>
                    <p>Capturado: ${fechaFormateada}</p>
                    <button onclick="verDetallePokemon(${pokemon.id})">Ver Detalles</button>
                    <button onclick="eliminarDeMisPokemon(${pokemon.id})">Liberar</button>
                </div>
            `;
        }
        
        contenido += `</div>`;
    }
    
    app.innerHTML = contenido;
}

// Función para ordenar por ID
function ordenarPorID() {
    let misPokemon = localStorage.getItem('misPokemon');
    
    if (misPokemon) {
        misPokemon = JSON.parse(misPokemon);
        
        // Ordenar por ID
        misPokemon.sort(function(a, b) {
            return a.id - b.id;
        });
        
        localStorage.setItem('misPokemon', JSON.stringify(misPokemon));
        mostrarMios();
    }
}

// Función para ordenar por fecha
function ordenarPorFecha() {
    let misPokemon = localStorage.getItem('misPokemon');
    
    if (misPokemon) {
        misPokemon = JSON.parse(misPokemon);
        
        // Ordenar por fecha (más reciente primero)
        misPokemon.sort(function(a, b) {
            return new Date(b.fechaCaptura) - new Date(a.fechaCaptura);
        });
        
        localStorage.setItem('misPokemon', JSON.stringify(misPokemon));
        mostrarMios();
    }
}

// Función para eliminar un Pokémon
function eliminarDeMisPokemon(id) {
    let misPokemon = localStorage.getItem('misPokemon');
    
    if (misPokemon) {
        misPokemon = JSON.parse(misPokemon);
        
        // Encontrar el Pokémon para mostrar su nombre
        let nombrePokemon = "";
        for (let i = 0; i < misPokemon.length; i++) {
            if (misPokemon[i].id === id) {
                nombrePokemon = misPokemon[i].nombre;
                break;
            }
        }
        
        if (confirm("¿Estás seguro de que quieres liberar a " + nombrePokemon + "?")) {
            // Filtrar el pokémon que queremos eliminar
            let nuevaLista = [];
            for (let i = 0; i < misPokemon.length; i++) {
                if (misPokemon[i].id !== id) {
                    nuevaLista.push(misPokemon[i]);
                }
            }
            
            localStorage.setItem('misPokemon', JSON.stringify(nuevaLista));
            mostrarMios();
        }
    }
}

// Función para limpiar toda la colección
function limpiarColeccion() {
    if (confirm("¿Estás seguro de que quieres liberar a TODOS tus Pokémon?")) {
        localStorage.removeItem('misPokemon');
        mostrarMios();
    }
}

// Función para ver los detalles de un Pokémon
async function verDetallePokemon(id) {
    const app = document.getElementById("app");
    
    // Mostrar pantalla de carga
    app.innerHTML = `
        <div>
            <p>Cargando detalles...</p>
        </div>
    `;
    
    try {
        // Obtener datos detallados del Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();
        
        // Preparar tipos
        let tipos = "";
        for (let i = 0; i < pokemon.types.length; i++) {
            tipos += `<span>${pokemon.types[i].type.name}</span> `;
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
        
        // Mostrar detalles
        app.innerHTML = `
            <button onclick="mostrarMios()">← Volver a Mi Colección</button>
            
            <div>
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
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error:", error);
        app.innerHTML = `
            <div>
                <p>Hubo un error al cargar los detalles.</p>
                <button onclick="mostrarMios()">Volver a Mi Colección</button>
            </div>
        `;
    }
}
