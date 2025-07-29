// src/Components/Case/ViewDocumentModal.jsx

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authAtom";
import { FaDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";


const fetchDocumentDetails = async ({ queryKey }) => {
    const [, caseId, docId, authToken] = queryKey;

    if (!authToken) throw new Error("Unauthorized");

    const response = await axios.get(
        `http://localhost:3000/api/v1/case-doc/${caseId}/view/${docId}`,
        {
            headers: { Authorization: `Bearer ${authToken}` },
        }
    );

    return response.data.sanitizedDocument;
};

const ViewDocumentModal = ({ docId, onClose }) => {
    const authToken = useRecoilValue(authTokenState);
    const [mounted, setMounted] = useState(false);
    const { caseId } = useParams();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleEscape = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    const {
        data: fileDoc,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["view-doc", caseId, docId, authToken],
        queryFn: fetchDocumentDetails,
        enabled: !!docId && !!authToken,
    });

    const renderFilePreview = () => {
        if (isLoading)
            return <p className="text-center text-gray-600">Loading document...</p>;

        if (isError)
            return (
                <p className="text-red-500 text-center">
                    Error:{" "}
                    {error?.response?.data?.message || "Failed to load document."}
                </p>
            );

        const { fileType, ipfsCid, title } = fileDoc;
        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsCid}`;

        return (
            <>
                {/* ✅ Download Button */}
                <div className="flex justify-center mb-4">
                    <a
                        href={ipfsUrl}
                        download={title}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 hover:text-teal-100 text-white px-4 py-2 rounded shadow text-sm font-medium flex items-center gap-2"
                    >
                        <FaDownload size={24} />
                        Download
                    </a>
                </div>

                {/* 📁 File Preview */}
                {fileType.startsWith("image") && (
                    <img
                        src={ipfsUrl}
                        alt={title}
                        className="max-w-full max-h-[80vh] rounded shadow-md mx-auto"
                    />
                )}

                {fileType === "video/mp4" && (
                    <video
                        src={ipfsUrl}
                        controls
                        className="max-w-full max-h-[80vh] rounded shadow-md mx-auto"
                    />
                )}

                {fileType === "application/pdf" && (
                    <iframe
                        src={ipfsUrl}
                        title={title}
                        className="w-full h-[80vh] rounded-md border shadow"
                    />
                )}

                {fileType === "video/mpeg" && (
                    <audio
                        src={ipfsUrl}
                        controls
                        className="w-full h-[80vh] rounded-md border shadow"
                    />
                )}

                {!["image", "video", "application/pdf", "video/mpeg"].some((type) =>
                    fileType.startsWith(type)
                ) && (
                        <p className="text-center text-gray-500">
                            Unsupported file type: <code>{fileType}</code>
                        </p>
                    )}
            </>
        );
    };

    if (!mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl relative overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-2xl text-gray-700 hover:text-black font-bold"
                    aria-label="Close Modal"
                >
                    ×
                </button>
                {renderFilePreview()}
            </div>
        </div>,
        document.body
    );
};

ViewDocumentModal.propTypes = {
    docId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ViewDocumentModal;
