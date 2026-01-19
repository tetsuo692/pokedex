import type { Meta, StoryObj } from '@storybook/react';
import { PokemonPerPageSelector } from '../components/PokemonPerPageSelector';

const meta = {
    title: 'Components/PokemonPerPageSelector',
    component: PokemonPerPageSelector,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        limit: { control: 'number' },
        onLimitChange: { action: 'changed' },
    },
} satisfies Meta<typeof PokemonPerPageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        limit: 10,
        onLimitChange: () => { },
    },
};

export const TwentyItems: Story = {
    args: {
        limit: 20,
        onLimitChange: () => { },
    },
};
