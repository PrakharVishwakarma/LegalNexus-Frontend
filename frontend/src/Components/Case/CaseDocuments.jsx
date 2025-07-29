// frontend/src/Components/Case/CaseDocuments.jsx

import { useSearchParams, useParams } from "react-router-dom";
import { useMemo } from "react";

import useCaseDocuments from "../../Hooks/useCaseDocuments";

import Pagination from "./Pagination";
import CaseDocumentGrid from "./CaseDocumentGrid";
import SearchByTitle from "./SearchByTitle";
import Filter from "./Filter";
import Sorting from "./Sorting";

const CaseDocuments = () => {
    const { caseId } = useParams();
    const [searchParams] = useSearchParams();

    const queryParams = useMemo(() => ({
        page: parseInt(searchParams.get("page")) || 1,
        limit: parseInt(searchParams.get("limit")) || 12,
        search: searchParams.get("search") || "",
        sortBy: searchParams.get("sortBy") || "newest",
        filterType: searchParams.get("filterType") || "all",
        accessFilter: searchParams.get("accessFilter") || "all",
    }), [searchParams]);

    const { data, isLoading, isError, error } = useCaseDocuments(caseId, queryParams);

    const documents = data?.documents || [];
    const pagination = data?.pagination;

    return (
        <div className="mt-10 space-y-6 bg-gradient-to-t from-[#6375a7] to-[#d0e3e9] rounded-3xl shadow-lg p-8 w-full mx-auto border border-gray-100 relative overflow-hidden">

            <div className="flex flex-wrap gap-4 justify-between items-center border border-gray-200 p-4 rounded-xl shadow bg-slate-800 bg-opacity-20">
                <SearchByTitle />
                <Filter />
                <Sorting />
            </div>

            {isLoading && (
                <div className="text-center text-gray-500 py-6">Loading documents...</div>
            )}

            {isError && (
                <div className="text-center text-red-600 py-6">
                    Error fetching documents: {error?.message}
                </div>
            )}

            {!isLoading && !isError && documents.length === 0 && (
                <div className="text-center text-gray-500 py-6">No documents found.</div>
            )}

            {!isLoading && !isError && documents.length > 0 && (
                <>
                    <CaseDocumentGrid
                        documents={documents}
                        currentPage={pagination.currentPage}
                        limit={pagination.limit}
                    />
                    {pagination.totalPages > 0 && (
                        <Pagination
                            totalPages={pagination.totalPages}
                            currentPage={pagination.currentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default CaseDocuments;
