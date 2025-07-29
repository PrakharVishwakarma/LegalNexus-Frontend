import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authAtom";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";

const DeleteDocModal = ({ docId, caseId, onClose }) => {
    const token = useRecoilValue(authTokenState);
    const { showFlash } = useFlashMessage();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/case-doc/${docId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                queryClient.invalidateQueries({
                    queryKey: ["case-documents", caseId],
                });
                showFlash("Document deleted successfully", "success");
                navigate(`/cases/${caseId}`);
            }
            onClose();
        } catch (err) {
            console.error("Delete Error:", err);
            showFlash("Failed to delete document", "error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Confirm Deletion
                </h2>
                <p className="text-sm text-gray-600">
                    Are you sure you want to permanently delete this document? This action cannot be undone.
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteDocModal.propTypes = {
    docId: PropTypes.string.isRequired,
    caseId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DeleteDocModal;
