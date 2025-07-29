// frontend/src/Components/CaseDocSetting/CaseDocSettings.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authAtom";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DocumentMetaDataCard from "./DocumentMetaDataCard";
import AccessControlPanel from "./AccessControlPanel";
import { useState } from "react";
import DeleteDocModal from "./DeleteDocModal";

const fetchDocumentDetails = async ({ queryKey }) => {
    const [_key, caseId, docId, token] = queryKey;
    const response = await axios.get(
        `http://localhost:3000/api/v1/case-doc/${caseId}/view/${docId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

const CaseDocSettings = () => {
    const { caseId, docId } = useParams();
    const token = useRecoilValue(authTokenState);
    const { showFlash } = useFlashMessage();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["doc-details", caseId, docId, token],
        queryFn: fetchDocumentDetails,
        retry: false,
        throwOnError: (error) => {
            console.log("Error : ", error);
            showFlash("Failed to fetch document details", "error");
            navigate(`/cases/${caseId}`);
            return false;
        },
        select: (data) => {
            if (!data.meta?.hasUserViewAccess) {
                showFlash("You do not have access to view this document", "error");
                navigate(`/cases/${caseId}`);
            }
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="text-center py-16 text-gray-500 text-lg">
                Loading document settings...
            </div>
        );
    }

    if (isError || !data?.sanitizedDocument || !data?.meta) return null;

    const { sanitizedDocument, meta } = data;

    const canDelete =
        meta.isAdmin || meta.isUploader || meta.hasUserDeleteAccess;

    return (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Document Settings
            </h1>

            {/* 🧾 Document Metadata */}
            <DocumentMetaDataCard document={sanitizedDocument} />

            {/* 🔐 Access Control */}
            <AccessControlPanel
                caseId={caseId}
                docId={docId}
                currentUserPermissions={meta}
            />

            {/* 🗑️ Danger Zone */}
            {canDelete && (
                <div className="border border-red-400 rounded-lg p-6 bg-red-50">
                    <h2 className="text-xl font-semibold text-red-700 mb-3">
                        Danger Zone
                    </h2>
                    <p className="text-sm text-red-600 mb-4">
                        Deleting this document will permanently remove it from the case for all participants. This action is irreversible.
                    </p>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow-sm"
                    >
                        Delete Document
                    </button>
                </div>
            )}

            {showDeleteModal && (
                <DeleteDocModal
                    docId={docId}
                    caseId={caseId}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default CaseDocSettings;
