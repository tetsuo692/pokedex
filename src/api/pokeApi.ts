import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import type { Pokemon, PokemonListResponse, NamedAPIResource, PokemonSpecies, EvolutionChain } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const api = setupCache(axios.create({
    baseURL: BASE_URL,
}));

export const getPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
};

export const getPokemonDetails = async (nameOrId: string | number): Promise<Pokemon> => {
    // Handle caching if needed, but axios doesn't cache by default.
    // For now simple fetch.
    const response = await api.get<Pokemon>(`/pokemon/${nameOrId}`);
    return response.data;
};

export const getAllPokemon = async (): Promise<NamedAPIResource[]> => {
    // Fetch first 1000 or so for search
    const response = await api.get<PokemonListResponse>(`/pokemon?limit=1000`);
    return response.data.results;
};

export const getTypes = async (): Promise<NamedAPIResource[]> => {
    const response = await api.get<{ results: NamedAPIResource[] }>(`/type`);
    return response.data.results;
}

export const getPokemonByType = async (type: string): Promise<NamedAPIResource[]> => {
    const response = await api.get<{ pokemon: { pokemon: NamedAPIResource }[] }>(`/type/${type}`);
    // Transform struct
    return response.data.pokemon.map(p => p.pokemon);
}

export const getPokemonSpecies = async (id: number): Promise<PokemonSpecies> => {
    const response = await api.get<PokemonSpecies>(`/pokemon-species/${id}`);
    return response.data;
};

export const getEvolutionChain = async (url: string): Promise<EvolutionChain> => {
    // URL usually comes full like https://pokeapi.co/api/v2/evolution-chain/1/
    // We can use it directly or extract ID. Helper uses axios instance which has BaseURL.
    // If URL is full, axios handles it if we pass it, OR we can just use axios.get directly if it's external.
    // However, the URL from API is absolute.
    const response = await axios.get<EvolutionChain>(url);
    return response.data;
};
