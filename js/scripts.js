let pokemonList = [
 // Initialize empty array   
{ name: "Bulbasaur", height: 0.7, type: [ "grass", "poison" ] },
    
{ name: "Kakuna", height: 0.6, type: [ "bug", "poison" ] },
    
{ name: "Gengar", height: 1.5, type: [ "ghost", "poison" ] },

{ name: 'Poliwhirl', height: '1', type: 'water' },

{ name: 'Mankey', height: '0.5', type: 'fighting' },

]


for (let i = 0; i < pokemonList.length; i++)
// Initalize for loop to run for the total length of the array

 { 
    if (pokemonList[i].height > 1) {
        console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!");
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")  - Wow, that's big!" + "<br>");
    } 
    
    else {
        console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>");
    }
}