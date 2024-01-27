document.addEventListener('DOMContentLoaded', () => {
    const fightButton = document.getElementById('fight');
  
    const player1 = {
      name: 'Player 1',
      score: 0,
      card: document.getElementById('card1'),
      nameElement: document.getElementById('p1_name'),
      scoreElement: document.getElementById('p1_score'),
    };
  
    const player2 = {
      name: 'Player 2',
      score: 0,
      card: document.getElementById('card2'),
      nameElement: document.getElementById('p2_name'),
      scoreElement: document.getElementById('p2_score'),
    };
  
    const fetchPokemonData = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };
  
    const displayPokemon = (player, pokemon) => {
      const { name, experience, abilities, sprites } = pokemon;
  
      player.nameElement.textContent = player.name;
      player.scoreElement.textContent = `Score: ${player.score}`;
  
      const imgElement = document.createElement('img');
      imgElement.src = sprites.front_default;
      player.card.querySelector('#img').innerHTML = '';
      player.card.querySelector('#img').appendChild(imgElement);
  
      player.card.querySelector('#name').textContent = `Name: ${name}`;
      player.card.querySelector('#experience').textContent = `Experience: ${experience}`;
      const abilitiesList = player.card.querySelector('#abilities');
      abilitiesList.innerHTML = 'Abilities';
      abilities.forEach((ability) => {
        const abilityItem = document.createElement('li');
        abilityItem.textContent = ability.ability.name;
        abilitiesList.appendChild(abilityItem);
      });
    };
  
    const updateScores = () => {
      player1.scoreElement.textContent = `Score: ${player1.score}`;
      player2.scoreElement.textContent = `Score: ${player2.score}`;
    };
  
    const getRandomPokemon = async () => {
      const randomPokemonId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokemon in the PokeAPI
      const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`;
      const pokemonData = await fetchPokemonData(url);
      return pokemonData;
    };
  
    const fight = async () => {
      const pokemon1 = await getRandomPokemon();
      const pokemon2 = await getRandomPokemon();
  
      displayPokemon(player1, pokemon1);
      displayPokemon(player2, pokemon2);
  
      if (pokemon1.base_experience > pokemon2.base_experience) {
        player1.score += 1;
      } else if (pokemon1.base_experience < pokemon2.base_experience) {
        player2.score += 1;
      }
  
      updateScores();
    };
  
    fightButton.addEventListener('click', fight);
  });
  
