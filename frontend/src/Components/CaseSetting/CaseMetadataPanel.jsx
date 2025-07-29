// frontend/src/Components/CaseSetting/CaseMetadataPanel.jsx

import { useState } from "react";
import { useCaseAccess } from "../../context/useCaseAccess";
import EditMetadataModal from "./EditMetadataModal";
import PropTypes from "prop-types";
import { MdEdit } from "react-icons/md"; // Optional: nice icon

const CaseMetadataPanel = ({ caseData, adminData, refetch }) => {
  const { isUserCaseAdmin } = useCaseAccess();
  const [isEditOpen, setEditOpen] = useState(false);

  if (!caseData) return null;

  const { title, description, courtName, createdAt, isClosed } = caseData;

  if (!adminData) return null;

  const { firstName, lastName, role } = adminData;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">⚙️ Case Metadata</h2>

      <div className="space-y-2 text-gray-700 dark:text-gray-200">
        <p><strong>Title:</strong> {title || "N/A"}</p>
        <p><strong>Description:</strong> {description || "N/A"}</p>
        <p><strong>Court Name:</strong> {courtName || "N/A"}</p>
        <p><strong>CreatedAt At:</strong> {createdAt.split("T")[0].split("-").reverse().join("/")}</p>
        <div className=""><strong>Status:</strong> {isClosed ? <p className="text-red-600 inline">Closed</p> : <p className="text-green-600 inline">Active</p>}</div>
        <p><strong>Admin:</strong> {firstName} {lastName} ({role})</p>
      </div>

      {isUserCaseAdmin && (
        <button
          onClick={() => setEditOpen(true)}
          disabled={isEditOpen}
          className="mt-4 px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdEdit className="text-lg" />
          Edit Metadata
        </button>
      )}

      <EditMetadataModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        initialData={{ title, description, courtName }}
        caseId={caseData._id}
        onSuccess={() => {
          refetch();
          setEditOpen(false);
        }}
      />
    </div>
  );
};

CaseMetadataPanel.propTypes = {
  caseData: PropTypes.object.isRequired,
  adminData: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CaseMetadataPanel;
