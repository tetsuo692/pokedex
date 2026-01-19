import { render, screen, waitFor } from '@testing-library/react';
import { PokemonList } from '../PokemonList';
import { usePokemonFilter } from '../../hooks/usePokemonFilter';
import { getTypes } from '../../api/pokeApi';
import { usePokemon } from '../../hooks/usePokemon';
import { usePokemonPerPage } from '../../hooks/usePokemonPerPage';

jest.mock('../../hooks/usePokemonFilter');
jest.mock('../../api/pokeApi');
jest.mock('../../hooks/usePokemon');
jest.mock('../../hooks/usePokemonPerPage');
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('../PokemonModal', () => ({
    PokemonModal: () => <div data-testid="pokemon-modal" />
}));
jest.mock('../PokemonPerPageSelector', () => ({
    PokemonPerPageSelector: () => <div data-testid="per-page-selector" />
}));

const mockUsePokemonFilter = usePokemonFilter as jest.Mock;
const mockGetTypes = getTypes as jest.Mock;
const mockUsePokemon = usePokemon as jest.Mock;
const mockUsePokemonPerPage = usePokemonPerPage as jest.Mock;

describe('PokemonList', () => {
    beforeEach(() => {
        mockGetTypes.mockResolvedValue([{ name: 'fire', url: '' }]);
        mockUsePokemonPerPage.mockReturnValue({
            limit: 20,
            setLimit: jest.fn()
        });
        mockUsePokemon.mockReturnValue({
            pokemon: {
                id: 25,
                name: 'pikachu',
                sprites: { other: { 'official-artwork': { front_default: 'img.png' } } },
                types: [{ type: { name: 'electric' } }]
            },
            loading: false
        });
    });

    it('renders empty message when no pokemon', async () => {
        mockUsePokemonFilter.mockReturnValue({
            pokemon: [],
            loading: false,
            page: 1,
            totalPages: 1,
            search: '',
            setSearch: jest.fn(),
            selectedType: '',
            setSelectedType: jest.fn(),
            setPage: jest.fn()
        });

        render(<PokemonList />);
        expect(await screen.findByText(/no_pokemon_found/i)).toBeInTheDocument();
    });

    it('renders pokemon list', async () => {
        mockUsePokemonFilter.mockReturnValue({
            pokemon: [{ name: 'pikachu', url: '' }],
            loading: false,
            page: 1,
            totalPages: 1,
            search: '',
            setSearch: jest.fn(),
            selectedType: '',
            setSelectedType: jest.fn(),
            setPage: jest.fn()
        });

        render(<PokemonList />);
        await waitFor(() => expect(screen.getByText('pikachu')).toBeInTheDocument());
    });
});
