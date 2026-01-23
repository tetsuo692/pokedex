import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-4 mt-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <p>© {new Date().getFullYear()} Pokedex App</p>
                <div className="flex items-center gap-2">
                    <span>v{__APP_VERSION__}</span>
                </div>
            </div>
        </footer>
    );
};
