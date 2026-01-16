import { useState, useEffect } from 'react';
import { getPokemonDetails } from '../api/pokeApi';
import type { Pokemon } from '../types/pokemon';

export const usePokemon = (name: string) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getPokemonDetails(name)
            .then(data => {
                if (mounted) {
                    setPokemon(data);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (mounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => { mounted = false; };
    }, [name]);

    return { pokemon, loading, error };
};
