let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#pokemon-modal-container');
    let pokemonListElement = document.querySelector('.pokemon-list');

    function add(pokemon) {
        if (
        //this ensure that only valid pokemon objects will be added to the array
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
        }

    function addListItem(pokemon) {
        //organization of functions and selectors
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        //create button for each pokemon
        const { name } = pokemon;
        button.innerText = name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
        //adds EventListener to button
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
      // Retrieve the list of Pokemon from the PokeAPI 
        return fetch(apiUrl)
        .then(response => response.json())
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
          return Promise.reject(e);
        })
      }
    
      function loadDetails(item) {
        // Retrieve the details of a specific Pokemon from the PokeAPI 
        let url = item.detailsUrl;
        return fetch(url)
          .then(response => response.json())
          .then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types.map(type => type.type.name);
          })
          .catch(function (e) {
            console.error(e);
            return
          });
      }
      
    
      function showDetails(item) {
        //Display the details of a given Pokemon object in the modalContainer
          loadDetails(item).then(function () {
          showPokemonModal({ name: item.name, height: item.height, types: item.types, imageUrl: item.imageUrl });
        });
      }
    
      function showPokemonModal(pokemon) {
        // Create and display the modal with the details of a pokemon object
        let { name, height, types, imageUrl } = pokemon;
        modalContainer.innerHTML = '';
        let pokemonModal = document.createElement('div');
        pokemonModal.classList.add('pokemon-modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'x';
        closeButtonElement.addEventListener('click', hideModal);
        
        let modalTitle = document.createElement('h1');
        modalTitle.classList.add('modal-content', 'modal-title')
        modalTitle.innerText = `${name}`;

        let modalHeight = document.createElement('p');
        modalHeight.classList.add('modal-content', 'modal-list-item');
        modalHeight.innerText = `Height: ${height}`;

        let modalTypes = document.createElement('p');
        modalTypes.classList.add('modal-content', 'modal-list-item');
        modalTypes.innerText = `Type(s): ${types.join(', ')}`;

        let modalImg = document.createElement('img');
        modalImg.classList.add('modal-content', 'modal-img');
        modalImg.src = imageUrl;

        pokemonModal.appendChild(closeButtonElement);
        pokemonModal.appendChild(modalTitle);
        pokemonModal.appendChild(modalHeight);
        pokemonModal.appendChild(modalTypes);
        pokemonModal.appendChild(modalImg);
        modalContainer.appendChild(pokemonModal);

        modalContainer.classList.add('is-visible');
      }

      function hideModal() {
        // Hide the modalContainer by removing the 'is-visible' class
        modalContainer.classList.remove('is-visible');
      }
  
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });
  
      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
  
      document.querySelector('.pokemon-list').addEventListener('click', () => {
        showPokemonModal();
        // Add event listener to each Pokemon list item to display its details in the modalContainer
      });  

       return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showPokemonModal: showPokemonModal
    };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
