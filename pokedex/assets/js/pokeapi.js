


//FUNCAO DE CONVERTER PRA UPPERCASE
function convertUpperCaseFirstLetter(name){
    const nameArray = Array.from(name);
    const firstLetter = nameArray[0];
    const otherLetters = name.replace(firstLetter,'')
    return `
    ${firstLetter.toUpperCase()}${otherLetters}`
}


const pokeAPI = {}



//API - POKEMONS

pokeAPI.getPokemons = (offset = 0, limit = 10) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(URL)
    .then((response) => response.json())
    .then((jsonStats) => jsonStats.results)
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
} 

pokeAPI.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeAPIDetail)
}


//CONVERTER RESULTS DE POKES PRA CLASSE
function convertPokeAPIDetail(pokeDetail){
    const pokemon = new Pokemon()
    
    pokemon.height = pokeDetail.height;
    
    function convertIDNumber(id){
        if (id < 10) {
            id = '00'+id
            return id;
        } 
        else if ((id >= 10) && (id < 100)){
            id = '0'+id
            return id;
        }
        else{
            id = id
            return id;
        }
    };

    pokemon.dexnumber = convertIDNumber(pokeDetail.id);
    
    pokemon.id = pokeDetail.id;
    pokemon.version = pokeDetail.version_group_details;

    pokemon.name = convertUpperCaseFirstLetter(pokeDetail.name)

//ATRIBUINDO ELEMENTOS
    const types = pokeDetail.types.map((typeSlot) => convertUpperCaseFirstLetter(typeSlot.type.name))
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeDetail.id}.png`
    return pokemon;
}


pokeAPI.getIndividualDex = (id) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
    return fetch(URL)
    .then((response) => response.json())
} 

