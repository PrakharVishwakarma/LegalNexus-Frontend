// frontend/src/Components/Cases/CaseFilters.jsx

import PropTypes from "prop-types";
import { memo } from "react";

const CaseFilters = memo(({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.checked ? "true" : undefined,
        });
    };

    const filterOptions = [
        {
            name: "isClosed",
            label: "Show Closed Cases",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
            ),
            color: "red"
        },
        {
            name: "filterAdmin",
            label: "Admin Cases",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 1118 8zm-1.5 0a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"/>
                </svg>
            ),
            color: "blue"
        },
        {
            name: "filterParticipant",
            label: "Participant Cases",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
            ),
            color: "green"
        }
    ];

    const getColorClasses = (color, isChecked) => {
        const colors = {
            red: {
                bg: isChecked ? "bg-red-500" : "bg-gray-200",
                border: isChecked ? "border-red-500" : "border-gray-300",
                text: isChecked ? "text-red-700" : "text-gray-600",
                icon: isChecked ? "text-red-500" : "text-gray-400",
                bgHover: "hover:bg-red-50",
                borderHover: "hover:border-red-300"
            },
            blue: {
                bg: isChecked ? "bg-blue-500" : "bg-gray-200",
                border: isChecked ? "border-blue-500" : "border-gray-300",
                text: isChecked ? "text-blue-700" : "text-gray-600",
                icon: isChecked ? "text-blue-500" : "text-gray-400",
                bgHover: "hover:bg-blue-50",
                borderHover: "hover:border-blue-300"
            },
            green: {
                bg: isChecked ? "bg-green-500" : "bg-gray-200",
                border: isChecked ? "border-green-500" : "border-gray-300",
                text: isChecked ? "text-green-700" : "text-gray-600",
                icon: isChecked ? "text-green-500" : "text-gray-400",
                bgHover: "hover:bg-green-50",
                borderHover: "hover:border-green-300"
            }
        };
        return colors[color];
    };

    return (
        <div className="flex flex-wrap gap-4">
            {filterOptions.map((option) => {
                const isChecked = filters[option.name] === "true";
                const colorClasses = getColorClasses(option.color, isChecked);
                
                return (
                    <label
                        key={option.name}
                        className={`
                            relative flex items-center gap-3 px-2 py-2 rounded-xl border-2 cursor-pointer
                            transition-all duration-300 ease-in-out transform hover:scale-105
                            ${colorClasses.border} ${colorClasses.bgHover} ${colorClasses.borderHover}
                            ${isChecked ? 'shadow-lg ring-2 ring-offset-2 ring-' + option.color + '-200' : 'hover:shadow-md'}
                            group select-none
                        `}
                    >
                        {/* Custom Checkbox */}
                        <div className="relative">
                            <input
                                type="checkbox"
                                name={option.name}
                                checked={isChecked}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <div
                                className={`
                                    w-5 h-5 rounded-md border-2 flex items-center justify-center
                                    transition-all duration-200 ease-in-out
                                    ${colorClasses.bg} ${colorClasses.border}
                                `}
                            >
                                {isChecked && (
                                    <svg
                                        className="w-3 h-3 text-white animate-in zoom-in duration-200"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>

                        {/* Icon */}
                        <div className={`${colorClasses.icon} transition-colors duration-200`}>
                            {option.icon}
                        </div>

                        {/* Label */}
                        <span
                            className={`
                                font-medium text-sm transition-colors duration-200
                                ${colorClasses.text}
                            `}
                        >
                            {option.label}
                        </span>

                        {/* Ripple effect */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-black/5 transition-opacity duration-150"></div>
                    </label>
                );
            })}
        </div>
    );
});

CaseFilters.displayName = "CaseFilters";

CaseFilters.propTypes = {
    filters: PropTypes.shape({
        isClosed: PropTypes.string,
        filterAdmin: PropTypes.string,
        filterParticipant: PropTypes.string,
        sortBy: PropTypes.string,
        sortOrder: PropTypes.string,
    }).isRequired,
    setFilters: PropTypes.func.isRequired,
};

export default CaseFilters;