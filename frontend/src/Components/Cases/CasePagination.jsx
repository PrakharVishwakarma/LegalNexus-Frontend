// frontend/src/Components/Cases/CasePagination.jsx

import PropTypes from "prop-types";
import { FaAngleLeft, FaChevronRight } from "react-icons/fa";
import { TfiMoreAlt } from "react-icons/tfi";

const CasePagination = ({ currentPage, totalPages, setCurrentPage }) => {
    // Generate page numbers to show
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift("...");
        }
        if (currentPage + delta < totalPages - 1) {
            range.push("...");
        }

        range.unshift(1);
        if (totalPages !== 1) {
            range.push(totalPages);
        }

        return range;
    };

    const handlePageClick = (page) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
        }
    };

    if (totalPages <= 1) return null;

    const visiblePages = getVisiblePages();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            {/* Results info */}
            <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">
                    Page {currentPage} of {totalPages}
                </span>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-1">
                {/* Previous button */}
                <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100"
                        }`}
                >
                    <FaAngleLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1 mx-2">
                    {visiblePages.map((page, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(page)}
                            disabled={page === "..."}
                            className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${page === currentPage
                                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                                    : page === "..."
                                        ? "text-gray-400 cursor-default"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100"
                                }`}
                        >
                            {page === "..." ? <TfiMoreAlt className="w-4 h-4" /> : page}
                        </button>
                    ))}
                </div>

                {/* Next button */}
                <button
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100"
                        }`}
                >
                    <span className="hidden sm:inline">Next</span>
                    <FaChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Quick jump (optional enhancement) */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
                <span>Go to page:</span>
                <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                        const page = parseInt(e.target.value);
                        if (page >= 1 && page <= totalPages) {
                            setCurrentPage(page);
                        }
                    }}
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        </div>
    );
};

CasePagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
};

export default CasePagination;
