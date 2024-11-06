import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';


//Gets the list of the original 150 pokemons
export const fetchOriginalPokemon = async () => {
    try {
        const requestUrl: string = API_BASE_URL + '/pokemon?limit=150';
        console.log('[Pokeapi] - fetchOriginalPokemon() - requestUrl: ', requestUrl)

        const response = await axios.get(requestUrl);
        console.log('[Pokeapi] - fetchOriginalPokemon() - response: ', response)

        console.log('[Pokeapi] - fetchOriginalPokemon() - results: ', response.data.results)
        return response.data.results; // Returns an array of Pokémon objects with `name` and `url`
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
};