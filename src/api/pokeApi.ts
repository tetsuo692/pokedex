import axios from 'axios';
import type { Pokemon, PokemonListResponse, NamedAPIResource } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const api = axios.create({
    baseURL: BASE_URL,
});

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
