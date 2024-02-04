

// Controlador de eventos para el botón de búsqueda
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

// Función modificada para incluir un botón "Agregar"
function displayPokemonData(pokemon) {
    const resultsContainer = document.getElementById('pokemonSearchResults');
    let types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    resultsContainer.innerHTML = `
        <tr>
            <td>${pokemon.name}</td>
            <td>${types}</td>
            <td><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></td>
            <td><button class="btn btn-primary add-to-team" data-pokemon='${JSON.stringify(pokemon)}'>Agregar</button></td>
        </tr>`;
}

// Controlador de eventos para botones "Agregar"
document.getElementById('pokemonSearchResults').addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-team')) {
        const pokemon = JSON.parse(event.target.getAttribute('data-pokemon'));
        addToTeam(pokemon);
    }
});

// Función para agregar Pokémon al equipo
function addToTeam(pokemon) {
    const teamContainer = document.getElementById('pokemonTeam');
    let types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    teamContainer.innerHTML += `
        <tr id="team-${pokemon.name}">
            <td>${pokemon.name}</td>
            <td>${types}</td>
            <td><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></td>
            <td><button class="btn btn-danger delete-from-team" data-pokemon-name="${pokemon.name}">Quitar</button></td>
        </tr>`;
}

// Controlador de eventos para eliminar Pokémon del equipo
document.getElementById('pokemonTeam').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-from-team')) {
        const pokemonName = event.target.getAttribute('data-pokemon-name');
        const rowToDelete = document.getElementById(`team-${pokemonName}`);
        if (rowToDelete) {
            rowToDelete.remove();
        }
    }
});

