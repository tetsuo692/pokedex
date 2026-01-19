import { renderHook, waitFor } from '@testing-library/react';
import { useEvolutionChain } from '../useEvolutionChain';
import * as api from '../../api/pokeApi';

// Mock the API
jest.mock('../../api/pokeApi');

const mockGetPokemonSpecies = api.getPokemonSpecies as jest.Mock;
const mockGetEvolutionChain = api.getEvolutionChain as jest.Mock;

describe('useEvolutionChain', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return null if pokemonId is null', () => {
        const { result } = renderHook(() => useEvolutionChain(null));
        expect(result.current.evolutionChain).toBeNull();
        expect(result.current.loading).toBeFalsy();
    });

    it('should fetch and parse evolution chain correctly', async () => {
        // Mock Species response
        mockGetPokemonSpecies.mockResolvedValue({
            evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' }
        });

        // Mock Chain response
        const mockChainData = {
            chain: {
                is_baby: false,
                species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
                evolution_details: [],
                evolves_to: [
                    {
                        is_baby: false,
                        species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
                        evolution_details: [{
                            trigger: { name: 'level-up', url: '' },
                            min_level: 16,
                            item: null
                        }],
                        evolves_to: [
                            {
                                is_baby: false,
                                species: { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon-species/3/' },
                                evolution_details: [{
                                    trigger: { name: 'level-up', url: '' },
                                    min_level: 32,
                                    item: null
                                }],
                                evolves_to: []
                            }
                        ]
                    }
                ]
            }
        };
        mockGetEvolutionChain.mockResolvedValue(mockChainData);

        const { result } = renderHook(() => useEvolutionChain(1));

        expect(result.current.loading).toBeTruthy();

        await waitFor(() => expect(result.current.loading).toBeFalsy());

        expect(mockGetPokemonSpecies).toHaveBeenCalledWith(1);
        expect(mockGetEvolutionChain).toHaveBeenCalledWith('https://pokeapi.co/api/v2/evolution-chain/1/');

        const chain = result.current.evolutionChain;
        expect(chain).not.toBeNull();
        expect(chain?.speciesName).toBe('bulbasaur');
        expect(chain?.speciesId).toBe(1);
        expect(chain?.evolvesTo).toHaveLength(1);

        const firstEvo = chain?.evolvesTo[0];
        expect(firstEvo?.speciesName).toBe('ivysaur');
        expect(firstEvo?.minLevel).toBe(16);
        expect(firstEvo?.trigger).toBe('Level');

        const secondEvo = firstEvo?.evolvesTo[0];
        expect(secondEvo?.speciesName).toBe('venusaur');
        expect(secondEvo?.minLevel).toBe(32);
    });

    it('should handle API errors', async () => {
        mockGetPokemonSpecies.mockRejectedValue(new Error('API Error'));

        const { result } = renderHook(() => useEvolutionChain(1));

        await waitFor(() => expect(result.current.loading).toBeFalsy());

        expect(result.current.error).toBe("Failed to load evolutions.");
        expect(result.current.evolutionChain).toBeNull();
    });
});
