import React, { useEffect, useState } from 'react';
import { PokemonCard } from './PokemonCard';
import { PokemonModal } from './PokemonModal';
import { usePokemonFilter } from '../hooks/usePokemonFilter';
import { usePokemonPerPage } from '../hooks/usePokemonPerPage';
import { PokemonPerPageSelector } from './PokemonPerPageSelector';
import { getTypes } from '../api/pokeApi';
import type { NamedAPIResource, Pokemon } from '../types/pokemon';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const PokemonList: React.FC = () => {
    const { t } = useTranslation(['common', 'pokemon']);
    const { limit, setLimit } = usePokemonPerPage();
    const {
        pokemon,
        loading,
        page,
        totalPages,
        setPage,
        search,
        setSearch,
        selectedType,
        setSelectedType
    } = usePokemonFilter(limit);

    const [types, setTypes] = useState<NamedAPIResource[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        getTypes().then(setTypes);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 font-sans transition-colors duration-300">
            {/* Header / Filters */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-[73px] z-20 transition-all border-b border-gray-100 dark:border-gray-700">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                        <div className="flex items-center gap-4">
                            {/* Filters Section */}
                            <PokemonPerPageSelector limit={limit} onLimitChange={setLimit} />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative group w-full sm:w-64">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder={t('search_placeholder')}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white border-none rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-gray-600 w-full transition-all duration-300 shadow-inner"
                                />
                            </div>

                            {/* Type Filter */}
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white border-none rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-gray-600 capitalize text-gray-700 w-full sm:w-48 cursor-pointer shadow-sm hover:shadow-md transition-all appearance-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right .7em top 50%',
                                    backgroundSize: '.65em auto'
                                }}
                            >
                                <option value="">{t('all_types')}</option>
                                {types.map(typeResource => (
                                    <option key={typeResource.name} value={typeResource.name}>{t(`pokemon:types.${typeResource.name}`, typeResource.name)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-6 py-8">
                {loading && pokemon.length === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        {pokemon.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
                                <div className="text-6xl mb-4">🔍</div>
                                <p className="text-xl font-medium">{t('no_pokemon_found')}</p>
                                <p className="text-sm">{t('try_adjusting')}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {pokemon.map(p => (
                                    <PokemonCard
                                        key={p.name}
                                        name={p.name}
                                        onClick={setSelectedPokemon}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-6 mt-16">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1 || loading}
                            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all text-blue-600 dark:text-blue-400 hover:scale-110 active:scale-95"
                        >
                            <FaChevronLeft size={20} />
                        </button>

                        <span className="text-gray-600 dark:text-gray-300 font-medium px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            {t('page_info', { page, total: totalPages })}
                        </span>

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages || loading}
                            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all text-blue-600 dark:text-blue-400 hover:scale-110 active:scale-95"
                        >
                            <FaChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <PokemonModal
                pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
            />
        </div>
    );
};
