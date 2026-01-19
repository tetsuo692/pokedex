import React from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { getTypeColor } from '../utils/colors';
import type { Pokemon } from '../types/pokemon';
import { useTranslation } from 'react-i18next';

interface PokemonCardViewProps {
    pokemon: Pokemon | null;
    loading: boolean;
    onClick: (pokemon: Pokemon) => void;
    isFavorite?: boolean;
    onToggleFavorite?: (e: React.MouseEvent) => void;
}

export const PokemonCardView: React.FC<PokemonCardViewProps> = ({ pokemon, loading, onClick, isFavorite, onToggleFavorite }) => {
    const { t } = useTranslation(['pokemon']);

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse flex flex-col items-center h-64 justify-center transition-colors duration-300">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
        );
    }

    if (!pokemon) {
        return null;
    }

    return (
        <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(pokemon);
                }
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl relative overflow-hidden group border border-transparent dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            onClick={() => onClick(pokemon)}
        >
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-gray-50 dark:bg-gray-900/50 rounded-full z-0 group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50 transition-colors duration-300"></div>

            {/* Favorite Toggle (if provided) */}
            {onToggleFavorite && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleFavorite) {
                            onToggleFavorite(e);
                        }
                    }}
                    aria-label={isFavorite ? `Remove ${pokemon.name} from favorites` : `Add ${pokemon.name} to favorites`}
                    className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-600 text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isFavorite ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`w-6 h-6 ${isFavorite ? "text-red-500" : ""}`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
            )}

            <div className="relative z-10 flex flex-col items-center">
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-32 h-32 object-contain drop-shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                />

                <span className="text-gray-400 dark:text-gray-500 font-mono text-sm mb-1">
                    #{pokemon.id.toString().padStart(3, '0')}
                </span>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white capitalize mb-3 tracking-wide group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {pokemon.name}
                </h2>

                <div className="flex gap-2">
                    {pokemon.types.map((typeInfo) => (
                        <span
                            key={typeInfo.type.name}
                            className={`px-3 py-1 rounded-full text-xs font-semibold text-white capitalize shadow-sm bg-linear-to-br ${getTypeColor(typeInfo.type.name)}`}
                        >
                            {t(`pokemon:types.${typeInfo.type.name}`, typeInfo.type.name)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface PokemonCardProps {
    name: string;
    onClick: (pokemon: Pokemon) => void;
    isFavorite?: boolean;
    onToggleFavorite?: (e: React.MouseEvent) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ name, onClick, isFavorite, onToggleFavorite }) => {
    const { pokemon, loading } = usePokemon(name);
    return <PokemonCardView pokemon={pokemon} loading={loading} onClick={onClick} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />;
};
