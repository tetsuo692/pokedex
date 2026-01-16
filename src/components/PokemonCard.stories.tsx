import type { Meta, StoryObj } from '@storybook/react';
import { PokemonCardView } from './PokemonCard';

const meta = {
    title: 'Components/PokemonCard',
    component: PokemonCardView,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'clicked' },
    },
} satisfies Meta<typeof PokemonCardView>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    abilities: [],
    stats: [],
    moves: [],
    types: [{ slot: 1, type: { name: 'grass', url: '' } }, { slot: 2, type: { name: 'poison', url: '' } }],
    sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        other: { 'official-artwork': { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' } }
    }
};

export const Default: Story = {
    args: {
        pokemon: mockPokemon as any, // Cast to any to avoid full mock pain
        loading: false,
        onClick: () => { },
    },
};

export const FireType: Story = {
    args: {
        pokemon: {
            ...mockPokemon,
            name: 'charmander',
            types: [{ slot: 1, type: { name: 'fire', url: '' } }],
            sprites: {
                ...mockPokemon.sprites,
                other: { 'official-artwork': { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' } }
            }
        } as any,
        loading: false,
        onClick: () => { },
    },
};

export const Loading: Story = {
    args: {
        pokemon: null,
        loading: true,
        onClick: () => { },
    },
};
