import PropTypes from "prop-types";
import { HiUserAdd } from "react-icons/hi";

const SearchUserResultCard = ({ user, onSelect, isSelected }) => {
    const {
        userId,
        employeeId,
        phoneNumber,
        walletAddress,
        role,
        fullName
    } = user;

    const bgColor = isSelected ? "bg-blue-100 border-blue-500" : "bg-white";


    return (
        <div
            onClick={() => onSelect(user)}
            className={`flex items-center justify-between px-4 py-3 border rounded-md transition-all duration-150 hover:cursor-pointer ${bgColor}`}
        >
            <div className="flex flex-col gap-0.5 text-sm">
                <div className="flex gap-8 flex-wrap text-gray-600 text-xs">
                    <div className="w-32 flex justify-center items-center ">
                    <p className="text-sm font-semibold  text-gray-800 ">{fullName}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-4 flex-wrap text-gray-600 text-xs">
                            {userId ? <span>User ID: {userId}</span> : <span> Employee ID: {employeeId}</span>}
                            <span>Phone: {phoneNumber.slice(3, 7)}...{phoneNumber.slice(-2)}</span>
                        </div>
                        <div className="flex gap-12 flex-wrap text-gray-600 text-xs">

                            <span>Role: {role}</span>
                            <span>Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isSelected ? (
                <span className="text-blue-600 font-semibold text-sm">Selected</span>
            ) : (
                <HiUserAdd className="text-xl text-gray-400 hover:text-blue-600 transition" />
            )}
        </div>
    );
};

SearchUserResultCard.propTypes = {
    user: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string,
        employeeId: PropTypes.string,
        phoneNumber: PropTypes.string.isRequired,
        walletAddress: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
};

export default SearchUserResultCard;
