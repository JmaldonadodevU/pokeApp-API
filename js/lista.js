function mostrarLista(pokemones) {
    const app = document.getElementById("app");
    let Pokes = "";

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista"); 

/*
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text"
    buscador.addEventListener("input", buscarPoke);
*/
    for (let i = 0; i < pokemones.length; i++) {
        let id = pokemones[i].url.split("/")[6];
        Pokes += `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${pokemones[i].name}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${pokemones[i].name}">
            <p>${pokemones[i].name}</p>
        </div>`;
    }
    seccion.innerHTML = Pokes;
    
    /*app.appendChild(buscador);*/
    app.appendChild(seccion);

}