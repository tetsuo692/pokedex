import React from 'react';
import type { Pokemon } from '../types/pokemon';
import { getTypeColor } from '../utils/colors';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaRulerVertical, FaWeightHanging, FaHeart } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites';
import { useTranslation } from 'react-i18next';

interface PokemonModalProps {
    pokemon: Pokemon | null;
    onClose: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { t } = useTranslation(['common', 'pokemon']);

    if (!pokemon) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative transition-colors duration-300"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button & Favorite */}
                    <div className="absolute top-4 right-4 z-20 flex gap-3">
                        {/* Favorite Button */}
                        <button
                            onClick={() => toggleFavorite(pokemon.id)}
                            aria-label={isFavorite(pokemon.id) ? t('remove_favorite', "Retirer des favoris") : t('add_favorite', "Ajouter aux favoris")}
                            className={`
                        p-3 rounded-full transition-all duration-300 shadow-sm border-2 focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${isFavorite(pokemon.id)
                                    ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 hover:shadow-md focus:ring-red-400"
                                    : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-gray-400"
                                }
                    `}
                        >
                            <FaHeart size={20} className={isFavorite(pokemon.id) ? "fill-current" : "hidden"} />
                            <FaHeart size={20} className={!isFavorite(pokemon.id) ? "fill-none stroke-current stroke-2" : "hidden"} />
                        </button>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            aria-label={t('close_modal', "Fermer la modale")}
                            className="p-3 bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 text-gray-500 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-white transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Left Side: Visuals */}
                    <div className={`w-full md:w-2/5 p-8 flex flex-col items-center justify-center relative overflow-hidden ${getTypeColor(pokemon.types[0].type.name)}`}>
                        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent to-black/10"></div>
                        <div className="relative z-10 text-white text-center">
                            <span className="text-sm font-bold opacity-80">#{pokemon.id.toString().padStart(3, '0')}</span>
                            <h2 id="modal-title" className="text-4xl font-bold capitalize mb-4 tracking-wide">{pokemon.name}</h2>
                            <div className="flex gap-2 justify-center mb-8">
                                {pokemon.types.map((typeInfo) => (
                                    <span key={typeInfo.type.name} className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-white font-semibold shadow-sm capitalize text-sm border border-white/30">
                                        {t(`pokemon:types.${typeInfo.type.name}`, typeInfo.type.name)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <motion.img
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="w-56 h-56 md:w-64 md:h-64 object-contain relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* Right Side: Stats & Info */}
                    <div className="w-full md:w-3/5 p-8 overflow-y-auto bg-white dark:bg-gray-800 transition-colors duration-300">

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                <FaRulerVertical className="text-gray-400 dark:text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('height')}</p>
                                    <p className="font-bold text-gray-800 dark:text-gray-100">{pokemon.height / 10} m</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                <FaWeightHanging className="text-gray-400 dark:text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('weight')}</p>
                                    <p className="font-bold text-gray-800 dark:text-gray-100">{pokemon.weight / 10} kg</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">{t('base_stats')}</h3>
                        <div className="space-y-4 mb-8">
                            {pokemon.stats.map((stat) => (
                                <div key={stat.stat.name}>
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                                        <span className="capitalize font-medium">{t(`pokemon:stats.${stat.stat.name}`, stat.stat.name)}</span>
                                        <span className="font-bold">{stat.base_stat}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className={`${getTypeColor(pokemon.types[0].type.name)} h-2 rounded-full opacity-80`}
                                        ></motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">{t('abilities')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {pokemon.abilities.map((ability) => (
                                <span key={ability.ability.name} className="border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-xl text-sm capitalize hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-default">
                                    {ability.ability.name.replace('-', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
