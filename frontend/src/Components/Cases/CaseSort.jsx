// frontend/src/Components/Cases/CaseSort.jsx

import PropTypes from "prop-types";

const CaseSort = ({ filters, setFilters }) => {
    const handleSortChange = (e) => {
        const [sortBy, sortOrder] = e.target.value.split("_");
        setFilters({
            ...filters,
            sortBy,
            sortOrder,
        });
    };

    const sortOptions = [
        { value: "createdAt_desc", label: "Newest First", icon: "📅" },
        { value: "createdAt_asc", label: "Oldest First", icon: "📆" },
        { value: "title_asc", label: "Title A-Z", icon: "🔤" },
        { value: "title_desc", label: "Title Z-A", icon: "🔠" }
    ];

    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 000 2h4.586l-1.293 1.293a1 1 0 101.414 1.414L10 6.414l2.293 2.293a1 1 0 001.414-1.414L12.414 6H17a1 1 0 100-2H3z" />
                    <path d="M3 8a1 1 0 000 2h4.586l-1.293 1.293a1 1 0 101.414 1.414L10 10.414l2.293 2.293a1 1 0 001.414-1.414L12.414 10H17a1 1 0 100-2H3z" />
                    <path d="M3 12a1 1 0 100 2h4.586l-1.293 1.293a1 1 0 101.414 1.414L10 14.414l2.293 2.293a1 1 0 001.414-1.414L12.414 14H17a1 1 0 100-2H3z" />
                </svg>
                Sort By
            </label>

            <div className="relative">
                <select
                    className="
                        w-full appearance-none bg-white border-2 border-gray-200 rounded-xl
                        px-4 py-3 pr-10 text-sm font-medium text-gray-700
                        focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500
                        hover:border-gray-300 transition-all duration-200
                        cursor-pointer shadow-sm hover:shadow-md
                    "
                    value={`${filters.sortBy}_${filters.sortOrder}`}
                    onChange={handleSortChange}
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.icon} {option.label}
                        </option>
                    ))}
                </select>

                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-400 transition-transform duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-transparent to-gray-50/30 pointer-events-none"></div>
            </div>

            {/* Sort indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <span>Sorted by {sortOptions.find(opt => opt.value === `${filters.sortBy}_${filters.sortOrder}`)?.label}</span>
            </div>
        </div>
    );
};

CaseSort.propTypes = {
    filters: PropTypes.shape({
        sortBy: PropTypes.string.isRequired,
        sortOrder: PropTypes.string.isRequired,
    }).isRequired,
    setFilters: PropTypes.func.isRequired,
};

export default CaseSort;