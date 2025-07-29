// frontend/src/Components/CaseSetting/ParticipantPanel.jsx

import { useState } from "react";
import PropTypes from "prop-types";
import ParticipantList from "./ParticipantList";
import AddParticipantModal from "./AddParticipantModal";
import { useCaseAccess } from "../../context/useCaseAccess";

const ParticipantPanel = ({ participants, adminWallet, caseId, refetch }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { isUserCaseAdmin, caseAccessLoading } = useCaseAccess();

    // If access info is still loading, avoid premature render
    if (caseAccessLoading) {
        return (
            <div className="bg-slate-300 p-4 mt-6 rounded shadow text-gray-600 text-sm">
                Loading access permissions...
            </div>
        );
    }

    return (
        <div className="bg-slate-300 p-4 mt-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">👥 Case Participants</h2>

                {isUserCaseAdmin && (
                    <button
                        onClick={() => setModalOpen(true)}
                        className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        + Add Participant
                    </button>
                )}
            </div>

            <ParticipantList
                participants={participants}
                adminWallet={adminWallet}
                caseId={caseId}
                refetch={refetch}
            />

            <AddParticipantModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                caseId={caseId}
                refetch={refetch}
            />
        </div>
    );
};

ParticipantPanel.propTypes = {
    participants: PropTypes.array.isRequired,
    adminWallet: PropTypes.string.isRequired,
    caseId: PropTypes.string.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default ParticipantPanel;
