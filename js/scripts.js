let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    const $ = window.$;

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h1>' + item.name + '</h1>');
    let heightElement = $('<p>' +  '<strong>' + 'Height: ' + '</strong>' + item.height + '</p>');
    let pokemonTypes = '';
    for (let i = 0; i < item.types.length; i++) {
      pokemonTypes += item.types[i].type.name;
      if (i !== item.types.length - 1) {
        pokemonTypes += ', ';
      }
    }
    let typesElement = $('<p>' + '<strong>'+ 'Types: ' + '</strong>' + pokemonTypes + '</p>');
    let imageElement = $('<img class="modal-img">');
    imageElement.attr('src', item.imageUrl);

    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalBody.append(imageElement);
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      typeof pokemon.name === "string"
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
        let pokemonList = document.querySelector(".list-group");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.classList.add("btn-primary");
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemon-modal');
        listItem.classList.add("list-group-item"); 
        listItem.appendChild(button);
        pokemonList.appendChild(button);

        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }

    let navbarBrand = document.querySelector('.navbar-brand');
  navbarBrand.addEventListener('click', function() {
    location.reload();
  });

  function showLoadingMessage() {
    let pokemonList = document.querySelector('.pokemon-list');
    let loadingMessage = document.createElement('p');
    pokemonList.appendChild(loadingMessage);
  }
  
  function hideLoadingMessage() {
    let pokemonList = document.querySelector('.pokemon-list');
    pokemonList.innerHTML = '';
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        hideLoadingMessage();
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function(e) {
      console.error(e);
    });
  }

  function showDetails (item) {
    pokemonRepository.loadDetails(item)
    .then(function () {
      showModal(item);
    });
  }

       return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
