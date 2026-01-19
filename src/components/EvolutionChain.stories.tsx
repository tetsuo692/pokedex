import type { Meta, StoryObj } from '@storybook/react';
import { EvolutionChainView } from './EvolutionChain';

// Mock the hook interactions by mocking the module?
// Storybook with Vite usually needs explicit mocking or a specific parameters setup.
// Since we can't easily mock the internal hook implementation without a decorator or mock provider,
// we might struggle to show real data without a real backend or mock service worker (MSW).
// However, for this environment, we can rely on proper MSW setup IF it exists, or just acknowledge it tries to fetch.
// 
// Alternatively, we could refactor the component to accept `evolutionChain` as a prop for pure presentation testing, 
// and have a container component that fetches. But I'll stick to the current implementation and 
// assume MSW is not set up, so these stories might fail to load data unless connected to real API.
// 
// Only way to force state is if I mock the import.
// For now, I'll create the story file structure.

const meta = {
    title: 'Components/EvolutionChain',
    component: EvolutionChainView,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        pokemonId: { control: 'number' },
    },
} satisfies Meta<typeof EvolutionChainView>;

export default meta;
type Story = StoryObj<typeof meta>;

// These will try to fetch from real API if network is available in Storybook
export const Bulbasaur: Story = {
    args: {
        pokemonId: 1,
    },
};

export const Pikachu: Story = {
    args: {
        pokemonId: 25,
    },
};

export const Eevee: Story = {
    args: {
        pokemonId: 133,
    },
};
