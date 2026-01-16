import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonCard } from '../PokemonCard';
import { usePokemon } from '../../hooks/usePokemon';
import '@testing-library/jest-dom';

// Mock hook
jest.mock('../../hooks/usePokemon');

const mockUsePokemon = usePokemon as jest.Mock;

const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    types: [{ type: { name: 'grass' } }],
    sprites: {
        front_default: 'front.png',
        other: { 'official-artwork': { front_default: 'official.png' } }
    }
};

describe('PokemonCard', () => {
    it('renders loading state', () => {
        mockUsePokemon.mockReturnValue({ loading: true, pokemon: null });
        render(<PokemonCard name="bulbasaur" onClick={() => { }} />);
        // Check for pulse animation class or structure
        const pulse = document.querySelector('.animate-pulse');
        expect(pulse).toBeInTheDocument();
    });

    it('renders pokemon info', () => {
        mockUsePokemon.mockReturnValue({ loading: false, pokemon: mockPokemon });
        render(<PokemonCard name="bulbasaur" onClick={() => { }} />);
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('pokemon:types.grass')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'official.png');
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        mockUsePokemon.mockReturnValue({ loading: false, pokemon: mockPokemon });
        render(<PokemonCard name="bulbasaur" onClick={handleClick} />);

        // Find the card container. The image has alt=bulbasaur
        const cardImage = screen.getByAltText('bulbasaur');
        fireEvent.click(cardImage);

        expect(handleClick).toHaveBeenCalledWith(mockPokemon);
    });
});
