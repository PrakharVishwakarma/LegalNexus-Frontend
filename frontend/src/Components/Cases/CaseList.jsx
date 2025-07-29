// frontend/src/Components/Cases/CaseList.jsx

import PropTypes from "prop-types";
import { memo } from "react";

import { BsCalendar3Week } from "react-icons/bs"

import CaseCard from "./CaseCard";

const CaseList = memo(({ cases }) => {
    if (cases.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-full p-6 mb-6">
                    <BsCalendar3Week className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Cases Found</h3>
                <p className="text-gray-500 text-center max-w-md">
                    No legal cases match your current search criteria. Try adjusting your filters or create a new case.
                </p>
            </div>
        );
    }

    // const getStatusColor = (isClosed) => {
    //     return isClosed
    //         ? "bg-green-50 text-green-700 border-green-200"
    //         : "bg-blue-50 text-blue-700 border-blue-200";
    // };

    // const getStatusIcon = (isClosed) => {
    //     return isClosed
    //         ? <IoIosCheckmarkCircleOutline className="w-4 h-4" />
    //         : <FiAlertCircle className="w-4 h-4" />;
    // };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {cases.map((c) => (
                <div key={c._id}>
                    <CaseCard caseData = {c}/>
                </div>
            ))}
        </div>
    );
});

CaseList.displayName = "CaseList";

CaseList.propTypes = {
    cases: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            courtName: PropTypes.string,
            isClosed: PropTypes.bool,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CaseList;