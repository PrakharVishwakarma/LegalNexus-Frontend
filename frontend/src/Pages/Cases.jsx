// frontend/src/Pages/Cases.jsx

import { useState } from "react";
import { useCases } from "../Hooks/useCases";
import CaseList from "../Components/Cases/CaseList";
import CaseFilters from "../Components/Cases/CaseFilters";
import CaseSort from "../Components/Cases/CaseSort";
import CasePagination from "../Components/Cases/CasePagination";
import NewCase from "../Components/Cases/NewCase"; 

const Cases = () => {
    const [filters, setFilters] = useState({
        isClosed: undefined,
        filterAdmin: undefined,
        filterParticipant: undefined,
        sortBy: "createdAt",
        sortOrder: "desc",
    });

    const [isModalOpen, setIsModalOpen] = useState(false); 

    const {
        cases,
        totalPages,
        currentPage,
        setCurrentPage,
        loading,
        error
    } = useCases(filters);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f2709c] text-white">
                <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Legal Case Management
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                            Efficiently manage and track your legal cases with our comprehensive case management system
                        </p>
                    </div>
                    {/* ✅ Create Case Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold shadow-md hover:bg-indigo-100 transition-all duration-200"
                    >
                        + Create Case
                    </button>
                </div>
            </div>

            {/* ✅ New Case Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                        <NewCase onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8 flex flex-col">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 mb-2 backdrop-blur-sm w-11/12 mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                                Filters
                            </h2>
                            <CaseFilters filters={filters} setFilters={setFilters} />
                        </div>
                        <div className="lg:w-80">
                            <CaseSort filters={filters} setFilters={setFilters} />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-indigo-400"></div>
                        </div>
                        <p className="text-lg text-gray-600 mt-6 font-medium">Loading your cases...</p>
                        <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your data</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Cases</h3>
                        <p className="text-red-600">There was an issue retrieving your cases. Please try again.</p>
                    </div>
                ) : (
                    <>
                        <CaseList cases={cases} />
                        {totalPages > 1 && (
                            <div className="mt-12">
                                <CasePagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    setCurrentPage={setCurrentPage}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Cases;
