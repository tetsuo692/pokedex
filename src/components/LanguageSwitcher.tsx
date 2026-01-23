import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors">
            <FaGlobe className="text-gray-500 dark:text-gray-400" />
            <select
                value={i18n.language}
                onChange={changeLanguage}
                className="bg-transparent border-none outline-hidden text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer appearance-none pr-1"
                aria-label="Select Language"
            >
                <option value="en" className="text-gray-800">English</option>
                <option value="fr" className="text-gray-800">Français</option>
            </select>
        </div>
    );
};
