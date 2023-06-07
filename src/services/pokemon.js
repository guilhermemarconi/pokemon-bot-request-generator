const BASE_URL = 'https://pokeapi.co/api/v2'

export const getAllPokemon = () => fetch(
  `${BASE_URL}/pokemon?limit=100000&offset=0`
).then((response) => response.json())

export const getPokemonData = (pokemon) => fetch(
  `${BASE_URL}/pokemon/${pokemon}`
).then(response => response.json())
