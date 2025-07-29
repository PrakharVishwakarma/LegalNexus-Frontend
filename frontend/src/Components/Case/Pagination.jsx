// src/Components/Case/Pagination.jsx

import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";

const Pagination = ({ totalPages, currentPage }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Safely parse currentPage
    const pageNum = useMemo(() => {
        const parsed = parseInt(currentPage, 10);
        return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    }, [currentPage]);

    // Safe setter for "page"
    const goToPage = useCallback(
        (page) => {
            const currentParams = Object.fromEntries(searchParams.entries());
            setSearchParams({
                ...currentParams,
                page: page.toString(),
            });
        },
        [searchParams, setSearchParams]
    );

    // Setter for limit (also resets page to 1)
    const changeLimit = useCallback(
        (limit) => {
            const currentParams = Object.fromEntries(searchParams.entries());
            setSearchParams({
                ...currentParams,
                page: "1",
                limit: limit.toString(),
            });
        },
        [searchParams, setSearchParams]
    );

    // Generate array of page numbers
    const pages = useMemo(() => {
        if (totalPages === 0) return [1];
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalPages]);

    const currentLimit = searchParams.get("limit") || "12";

    return (
        <div className="flex flex-col sm:flex-row justify-evenly items-center gap-6 py-10 px-4 border-t mt-10 bg-gray-50 bg-opacity-40">
            {/* Pagination Buttons */}
            <div className="flex flex-wrap items-center gap-2">
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    onClick={() => goToPage(pageNum - 1)}
                    disabled={pageNum <= 1}
                >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Prev
                    </span>
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 border rounded transition ${page === pageNum ? "bg-blue-500 text-white font-semibold" : "hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    onClick={() => goToPage(pageNum + 1)}
                    disabled={pageNum >= totalPages}
                >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Next
                    </span>
                </button>
            </div>

            {/* Items Per Page */}
            <div className="flex items-center gap-2">
                <label htmlFor="limit" className="text-sm font-medium text-gray-700">
                    Items per page:
                </label>
                <select
                    id="limit"
                    value={currentLimit}
                    onChange={(e) => changeLimit(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                    <option value={96}>96</option>
                </select>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Pagination;
