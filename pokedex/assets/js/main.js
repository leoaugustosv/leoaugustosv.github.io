let limit = 10;
let offset = 0;
let startingPage = 1;
let startingListSize = 10;
let contador = 0;
let timeout;

const currentPage = document.querySelector("#pageNumber");
const currentListSize = document.getElementById("quantPokeList");
const ListSizeFirstValue = document.getElementById("hiddenQtd");
const resetBtn = document.querySelector("#resetFilters");

const listaDePokes = document.querySelector("#listaPokemonsID");
const listaDeGeracoes = document.querySelector("#regionList");
const modalBody = document.querySelector("#modalDexContent");
const wholeModal = document.querySelector("#dexModal");

const loadingModalHTML = `
<div class="modal-content">
<div class="modal-header">
<span class="close" onclick="closeModal()">&times;</span>
<h2>Carregando...</h2>
</div>
<div class="modal-body bg-properties Togepi-bg" id="modalDexContent">
<div class="loadDiv">
<span class="loadImgContainer"><img class="Togepi" src="./assets/css/img/load/load1.gif" alt="Carregando..." onclick="playCrySpecial('https://pokemoncries.com/cries-old/175.mp3')"></span>
<p class="loadingText" id="loadingText">Carregando...</p>
</div>
</div>

</div>
`;

const loadingDexHTML = `
<div class="loadDivDex">
<span class="loadImgContainer"><img class="Togepi" src="./assets/css/img/load/load1.gif" alt="Carregando..." onclick="playCrySpecial('https://pokemoncries.com/cries-old/175.mp3')"></span>
<p class="loadingTextDex" id="loadingText">Carregando...</p>
</div>
`;

