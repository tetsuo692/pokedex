import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${theme === 'dark'
                    ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            aria-label={theme === 'dark' ? "Passer en mode clair" : "Passer en mode sombre"}
        >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
    );
};
