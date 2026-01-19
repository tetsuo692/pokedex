export const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-600',
    grass: 'bg-green-500',
    ice: 'bg-cyan-600',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-500',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-600',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-800',
    dragon: 'bg-indigo-600',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-500',
};

export const getTypeColor = (type: string) => {
    return typeColors[type] || 'bg-gray-200';
};
