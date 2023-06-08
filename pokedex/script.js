const pokemonContainer = document.querySelector("#pokemon-container");
const moreBtn = document.querySelector("#more-btn");
let nextUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

function buildTemplate(name, imgUrl, id) {
  return `
  <div class="col-6 col-md-4 col-lg-3 mb-3">
    <div class="pokemon-card" data-id="${id}" >
      <img src="${imgUrl}" alt="${name}"
        class="w-100 rounded shadow">
      <div class="d-flex justify-content-between">
        <h5 class="mt-2">${name}</h5>
        <div class="btn-container">
        ${!getStoredItems().includes(id)
          ? '<button id="catch-btn" class="btn btn-outline-primary btn-sm h-75 mt-2">Catch</button>'
          : '<button id="uncatch-btn" class="btn btn-outline-danger btn-sm h-75 mt-2">UnCatch</button>'}
        </div>
      </div>
    </div>
  </div>
  `;
}

function addToStorage(id) {
  let storedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
  const isDuplicate = storedPokemons.some(
    storedPokemon => storedPokemon === id
  );
  if (!isDuplicate) {
    storedPokemons.push(id);
    localStorage.setItem("pokemons", JSON.stringify(storedPokemons));
  }
}
function removeFromStorage(id) {
  let storedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];

  const index = storedPokemons.findIndex(pokemon => pokemon === id);

  if (index !== -1) {
    storedPokemons.splice(index, 1);
    localStorage.setItem("pokemons", JSON.stringify(storedPokemons));
  }
}
function getStoredItems() {
  const storedItems = localStorage.getItem("pokemons");

  if (storedItems) {
    return JSON.parse(storedItems);
  } else {
    return [];
  }
}

function reload() {
  const pokemons = document.querySelectorAll(".pokemon-card");
  pokemons.forEach(pokemon => {
    const img = pokemon.querySelector("img");
    const btnContainer = pokemon.querySelector(".btn-container");
    const catchBtn = pokemon.querySelector("#catch-btn");
    const uncatchBtn = pokemon.querySelector("#uncatch-btn");
    img.onclick = e => {
      showModal(
        pokemon.querySelector("h5").innerText,
        img.src,
        pokemon.dataset.id
      );
    };
    if (catchBtn)
      catchBtn.onclick = () => {
        addToStorage(pokemon.dataset.id);
        catchBtn.remove();
        btnContainer.innerHTML = `<button id="uncatch-btn" class="btn btn-outline-danger btn-sm h-75 mt-2">UnCatch</button>`;
        reload();
      };
    if (uncatchBtn)
      uncatchBtn.onclick = () => {
        removeFromStorage(pokemon.dataset.id);
        uncatchBtn.remove();
        btnContainer.innerHTML = `<button id="catch-btn" class="btn btn-outline-primary btn-sm h-75 mt-2">Catch</button>`;
        reload();
      };
  });
}
function fetchPokemon() {
  fetch(nextUrl).then(res => {
    res.json().then(data => {
      nextUrl = data.next;
      const pokemons = [];
      for (const item of data.results) {
        const list = item.url.toString().split("/");
        const id = list[6];
        pokemons.push({ ...item, id });
      }
      pokemons.forEach(pokemon => {
        const pokemonTemplate = buildTemplate(
          pokemon.name,
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
          pokemon.id
        );
        pokemonContainer.innerHTML += pokemonTemplate;
      });
      moreBtn.classList.remove("d-none");
      reload();
    });
  });
}

function showModal(name, imgUrl, id) {
  const modal = document.querySelector("#modal");
  modal.classList.remove("d-none");
  modal.querySelector("h6").innerText = name;
  modal.querySelector("img").src = imgUrl;
  id;
}

window.onload = () => {
  fetchPokemon();
};

moreBtn.onclick = () => {
  moreBtn.classList.add("d-none");
  fetchPokemon();
};
