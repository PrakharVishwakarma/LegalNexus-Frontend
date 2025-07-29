// frontend/src/Components/CaseSetting/ParticipantList.jsx

import ParticipantCard from "./ParticipantCard.jsx";
import PropTypes from "prop-types";
import { useCaseAccess } from "../../context/useCaseAccess.js";

const ParticipantList = ({ participants, adminWallet, caseId, refetch }) => {
    const { isUserCaseAdmin, caseAccessLoading  } = useCaseAccess();

    if (caseAccessLoading ) {
        return <p className="text-gray-500">Loading access...</p>; // You can show spinner here too
    }


    return (
        <div className="space-y-3">
            {participants.map((p) => (
                <ParticipantCard
                    key={p.wallet}
                    participant={p}
                    adminWallet={adminWallet}
                    isAdmin={isUserCaseAdmin}
                    caseId={caseId}
                    refetch={refetch}
                />
            ))}
        </div>
    );
};

ParticipantList.propTypes = {
    participants: PropTypes.array.isRequired,
    adminWallet: PropTypes.string.isRequired,
    caseId: PropTypes.string.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default ParticipantList;