function timeoutFunction(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const NextButton = document.querySelector("#btnNext");
const PrevButton = document.querySelector("#btnPrev");

async function loadPage(offset, limit) {
  await timeoutFunction(100);
  pokeAPI.getPokemons(offset, limit).then((pokemonList = []) => {
    listaDePokes.style.display = "grid";
    listaDePokes.innerHTML = pokemonList
      .map(
        (pokemon) => `
            <li class="pokemon ${pokemon.type}" id="pokemonBox" value="${
          pokemon.id
        }" onclick="showPokemonDexDetails(${pokemon.id})">
                        <span class="dexnumber">#${pokemon.dexnumber}</span>
                        <span class="pokename">${pokemon.name}</span>
                        
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types
                                  .map(
                                    (type) =>
                                      `<li class="type ${type}">${type}</li>`
                                  )
                                  .join("")}
                            </ol>
                            <img src="${pokemon.sprite}" class="pokeImg" alt="${
          pokemon.name
        }">
                        </div>
                        
                </li>
        `
      )
      .join("");
  });
}

loadPage(offset, limit);

function showSelectedsize() {
  listaDePokes.innerHTML = loadingDexHTML;
  listaDePokes.style.display = "";
  limit = parseInt(currentListSize.value);
  offset = offset;
  console.log(offset, limit);
  loadPage(offset, limit);
}

function filterGen() {
  listaDePokes.innerHTML = loadingDexHTML;
  listaDePokes.style.display = "";
  ListSizeFirstValue.style.display = "block";
  switch (parseInt(listaDeGeracoes.value)) {
    case 0:
      limit = 10;
      offset = 0;
      ListSizeFirstValue.style.display = "none";
      break;
    case 1:
      limit = 151;
      offset = 0;
      break;
    case 2:
      limit = 99;
      offset = 151;
      break;

    case 3:
      limit = 135;
      offset = 251;
      break;

    case 4:
      limit = 107;
      offset = 386;
      break;

    case 5:
      limit = 156;
      offset = 493;
      break;

    case 6:
      limit = 72;
      offset = 649;
      break;

    case 7:
      limit = 88;
      offset = 721;
      break;

    case 8:
      limit = 96;
      offset = 809;
      break;

    case 9:
      limit = 121;
      offset = 905;
      break;
  }
  currentPage.innerHTML = startingPage = 1;
  ListSizeFirstValue.innerText = limit;
  ListSizeFirstValue.value = limit;
  currentListSize.value = limit;
  loadPage(offset, limit);
}

NextButton.addEventListener("click", () => {
  if ((parseInt(listaDeGeracoes.value) == "0") == true) {
    listaDePokes.innerHTML = loadingDexHTML;
    listaDePokes.style.display = "";
    offset += limit;
    loadPage(offset, limit);
    return (currentPage.innerHTML = startingPage += 1);
  } else if ((parseInt(listaDeGeracoes.value) == "9") == true) {
    listaDeGeracoes.value = 0;
    listaDePokes.innerHTML = loadingDexHTML;
    listaDePokes.style.display = "";
    offset += limit;
    limit = 50;
    currentListSize.value = limit;
    loadPage(offset, limit);
    return (currentPage.innerHTML = startingPage = 22);
  } else {
    listaDeGeracoes.value = parseInt(listaDeGeracoes.value) + 1;
    filterGen();
  }
});

PrevButton.addEventListener("click", () => {
  if ((parseInt(listaDeGeracoes.value) == "0") === true) {
    if (offset - limit < 0 && offset <= 0) {
      currentPage.innerHTML = startingPage = 1;
      alert("Não há como voltar mais do que isso!");
    } else if (offset - limit < 0 && offset > 0) {
      listaDePokes.innerHTML = loadingDexHTML;
      listaDePokes.style.display = "";
      offset = 0;
      loadPage(offset, limit);
      return (currentPage.innerHTML = startingPage = 1);
    } else {
      listaDePokes.innerHTML = loadingDexHTML;
      listaDePokes.style.display = "";
      offset -= limit;
      loadPage(offset, limit);

      if (startingPage - 1 <= 0) {
        startingPage = 1;
        currentPage.innerHTML = startingPage;
      } else {
        currentPage.innerHTML = startingPage -= 1;
      }
    }
  } else {
    listaDeGeracoes.value = parseInt(listaDeGeracoes.value) - 1;
    filterGen();
  }
});

resetBtn.addEventListener("click", () => {
  listaDePokes.innerHTML = loadingDexHTML;
  listaDePokes.style.display = "";
  currentPage.innerHTML = startingPage = 1;

  offset = 0;
  limit = 10;
  ListSizeFirstValue.style.display = "none";
  listaDeGeracoes.value = 0;
  ListSizeFirstValue.innerText = limit;
  ListSizeFirstValue.value = limit;
  currentListSize.value = limit;
  loadPage(offset, limit);
});

async function playCry(url) {
  const audio = new Audio(url);

  const pokemonImageOnDex = document.querySelector(".pokeImgModal");

  pokemonImageOnDex.className = "pokeImg pokeImgModal bounceOnce";
  audio.play();

  modal.style.pointerEvents = "none";
  listaDePokes.style.pointerEvents = "none";
  await timeoutFunction(1000);
  pokemonImageOnDex.className = "pokeImg pokeImgModal";
  modal.style.pointerEvents = "";
  listaDePokes.style.pointerEvents = "";

  // const footerText = document.querySelector("#footerText")
  // audio.play().catch(error => {footerText.innerText = "O som desse pokémon não foi encontrado."});
}

function playCrySpecial(url) {
  const audio = new Audio(url);
  audio.play();
  let texto = document.getElementById("loadingText");
  contador = contador + 1;
  texto.innerText = `Togepi! (${contador}x)`;
}

const modal = document.getElementById("dexModal");
const closeButton = document.getElementsByClassName("close");

async function showPokemonDexDetails(value) {
  if (value <= 0) {
    alert("Não há como voltar mais do que isso!");
  } else {
    wholeModal.innerHTML = loadingModalHTML;
    const PokemonIndividual = {};
    modal.style.display = "block";
    modal.style.pointerEvents = "none";
    listaDePokes.style.pointerEvents = "none";

    await timeoutFunction(1500);

    pokeAPI
      .getIndividualDex(value)
      .then((pokemon) => {
        PokemonIndividual.namedex = pokemon.name;
        PokemonIndividual.id = pokemon.id;
        PokemonIndividual.basexp = pokemon.base_experience;
        PokemonIndividual.height = (pokemon.height / 10).toFixed(0);
        PokemonIndividual.weight = (pokemon.weight / 10).toFixed(0);
        PokemonIndividual.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        PokemonIndividual.animatedsprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
        PokemonIndividual.abilities = pokemon.abilities.map(
          (abilitiesSlot) => abilitiesSlot.ability.name
        );
        PokemonIndividual.abilitiesHidden = pokemon.abilities.map(
          (abilitiesStatus) => abilitiesStatus.is_hidden
        );
        PokemonIndividual.stats = pokemon.stats.map(
          (statsSlot) => statsSlot.base_stat
        );
        PokemonIndividual.cry = `https://pokemoncries.com/cries/${pokemon.id}.mp3`;

        const types = pokemon.types.map((typeSlot) => typeSlot.type.name);
        const [type, type2] = types;

        PokemonIndividual.types = types;

        PokemonIndividual.maintype = type;
        PokemonIndividual.secondarytype = type2;
        if (type2 === undefined) {
          PokemonIndividual.secondarytype = type;
        }
      })
      .then(() => {
        wholeModal.innerHTML = `
<div class="modal-content">
<div class="modal-header ${convertUpperCaseFirstLetter(
          PokemonIndividual.maintype
        )}">
<span class="close" onclick="closeModal()">&times;</span>
<h2 class="modalTitle capitalize">${PokemonIndividual.namedex}</h2>
</div>
<div class="modal-body bg-properties ${convertUpperCaseFirstLetter(
          PokemonIndividual.maintype
        )}-bg" id="modalDexContent">
<img src="${PokemonIndividual.sprite}" class="pokeImg pokeImgModal" alt="${
          PokemonIndividual.namedex
        }" onclick="playCry('${PokemonIndividual.cry}')">
<div class="pokeArrows">
<input type="button" class="pokeArrowButton ArrowLeft ${convertUpperCaseFirstLetter(
          PokemonIndividual.maintype
        )}" id="btnPrevPoke" value="<" onclick="showPokemonDexDetails(${
          PokemonIndividual.id - 1
        })">
<input type="button" class="pokeArrowButton ArrowRight ${convertUpperCaseFirstLetter(
          PokemonIndividual.maintype
        )}" id="btnNextPoke" value=">" onclick="showPokemonDexDetails(${
          PokemonIndividual.id + 1
        })">
</div>
<div class="infosContainer">
        <div class="dexInfosBody">
       <p><b>Altura:</b> <span class="ApiInfo">${
         PokemonIndividual.height
       }m</span> / <span class="ApiInfo">${(
          PokemonIndividual.height * 100
        ).toFixed(0)}cm</span></p>
       <p><b>Peso:</b> <span class="ApiInfo">${
         PokemonIndividual.weight
       }kg</span></p>
       <p><b>Habilidades:</b> <span class="ApiInfo">${PokemonIndividual.abilities.join(
         ", "
       )}</span></p>
       </div>
       </div>
       </div>
<div class="modal-footer ${convertUpperCaseFirstLetter(
          PokemonIndividual.secondarytype
        )}">
<h3 class="modalTitle" id="footerText">Clique no ${convertUpperCaseFirstLetter(
          PokemonIndividual.namedex
        )} para ouvir seu som!</h3>
<audio id="pokeCry" src="${PokemonIndividual.cry}"></audio>
</div>
</div>
    `;
      })
      .then(async () => {
        await timeoutFunction(300);
      })
      .then(() => {
        playCry(`${PokemonIndividual.cry}`);
      });
  }
}

function closeModal() {
  modal.style.display = "none";

  wholeModal.innerHTML = loadingModalHTML;
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    wholeModal.innerHTML = loadingModalHTML;
  }
};
