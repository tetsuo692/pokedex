import React from 'react';
import { useEvolutionChain, type EvolutionNode } from '../hooks/useEvolutionChain';
import { FaArrowDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface EvolutionChainProps {
    pokemonId: number;
}

const EvolutionStep: React.FC<{ node: EvolutionNode }> = ({ node }) => {
    return (
        <div className="flex flex-col items-center my-4 relative group">
            <div className={`
                relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 transition-all duration-300
                bg-white dark:bg-gray-700
                border-gray-100 dark:border-gray-600 group-hover:border-blue-200 dark:group-hover:border-blue-900
            `}>
                <img
                    src={node.image}
                    alt={node.speciesName}
                    className="w-full h-full object-contain p-2 z-10 relative"
                    loading="lazy"
                />
            </div>
            <span className="mt-2 text-sm font-bold capitalize text-gray-800 dark:text-gray-200">
                {node.speciesName}
            </span>
            {/* Types could be fetched here if we wanted, but we only have species data easily. Keeping it simple. */}
        </div>
    );
};

const EvolutionCondition: React.FC<{ node: EvolutionNode }> = ({ node }) => {
    if (!node.trigger && !node.minLevel && !node.item) return <FaArrowDown className="text-gray-300 dark:text-gray-600 my-2" />;

    return (
        <div className="flex flex-col items-center justify-center my-2 min-h-[60px]">
            <FaArrowDown className="text-gray-400 dark:text-gray-500 mb-1" />
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 text-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full whitespace-nowrap">
                {node.minLevel ? `Lvl ${node.minLevel}` :
                    node.item ? node.item :
                        node.trigger ? node.trigger : 'Evolve'}
            </span>
        </div>
    );
};

export const EvolutionChainView: React.FC<EvolutionChainProps> = ({ pokemonId }) => {
    const { evolutionChain, loading, error } = useEvolutionChain(pokemonId);
    const { t } = useTranslation('common');

    if (loading) {
        return (
            <div className="mt-8 animate-pulse flex flex-col items-center gap-8">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
        );
    }

    if (error || !evolutionChain) {
        return null; // Or show error message
    }

    // Recursive render helper
    const renderChain = (node: EvolutionNode): React.ReactNode => {
        return (
            <div className="flex flex-col items-center">
                <EvolutionStep node={node} />

                {node.evolvesTo.length > 0 && (
                    <div className="flex flex-row gap-8 mt-2">
                        {node.evolvesTo.map((child) => (
                            <div key={child.speciesId} className="flex flex-col items-center">
                                <EvolutionCondition node={child} />
                                {renderChain(child)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 w-full">
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white capitalize">{t('evolutions', 'Evolutions')}</h3>
            <div className="flex justify-center overflow-x-auto py-4">
                {renderChain(evolutionChain)}
            </div>
        </div>
    );
};
