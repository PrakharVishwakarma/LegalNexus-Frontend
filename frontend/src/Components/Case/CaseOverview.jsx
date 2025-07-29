// frontend/src/Components/Case/CaseOverview.jsx

import PropTypes from "prop-types";
import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCaseAccess } from "../../context/useCaseAccess";
import {
    BsCheckCircle,
    BsXCircle,
    BsBuilding,
    BsCalendarDate,
} from "react-icons/bs";
import { FaGavel } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdSettingsSuggest } from "react-icons/md";

const CaseOverview = memo(({ caseData }) => {
    const { title, description, courtName, createdAt, isClosed, admin } =
        caseData;

    const { caseId } = useParams();
    const navigate = useNavigate();

    const { isUserCaseAdmin } = useCaseAccess();

    return (
        <div className="bg-gradient-to-br from-[#eee1d6] via-gray-100 to-[#eee1d6] rounded-3xl shadow-lg p-8 w-full mx-auto border border-gray-100 relative overflow-hidden">
            {/* Gradient ring */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-tr from-blue-200 to-purple-400 rounded-full opacity-15 pointer-events-none"></div>

            {/* Top Bar */}
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                    <FaGavel className="text-indigo-600" />
                    {title}
                </h1>

                <MdSettingsSuggest
                    title="Case Settings"
                    onClick={() => navigate(`/cases/${caseId}/settings`)}
                    className="text-indigo-600 hover:text-indigo-800 hover:scale-110 w-7 h-7 cursor-pointer transition-all duration-200 hover:shadow-lg"
                />
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3">
                <BsBuilding className="text-indigo-500" />
                <p>
                    <span className="font-semibold">Court:</span>{" "}
                    {courtName || (
                        <span className="italic text-gray-400">Not specified</span>
                    )}
                </p>
            </div>

            <div className="flex justify-between gap-3 py-4">
                <div className="flex items-center gap-3">
                    {isClosed ? (
                        <BsXCircle className="text-red-600" />
                    ) : (
                        <BsCheckCircle className="text-green-600" />
                    )}
                    <p className="font-semibold">Status:</p>{" "}
                    <p className={isClosed ? "text-red-600" : "text-green-600"}>
                        {isClosed ? "Closed" : "Active"}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <BsCalendarDate className="text-indigo-500" />
                    <p>
                        <span className="font-semibold">Created:</span>{" "}
                        {new Date(createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center gap-3 w-full">
                <div className="flex items-center gap-3">
                    <FiUser className="text-indigo-500" />
                    <p>
                        <span className="font-semibold">Admin:</span>{" "}
                        <span className="font-mono text-sm text-gray-600">{admin.slice(0, 20)}...{admin.slice(-6)}</span>
                    </p>
                </div>

                <div>
                    {isUserCaseAdmin ? (
                        <p className="text-green-600 text-sm animate-pulse">
                            You are Admin of this case
                        </p>
                    ) : (
                        <p className="text-blue-600 text-sm animate-pulse">
                            You are a Participant in this case
                        </p>
                    )}
                </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-6" />

            {/* Description */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Case Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    {description || (
                        <span className="italic text-gray-400">
                            No description provided for this case.
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
});

CaseOverview.propTypes = {
    caseData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        courtName: PropTypes.string,
        isClosed: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
        admin: PropTypes.string.isRequired,
    }).isRequired,
};

CaseOverview.displayName = "CaseOverview";

export default CaseOverview;
