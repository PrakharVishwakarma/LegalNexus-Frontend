// frontend/src/Components/CaseSetting/ParticipantCard.jsx

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import PropTypes from "prop-types";

const ParticipantCard = ({ participant, adminWallet, isAdmin, caseId, refetch }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const participantWallet = participant.wallet;

    return (
        <>
            <div className="border rounded p-3 flex items-center justify-between bg-indigo-50">
                <div>
                    <p className="font-semibold">{participant.name} ({participant.role})</p>
                    <p className="text-sm text-gray-500">Wallet: {participant.wallet.slice(0, 25)}...{participant.wallet.slice(-4)}</p>
                    <div className="w-full flex justify-between">
                        <p className="text-sm text-gray-500"> View Access : {participant.permissions.canView ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}</p>
                        <p className="text-sm text-gray-500"> Upload Access : {participant.permissions.canUpload ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}</p>
                    </div>
                </div>

                {isAdmin && (
                    (participantWallet === adminWallet) ? (
                        <p className="text-green-600 text-sm">Admin</p>
                    ) : (
                        <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => setShowConfirm(true)}
                        >
                            <FaTrash />
                        </button>

                    )
                )}
            </div>

            {showConfirm && (
                <ConfirmDeleteModal
                    participant={participant}
                    caseId={caseId}
                    onClose={() => setShowConfirm(false)}
                    onSuccess={() => {
                        setShowConfirm(false);
                        refetch();
                    }}
                />
            )}
        </>
    );
};

ParticipantCard.propTypes = {
    participant: PropTypes.object.isRequired,
    adminWallet: PropTypes.string.isRequired,
    caseId: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    refetch: PropTypes.func.isRequired,
};

export default ParticipantCard;
