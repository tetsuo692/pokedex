import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pokemon_per_page_limit';
const DEFAULT_LIMIT = 10;

export const usePokemonPerPage = () => {
    const [limit, setLimitState] = useState<number>(() => {
        try {
            const item = window.localStorage.getItem(STORAGE_KEY);
            return item ? parseInt(item, 10) : DEFAULT_LIMIT;
        } catch (error) {
            console.warn('Error reading localStorage for pokemon limit:', error);
            return DEFAULT_LIMIT;
        }
    });

    const setLimit = (newLimit: number) => {
        try {
            setLimitState(newLimit);
            window.localStorage.setItem(STORAGE_KEY, newLimit.toString());
        } catch (error) {
            console.warn('Error writing to localStorage for pokemon limit:', error);
        }
    };

    // Hydration check/sync in case localStorage changes elsewhere (optional but good practice)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                setLimitState(parseInt(e.newValue, 10));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return { limit, setLimit };
};
