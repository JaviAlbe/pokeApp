import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

//Gets all pokemon available in the pokemon api.
export const fetchAllPokemon = async () => {
    // Request URL without a specific limit
    const requestUrl: string = API_BASE_URL + '/pokemon?limit=100000&offset=0'; // Using a very high limit to ensure all Pokémon are fetched
    console.log('[Pokeapi] - fetchAllPokemon() - requestUrl: ', requestUrl);
    try {
        const response = await axios.get(requestUrl);
        console.log('[Pokeapi] - fetchAllPokemon() - response: ', response);
        console.log('[Pokeapi] - fetchAllPokemon() - results: ', response.data.results);
        return response.data.results; // Returns an array of Pokémon objects with `name` and `url`
    } catch (error) {
        console.error('Error fetching all Pokémon:', error);
        throw error;
    }
};

//Gets a list of pokemon by searching a term
export const fetchPokemonByName = async (name: string) => {
    const requestUrl: string = `${API_BASE_URL}/pokemon/${name.toLowerCase()}`;
    console.log('[Pokeapi] - fetchPokemonByName() - requestUrl: ', requestUrl);
    try {
        const response = await axios.get(requestUrl);
        console.log('[Pokeapi] - fetchPokemonByName() - response: ', response);
        console.log('[Pokeapi] - fetchPokemonByName() - data: ', response.data);
        return response.data; // Returns full Pokémon data
    } catch (error) {
        console.error('[Pokeapi] - fetchPokemonByName() - Error:', error);
        throw error;
    }
};

//Gets the list of the original 150 pokemon
export const fetchOriginalPokemon = async () => {
    const requestUrl: string = API_BASE_URL + '/pokemon?limit=150';
    console.log('[Pokeapi] - fetchOriginalPokemon() - requestUrl: ', requestUrl)
    try {
        const response = await axios.get(requestUrl);
        console.log('[Pokeapi] - fetchOriginalPokemon() - response: ', response)

        console.log('[Pokeapi] - fetchOriginalPokemon() - results: ', response.data.results)
        return response.data.results; // Returns an array of Pokémon objects with `name` and `url`
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
};