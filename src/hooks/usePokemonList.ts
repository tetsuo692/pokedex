import { useState, useEffect } from 'react';
import { getPokemonList } from '../api/pokeApi';
import type { NamedAPIResource } from '../types/pokemon';

const LIMIT = 20;

export const usePokemonList = () => {
    const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchList = async () => {
            setLoading(true);
            try {
                const offset = (page - 1) * LIMIT;
                const response = await getPokemonList(LIMIT, offset);
                setPokemonList(response.results);
                setTotalPages(Math.ceil(response.count / LIMIT));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, [page]);

    const nextPage = () => setPage(p => Math.min(p + 1, totalPages));
    const prevPage = () => setPage(p => Math.max(p - 1, 1));
    const goToPage = (p: number) => setPage(p);

    return { pokemonList, loading, page, totalPages, nextPage, prevPage, goToPage };
};
