import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonPerPageSelector } from '../components/PokemonPerPageSelector';
import '@testing-library/jest-dom';

describe('PokemonPerPageSelector', () => {
    it('renders correctly with initial limit', () => {
        const onLimitChange = jest.fn();
        render(<PokemonPerPageSelector limit={10} onLimitChange={onLimitChange} />);

        const select = screen.getByLabelText(/select/i);
        expect(select).toBeInTheDocument();
        expect(select).toHaveValue('10');
    });

    it('renders all options from 5 to 50', () => {
        const onLimitChange = jest.fn();
        render(<PokemonPerPageSelector limit={10} onLimitChange={onLimitChange} />);

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(10);
        expect(options[0]).toHaveValue('5');
        expect(options[9]).toHaveValue('50');
    });

    it('calls onLimitChange when selection changes', () => {
        const onLimitChange = jest.fn();
        render(<PokemonPerPageSelector limit={10} onLimitChange={onLimitChange} />);

        const select = screen.getByLabelText(/select/i);
        fireEvent.change(select, { target: { value: '20' } });

        expect(onLimitChange).toHaveBeenCalledWith(20);
    });
});
