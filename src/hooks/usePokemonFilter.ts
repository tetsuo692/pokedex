import { useState, useEffect } from 'react';
import { getAllPokemon, getPokemonByType, getPokemonList } from '../api/pokeApi';
import type { NamedAPIResource } from '../types/pokemon';

const PAGE_SIZE = 24; // 24 divides nicely by 2, 3, 4, 6, 8, 12 for grids

export const usePokemonFilter = () => {
    const [pokemon, setPokemon] = useState<NamedAPIResource[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('');

    // Cache for type lists and all list to avoid re-fetching
    const [allCache, setAllCache] = useState<NamedAPIResource[] | null>(null);
    const [typeCache, setTypeCache] = useState<Record<string, NamedAPIResource[]>>({});

    useEffect(() => {
        let cancel = false;

        const fetchData = async () => {
            setLoading(true);
            try {
                let sourceList: NamedAPIResource[] = [];
                let totalCount = 0;

                const isFiltering = search || selectedType;

                if (!isFiltering) {
                    // Server-side pagination mode
                    const offset = (page - 1) * PAGE_SIZE;
                    const res = await getPokemonList(PAGE_SIZE, offset);
                    if (cancel) return;
                    sourceList = res.results;
                    totalCount = res.count;
                } else {
                    // Client-side filtering mode

                    // 1. Determine base list
                    let baseList: NamedAPIResource[] = [];

                    if (selectedType) {
                        if (typeCache[selectedType]) {
                            baseList = typeCache[selectedType];
                        } else {
                            baseList = await getPokemonByType(selectedType);
                            if (cancel) return;
                            // Update cache using functional update to be safe, but local access is fine
                            setTypeCache(prev => ({ ...prev, [selectedType]: baseList }));
                        }
                    } else {
                        // No type, but has search -> need All
                        if (allCache) {
                            baseList = allCache;
                        } else {
                            baseList = await getAllPokemon();
                            if (cancel) return;
                            setAllCache(baseList);
                        }
                    }

                    // 2. Apply Search Filter
                    if (search) {
                        baseList = baseList.filter(p => p.name.includes(search.toLowerCase()));
                    }

                    totalCount = baseList.length;

                    // 3. Client-side Pagination
                    const offset = (page - 1) * PAGE_SIZE;
                    sourceList = baseList.slice(offset, offset + PAGE_SIZE);
                }

                setPokemon(sourceList);
                setTotalPages(Math.ceil(totalCount / PAGE_SIZE));

            } catch (err) {
                console.error(err);
            } finally {
                if (!cancel) setLoading(false);
            }
        };

        // Debounce usually handled by input component, but little debounce here is safe
        const timeoutId = setTimeout(fetchData, 300);

        return () => {
            cancel = true;
            clearTimeout(timeoutId);
        };
    }, [page, search, selectedType, allCache, typeCache]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [search, selectedType]);

    return {
        pokemon,
        loading,
        page,
        totalPages,
        setPage,
        search,
        setSearch,
        selectedType,
        setSelectedType
    };
};
