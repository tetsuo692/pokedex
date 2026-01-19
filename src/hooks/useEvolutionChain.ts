import { useState, useEffect } from 'react';
import { getPokemonSpecies, getEvolutionChain } from '../api/pokeApi';
import type { ChainLink, EvolutionDetail } from '../types/pokemon';

export interface EvolutionNode {
    speciesName: string;
    speciesId: number;
    image: string;
    minLevel?: number;
    trigger?: string;
    item?: string;
    evolvesTo: EvolutionNode[];
}

export const useEvolutionChain = (pokemonId: number | null) => {
    const [evolutionChain, setEvolutionChain] = useState<EvolutionNode | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pokemonId) return;

        const fetchEvolution = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1. Get Species to find Evolution Chain URL
                const species = await getPokemonSpecies(pokemonId);
                if (!species.evolution_chain?.url) {
                    setEvolutionChain(null);
                    return;
                }

                // 2. Get Evolution Chain
                const chainData = await getEvolutionChain(species.evolution_chain.url);

                // 3. Parse Chain recursively
                const parseChain = (link: ChainLink): EvolutionNode => {
                    // Extract ID from URL: https://pokeapi.co/api/v2/pokemon-species/1/
                    const urlParts = link.species.url.split('/');
                    const id = parseInt(urlParts[urlParts.length - 2]);

                    // Evolution details (only relevant if it evolved TO this)
                    // The API structure puts details on the node it evolves INTO.
                    // The root node has empty evolution_details.
                    const details: EvolutionDetail | undefined = link.evolution_details[0];

                    let triggerCondition = "";
                    let levelCondition: number | undefined = undefined;
                    let itemCondition: string | undefined = undefined;

                    if (details) {
                        if (details.trigger.name === 'level-up') {
                            triggerCondition = "Level";
                            levelCondition = details.min_level || undefined;
                            if (!levelCondition && details.min_happiness) triggerCondition = "Happiness";
                            if (!levelCondition && details.min_beauty) triggerCondition = "Beauty";
                            if (!levelCondition && details.min_affection) triggerCondition = "Affection";

                        } else if (details.trigger.name === 'use-item') {
                            triggerCondition = "Item";
                            itemCondition = details.item?.name.replace('-', ' ');
                        } else if (details.trigger.name === 'trade') {
                            triggerCondition = "Trade";
                            if (details.held_item) itemCondition = `Hold ${details.held_item.name}`;
                        } else {
                            triggerCondition = details.trigger.name.replace('-', ' ');
                        }
                    }

                    return {
                        speciesName: link.species.name,
                        speciesId: id,
                        // Construct official artwork URL
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                        minLevel: levelCondition,
                        trigger: triggerCondition,
                        item: itemCondition,
                        evolvesTo: link.evolves_to.map(parseChain)
                    };
                };

                const rootNode = parseChain(chainData.chain);
                setEvolutionChain(rootNode);

            } catch (err) {
                console.error("Failed to fetch evolution chain", err);
                setError("Failed to load evolutions.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvolution();
    }, [pokemonId]);

    return { evolutionChain, loading, error };
};
