import { render, screen, waitFor } from '@testing-library/react';
import { FavoritesPage } from '../FavoritesPage';
import { useFavorites } from '../../hooks/useFavorites';
import { getPokemonDetails } from '../../api/pokeApi';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../hooks/useFavorites');
jest.mock('../../api/pokeApi');
jest.mock('../../components/PokemonCard', () => ({
    PokemonCard: ({ name }: { name: string }) => <div data-testid="pokemon-card">{name}</div>
}));
jest.mock('../../components/PokemonModal', () => ({
    PokemonModal: () => <div data-testid="pokemon-modal">Modal</div>
}));

const mockUseFavorites = useFavorites as jest.Mock;
const mockGetPokemonDetails = getPokemonDetails as jest.Mock;

describe('FavoritesPage', () => {
    beforeEach(() => {
        mockUseFavorites.mockReturnValue({
            favorites: [],
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn()
        });
    });

    it('renders empty state', async () => {
        render(
            <MemoryRouter>
                <FavoritesPage />
            </MemoryRouter>
        );
        expect(screen.getByText('no_favorites')).toBeInTheDocument();
    });

    it('renders favorite pokemon', async () => {
        mockUseFavorites.mockReturnValue({
            favorites: [1, 25],
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn()
        });

        mockGetPokemonDetails.mockResolvedValueOnce({
            id: 1, name: 'bulbasaur', types: [{ type: { name: 'grass' } }], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } }
        }).mockResolvedValueOnce({
            id: 25, name: 'pikachu', types: [{ type: { name: 'electric' } }], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } }
        });

        render(
            <MemoryRouter>
                <FavoritesPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('bulbasaur')).toBeInTheDocument();
            expect(screen.getByText('pikachu')).toBeInTheDocument();
        });
    });
});
