// frontend/src/Pages/CaseSettings.jsx

import { useParams } from "react-router-dom";
import { useCaseDetails } from "../../Hooks/useCaseDetails";
import { useCaseAccess } from "../../context/useCaseAccess";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import { useEffect } from "react";

import CaseMetadataPanel from "./CaseMetadataPanel";
import ParticipantPanel from "./ParticipantPanel";
import MigrateAdminPanel from "./MigrateAdminPanel ";

const SettingsContent = () => {
    const { caseId } = useParams();

    const navigate = useNavigate();

    const { showFlash } = useFlashMessage();

    const { caseData, adminData, refetch, loading, error } = useCaseDetails(caseId);

    const { hasUserViewAccess, caseAccessLoading, isUserCaseAdmin } = useCaseAccess();


    useEffect(() => {
        if (!loading && !caseAccessLoading && !hasUserViewAccess) {
            navigate("/cases");
            showFlash("error", "You do not have access to view this case.");

        }
    }, [hasUserViewAccess, caseAccessLoading, loading]);

    if (loading) return (
        <div className="flex justify-center items-center h-40">
            <span className="text-gray-500">Loading case settings...</span>
        </div>
    );

    if (error) return (
        <div className="text-center text-red-600 font-semibold">
            Error loading case settings. Please try again.
        </div>
    );

    return (
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <CaseMetadataPanel caseData={caseData} adminData={adminData} refetch={refetch} />

            <ParticipantPanel
                participants={caseData.participants}
                adminWallet={caseData.admin}
                caseId={caseId}
                refetch={refetch}
            />
            {
                isUserCaseAdmin && <MigrateAdminPanel caseId={caseId} adminWallet={caseData.admin} />
            }

        </div>
    );
};

export default SettingsContent;
