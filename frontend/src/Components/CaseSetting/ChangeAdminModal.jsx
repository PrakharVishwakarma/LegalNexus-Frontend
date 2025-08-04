import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDebounce } from "../../Hooks/useDebounce";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authAtom";
import useChangeCaseAdmin from "../../Hooks/useChangeCaseAdmin";
import { useNavigate } from "react-router-dom";

const ChangeAdminModal = ({ isOpen, onClose, caseId, currentAdminWallet }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const debouncedQuery = useDebounce(query, 500);
    const token = useRecoilValue(authTokenState);

    const resetState = () => {
        setQuery("");
        setResults([]);
        setSelectedUser(null);
    };

    const { mutate: changeAdmin, isPending } = useChangeCaseAdmin({
        caseId,
        onSuccess: () => {
            resetState();
            onClose();
            navigate("/cases");
        },
    });

    useEffect(() => {
        if (!isOpen) {
            resetState();
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery || debouncedQuery.length < 3) {
                setResults([]);
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:3000/api/v1/user/${caseId}/search`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { query: debouncedQuery },
                    }
                );

                const filtered = res.data.users.filter(
                    (user) => user.role !== "Civilian"
                );

                setResults(filtered);
            } catch (err) {
                console.error("Error searching users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery, caseId, currentAdminWallet, token]);

    const handleSubmit = () => {
        if (selectedUser) {
            changeAdmin({ newAdminWallet: selectedUser.walletAddress, roleOfNewAdmin: selectedUser.role });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Migrate Admin Access
                </h2>

                <input
                    type="text"
                    placeholder="Search by Wallet, Phone, or Employee ID"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedUser(null);
                    }}
                />

                {loading && (
                    <p className="text-gray-500 text-sm mb-2">Searching participants...</p>
                )}

                <div className="max-h-40 overflow-y-auto space-y-2 mb-4">
                    {results.map((user) => {
                        const isSelected = selectedUser?.walletAddress === user.walletAddress;
                        return (
                            <div
                                key={user.walletAddress}
                                onClick={() => {
                                    if (selectedUser) setSelectedUser(null);
                                    else setSelectedUser(user);
                                }}
                                className={`cursor-pointer px-4 py-3 rounded border transition
                  ${isSelected
                                        ? "bg-yellow-100 border-yellow-500"
                                        : "bg-gray-50 hover:bg-gray-100 border-gray-300"}
                `}
                            >
                                <div className="text-sm font-semibold text-gray-800">
                                    {user.firstName} {user.lastName}
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <div className="text-xs text-gray-500 italic">{user.employeeId}</div>
                                    <div className="text-xs text-gray-600">{user.phoneNumber}</div>
                                </div>
                                <div className="text-xs text-gray-400 truncate">{user.walletAddress}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => {
                            resetState();
                            onClose();
                        }}
                        disabled={isPending}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedUser || isPending}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                        {isPending ? "Migrating..." : "Confirm & Migrate"}
                    </button>
                </div>
            </div>
        </div>
    );
};

ChangeAdminModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    caseId: PropTypes.string.isRequired,
    currentAdminWallet: PropTypes.string.isRequired,
};

export default ChangeAdminModal;
