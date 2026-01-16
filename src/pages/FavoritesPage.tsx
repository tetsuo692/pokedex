import React, { useEffect, useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { getPokemonDetails } from '../api/pokeApi';
import type { Pokemon } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { PokemonModal } from '../components/PokemonModal';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const { t } = useTranslation('common');

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                if (favorites.length === 0) {
                    setPokemonList([]);
                    setLoading(false);
                    return;
                }

                // Fetch all favorite pokemon in parallel
                const promises = favorites.map(id => getPokemonDetails(id.toString()));
                const results = await Promise.all(promises);
                setPokemonList(results);
            } catch (error) {
                console.error("Failed to fetch favorites", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [favorites]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 font-sans transition-colors duration-300">
            <div className="container mx-auto px-6 py-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                    <span className="text-red-500">❤️</span> {t('my_favorites', 'My Favorites')}
                </h2>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : pokemonList.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">{t('no_favorites', 'No favorites yet.')}</p>
                        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                            {t('browse_pokemon', 'Browse Pokemon')}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {pokemonList.map(p => (
                            <PokemonCard
                                key={p.id}
                                name={p.name}
                                onClick={(pk) => setSelectedPokemon(pk)}
                                isFavorite={true}
                                onToggleFavorite={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(p.id);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <PokemonModal
                pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
            />
        </div>
    );
};
