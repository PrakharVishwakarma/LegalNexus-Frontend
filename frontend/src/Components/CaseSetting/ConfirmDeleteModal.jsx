// frontend/src/Components/CaseSetting/ConfirmDeleteModal.jsx

import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { authTokenState } from "../../recoil/atoms/authAtom";
import { useRecoilValue } from "recoil";
import { useFlashMessage } from "../../Hooks/useFlashMessage";

const ConfirmDeleteModal = ({ participant, caseId, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const token = useRecoilValue(authTokenState);
    const { showFlash } = useFlashMessage();

    const handleRevoke = async () => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:3000/api/v1/cases/${caseId}/revoke-access/${participant.wallet}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            showFlash("success", "Access revoked successfully");
            onSuccess();
        } catch (err) {
            console.error("Revoke failed", err);
            showFlash("error", err?.response?.data?.message || "Revoke failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 mt-0" style={{margin: 0}}>
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
                <h3 className="text-lg font-bold mb-4">Confirm Access Revocation</h3>
                <p>Are you sure you want to revoke access from <strong>{participant.name}</strong>?</p>

                <div className="flex justify-end space-x-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleRevoke}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        {loading ? "Revoking..." : "Revoke"}
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmDeleteModal.propTypes = {
    participant: PropTypes.object.isRequired,
    caseId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
