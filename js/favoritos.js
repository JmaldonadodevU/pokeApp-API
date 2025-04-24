function mostrarFavoritos(){
    const app = document.getElementById("app");
    
    // Obtener la lista de Pokémon favoritos
    let favoritos = localStorage.getItem('pokemonFavoritos');
    
    if (favoritos) {
        favoritos = JSON.parse(favoritos);
    } else {
        favoritos = [];
    }
    
    // Preparar HTML
    let contenido = `
        <div>
            <h1>Mis Pokémon Favoritos</h1>
            <p>Tienes ${favoritos.length} Pokémon favoritos</p>
        </div>
    `;
    
    // Verificar si hay favoritos
    if (favoritos.length === 0) {
        contenido += `
            <div>
                <p>No has agregado ningún Pokémon favorito.</p>
                <p>Para agregar favoritos, visita la sección de "Inicio" o "Aleatorio".</p>
            </div>
        `;
    } else {
        // Agregar botón para limpiar
        contenido += `
            <div>
                <button onclick="limpiarFavoritos()">Limpiar Favoritos</button>
            </div>
            
            <div class="c-lista">
        `;
        
        // Mostrar cada Pokémon favorito
        for (let i = 0; i < favoritos.length; i++) {
            const pokemon = favoritos[i];
            contenido += `
                <div class="c-lista-pokemon">
                    <p>#${pokemon.id}</p>
                    <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
                    <p>${pokemon.nombre}</p>
                    <button onclick="verDetallePokemon('${pokemon.nombre}')">Ver Detalles</button>
                    <button onclick="quitarDeFavoritos(${pokemon.id})">Quitar de Favoritos</button>
                </div>
            `;
        }
        
        contenido += `</div>`;
    }
    
    app.innerHTML = contenido;
}

// Función para marcar un Pokémon como favorito (agregar al detalle.js y aleatorio.js)
function agregarAFavoritos(id, nombre, imagen) {
    // Obtener la lista actual de favoritos
    let favoritos = localStorage.getItem('pokemonFavoritos');
    
    if (favoritos) {
        favoritos = JSON.parse(favoritos);
    } else {
        favoritos = [];
    }
    
    // Verificar si ya existe
    let yaExiste = false;
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id === id) {
            yaExiste = true;
            break;
        }
    }
    
    if (!yaExiste) {
        // Agregar el nuevo favorito
        favoritos.push({
            id: id,
            nombre: nombre,
            imagen: imagen
        });
        
        // Guardar en localStorage
        localStorage.setItem('pokemonFavoritos', JSON.stringify(favoritos));
        
        alert(`¡${nombre} ha sido añadido a tus favoritos!`);
    } else {
        alert(`¡${nombre} ya está en tus favoritos!`);
    }
}

// Función para quitar un Pokémon de favoritos
function quitarDeFavoritos(id) {
    let favoritos = localStorage.getItem('pokemonFavoritos');
    
    if (favoritos) {
        favoritos = JSON.parse(favoritos);
        
        // Encontrar el nombre del Pokémon
        let nombrePokemon = "";
        for (let i = 0; i < favoritos.length; i++) {
            if (favoritos[i].id === id) {
                nombrePokemon = favoritos[i].nombre;
                break;
            }
        }
        
        if (confirm("¿Quieres quitar a " + nombrePokemon + " de tus favoritos?")) {
            // Filtrar el Pokémon que queremos quitar
            let nuevaLista = [];
            for (let i = 0; i < favoritos.length; i++) {
                if (favoritos[i].id !== id) {
                    nuevaLista.push(favoritos[i]);
                }
            }
            
            localStorage.setItem('pokemonFavoritos', JSON.stringify(nuevaLista));
            mostrarFavoritos();
        }
    }
}

// Función para limpiar todos los favoritos
function limpiarFavoritos() {
    if (confirm("¿Estás seguro de que quieres eliminar TODOS tus Pokémon favoritos?")) {
        localStorage.removeItem('pokemonFavoritos');
        mostrarFavoritos();
    }
}
