// barra de busqueda que ejecuta la API
document.getElementById('searchButton').addEventListener('click', function () {
    const pokemonName = document.getElementById('pokemonSearchInput').value.toLowerCase();

    // Verifica que el nombre del Pokémon no esté vacío
    if (!pokemonName.trim()) {
        alert("Por favor, ingrese un nombre de Pokémon.");
        return;
    }

    // URL de la API
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    // Fetch es la funcion que nos ejecuta la API, tienes que usar la URL de la API, añadiendo el string escrito
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            // se utiliza para leer y analizar esa respuesta como JSON
            return response.json();
        })
        .then(data => {
            // enviamos la data a la funcion de abajo
            displayPokemonData(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Pokémon no encontrado. Por favor, intente con otro nombre.');
        });
});

function displayPokemonData(pokemon) {
    // Aquí agregas la lógica para mostrar la información en tu página
    // Por ejemplo, mostrar el nombre y la imagen del Pokémon
    const resultsContainer = document.getElementById('pokemonResults');
    // Obtener los tipos del Pokémon
    let types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    // añadimos el html a la tabla
    resultsContainer.innerHTML = `
        <tr>
            <td>${pokemon.name}</td>
            <td>${types}</td>
            <td><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></td>
        </tr>`;

}