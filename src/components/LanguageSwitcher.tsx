import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${i18n.language.startsWith('en') ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('fr')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${i18n.language.startsWith('fr') ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                FR
            </button>
        </div>
    );
};
