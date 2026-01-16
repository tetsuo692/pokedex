import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { FaHeart, FaHome } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
    const { t } = useTranslation('common');
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-30 transition-all border-b border-gray-100 dark:border-gray-700">
            <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 tracking-tight group-hover:scale-105 transition-transform">
                            {t('app_title')}
                        </h1>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 font-medium transition-colors ${isActive('/') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300'}`}
                        >
                            <FaHome /> <span>Home</span>
                        </Link>
                        <Link
                            to="/favorites"
                            className={`flex items-center gap-2 font-medium transition-colors ${isActive('/favorites') ? 'text-red-500 dark:text-red-400' : 'text-gray-600 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-300'}`}
                        >
                            <FaHeart /> <span>{t('favorites', 'Favorites')}</span>
                        </Link>

                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-600 mx-2 hidden sm:block"></div>
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
};
