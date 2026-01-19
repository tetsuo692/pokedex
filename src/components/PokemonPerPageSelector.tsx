import React from 'react';
import { useTranslation } from 'react-i18next';

interface PokemonPerPageSelectorProps {
    limit: number;
    onLimitChange: (limit: number) => void;
}

export const PokemonPerPageSelector: React.FC<PokemonPerPageSelectorProps> = ({ limit, onLimitChange }) => {
    const { t } = useTranslation('common');

    const options = Array.from({ length: 10 }, (_, i) => (i + 1) * 5); // 5, 10, ..., 50

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="per-page-selector" className="text-gray-600 dark:text-gray-300 font-medium text-sm whitespace-nowrap">
                {t('per_page', 'Per page:')}
            </label>
            <select
                id="per-page-selector"
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 dark:text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-gray-600 text-sm text-gray-700 cursor-pointer shadow-sm hover:shadow-md transition-all appearance-none pr-8"
                style={{
                    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right .5em top 50%',
                    backgroundSize: '.65em auto'
                }}
                aria-label={t('select_per_page', 'Select number of pokemon per page')}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
