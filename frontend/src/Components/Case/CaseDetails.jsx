// frontend/src/Components/Case/CaseDetails.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaFileUpload } from "react-icons/fa";

import CaseOverview from "./CaseOverview";
import UploadDocumentModal from "./UploadDocument";
import CaseDocuments from "./CaseDocuments";

import { useCaseAccess } from "../../context/useCaseAccess";
import { useCaseDetails } from "../../Hooks/useCaseDetails";
import { useFlashMessage } from "../../Hooks/useFlashMessage";


const CaseDetails = () => {
  const navigate = useNavigate();
  const { showFlash } = useFlashMessage();
  const { caseId } = useParams();
  const { caseData, loading, error } = useCaseDetails(caseId);
  const [showUpload, setShowUpload] = useState(false);
  const { isUserCaseAdmin, hasUserViewAccess, hasUserUploadAccess, caseAccessLoading } = useCaseAccess();

  const canUpload = isUserCaseAdmin || hasUserUploadAccess;

  useEffect(() => {
    if (!loading && !caseAccessLoading && !hasUserViewAccess) {
      navigate("/cases");
      showFlash("error", "You do not have access to view this case.");

    }
  }, [hasUserViewAccess, caseAccessLoading, navigate, loading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-indigo-200 rounded-full border-t-indigo-600 animate-spin" />
        <p className="text-gray-600 mt-4 font-medium">Loading case details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center bg-red-50 p-6 border border-red-200 rounded-xl">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Access Denied</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <CaseOverview caseData={caseData} />

      {/* Upload Button */}
      {canUpload && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowUpload(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all hover:bg-gradient-to-b hover:from-indigo-600 hover:to-purple-600 hover:via-indigo-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-300"
          >
            <div className="flex items-center gap-2">
              <FaFileUpload size={20}></FaFileUpload>
              <p>Upload Document</p>
            </div>
          </button>
        </div>
      )}

      {/* Upload Modal */}
      <UploadDocumentModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        caseId={caseId}
      />

      {/* 📄 Future: Documents list will be shown here */}
      <CaseDocuments />
    </div>
  );
};

export default CaseDetails;
