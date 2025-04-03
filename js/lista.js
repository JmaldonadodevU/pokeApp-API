function mostrarlista() {
    const app = document.getElementById("app");
    app.innerHTML = "lista";
    console.log(pokemones)
    let Pokes = "";
    for (let i = 0; i < pokemones.length; i++) {
        let id = pokemones[i].url.split("/")[6];
        Pokes += `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${pokemones[i].name}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${pokemones[i].name}">
            <p>${pokemones[i].name}</p>
        </div>`;
    }
    app.innerHTML = Pokes;
}