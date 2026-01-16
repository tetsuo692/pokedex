import { useState, useEffect } from 'react';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('pokedex_favorites');
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse favorites', e);
            }
        }
    }, []);

    const toggleFavorite = (id: number) => {
        setFavorites(prev => {
            const newFavs = prev.includes(id)
                ? prev.filter(fid => fid !== id)
                : [...prev, id];
            localStorage.setItem('pokedex_favorites', JSON.stringify(newFavs));
            return newFavs;
        });
    };

    const isFavorite = (id: number) => favorites.includes(id);

    return { favorites, toggleFavorite, isFavorite };
}
