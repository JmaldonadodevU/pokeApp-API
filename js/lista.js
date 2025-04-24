function mostrarLista(pokemones) {
    const app = document.getElementById("app");
    let Pokes = "";

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista"); 

    // Título para la sección
    const titulo = document.createElement("h2");
    titulo.textContent = "Catálogo Pokémon";
    titulo.className = "text-center mb-2";
    app.appendChild(titulo);

    // Verificar si hay Pokémon para mostrar
    if (pokemones.length === 0) {
        seccion.innerHTML = `
            <div class="error-message">
                <p>No se encontraron Pokémon para mostrar</p>
            </div>
        `;
        app.appendChild(seccion);
        return;
    }

    // Crear las tarjetas de Pokémon
    for (let i = 0; i < pokemones.length; i++) {
        let id = pokemones[i].url.split("/")[6];
        
        // Alternativa de URL de imagen para mejorar compatibilidad con webviews
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        
        Pokes += `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${pokemones[i].name}')">
            <div class="pokemon-id">${id}</div>
            <img 
                src="${imageUrl}" 
                width="96" 
                height="96" 
                loading="lazy" 
                alt="${pokemones[i].name}"
                onerror="this.onerror=null; this.src='https://via.placeholder.com/96?text=${pokemones[i].name}';"
            >
            <h3>${pokemones[i].name}</h3>
        </div>`;
        
        // Para mejorar el rendimiento, renderizamos en lotes de 20 Pokémon
        if (i % 20 === 0 && i > 0) {
            seccion.innerHTML += Pokes;
            Pokes = "";
        }
    }
    
    // Añadir el resto de Pokémon
    seccion.innerHTML += Pokes;
    app.appendChild(seccion);

    // Añadir botón para cargar más al final de la lista si hay muchos Pokémon
    if (pokemones.length > 20) {
        const scrollBtn = document.createElement("button");
        scrollBtn.className = "action-btn mt-2 mb-2";
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i> Volver arriba';
        scrollBtn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
        app.appendChild(scrollBtn);
    }
}