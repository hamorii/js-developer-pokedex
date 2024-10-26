const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="popup-wrapper">
                <div class="popup">
                    <div class="upper ${pokemon.type}">
                        <div class="close"><h1>X<h1></div>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                        <span class="name2"><h1>${pokemon.name}</h1></span>
                    <div class="bottom"> 
                        <table>
                            <tr>
                              <th>weight</th>
                              <th>height</th>
                              <th>base_experience</th>
                             </tr>
                            <tr>
                             <td>${pokemon.weight}</td>
                             <td>${pokemon.height}</td>
                             <td>${pokemon.base_experience}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

const closeButton = document.querySelector('.close')


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

pokemonList.addEventListener('click', (event) => {
    if (event.target.closest('.pokemon')) {
        const popup = event.target.closest('.pokemon').querySelector('.popup-wrapper');
        popup.style.display = "block";
    }
});
// Adiciona o event listener para o botão de fechar
document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('.close');

    if (closeButton) {
        const popupWrapper = closeButton.closest('.popup-wrapper');
        popupWrapper.style.display = "none"; 
    }
});

// Adiciona evento de clique ao popup-wrapper
document.addEventListener('click', (event) => {
    const popupWrapper = event.target.closest('.popup-wrapper');

    // Verifica se o clique foi dentro do popup
    if (popupWrapper && !event.target.closest('.popup')) {
        popupWrapper.style.display = "none"; 
    }
});

