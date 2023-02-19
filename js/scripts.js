let pokemonRepository = (function () {
let pokemonList = [

{ name: "Bulbasaur", height: 0.7, type: [ "grass", "poison" ] },
    
{ name: "Kakuna", height: 0.6, type: [ "bug", "poison" ] },
    
{ name: "Gengar", height: 1.5, type: [ "ghost", "poison" ] },

{ name: 'Poliwhirl', height: '1', type: 'water' },

{ name: 'Mankey', height: '0.5', type: 'fighting' },

]

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
};
})();

pokemonRepository.getAll().forEach(function(pokemon)
 { 
    if (pokemon.height > 1) {
        console.log(pokemon.name + " (height: " + pokemon.height + ") - Wow, that's big!");
        document.write(pokemon.name + " (height: " + pokemon.height + ")  - Wow, that's big!" + "<br>");
    } 
    
    else {
        console.log(pokemon.name + " (height: " + pokemon.height + ")");
        document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<br>");
    }
});