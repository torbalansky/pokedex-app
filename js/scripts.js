let pokemonRepository = (function () {
let pokemonList = [

{ name: "Bulbasaur", height: 0.7, type: [ "grass", "poison" ] },
    
{ name: "Kakuna", height: 0.6, type: [ "bug", "poison" ] },
    
{ name: "Gengar", height: 1.5, type: [ "ghost", "poison" ] },

{ name: 'Poliwhirl', height: '1', type: 'water' },

{ name: 'Mankey', height: '0.5', type: 'fighting' },

]

    function add(pokemon) {
        {
            if (
                //this ensure that only valid pokemon objects will be added to the array
                typeof pokemon === "object" &
                "name" in pokemon &
                "height" in pokemon &
                "type" in pokemon
              ) {
                repository.push(pokemon);
              } else {
                console.log("pokemon is not correct");
              }
        }
    }

    function getAll() {
            return pokemonList;
        }

        function addListItem(pokemon){
        //organization of functions and selectors
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        //creates button for each pokemon
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        //adds EventListener to button
        button.addEventListener("click", function() {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(`Name: ${pokemon.name}, Height: ${pokemon.height} cm,  Type: ${pokemon.type}`);
        }

       return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
};
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon); 
});