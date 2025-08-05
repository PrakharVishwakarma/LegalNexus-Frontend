// frontend/src/Components/CaseSetting/AddParticipantModal.jsx

import { useState, useEffect } from "react";
import SearchUserResultCard from "./SearchUserResultCard";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "../../Hooks/useDebounce";
import PropTypes from "prop-types";
import { authTokenState } from "../../recoil/atoms/authAtom";
import { useRecoilValue } from "recoil";
import { useFlashMessage } from "../../Hooks/useFlashMessage";

const AddParticipantModal = ({ isOpen, onClose, caseId, refetch }) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [permissions, setPermissions] = useState({ canView: true, canUpload: false });
    const debouncedQuery = useDebounce(query, 250);
    const { showFlash } = useFlashMessage();
    const token = useRecoilValue(authTokenState);

    useEffect(() => {
        if (debouncedQuery.length >= 2) {
            setSelectedUser(null);
            setSearchResults([]);
            setPermissions({ canView: true, canUpload: false });
            axios.get(`http://localhost:3000/api/v1/user/search?q=${debouncedQuery}`
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((res) => {
                setSearchResults(res.data)
            }).catch((err) => console.log(err));
        } else {
            setSearchResults([]);
        }
    }, [debouncedQuery, token]);

    const grantAccessMutation = useMutation({
        mutationFn: async () => {
            const payload = {
                wallet: selectedUser.walletAddress,
                role: selectedUser.role,
                permissions,
            };
            const res = await axios.patch(`http://localhost:3000/api/v1/cases/${caseId}/grant-access`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data;
        },
        onSuccess: () => {
            refetch();
            handleClose();
            showFlash("success", "✅ Participant added successfully");
        },
        onError: (err) => {
            showFlash("error", err?.response?.data?.message || "❌ Failed to add participant");
        },
    });

    const handleSubmit = () => {
        if (!selectedUser) return showFlash("warning", "⚠️ Please select a user");
        grantAccessMutation.mutate();
    };

    const handleClose = () => {
        setQuery("");
        setSelectedUser(null);
        setSearchResults([]);
        setPermissions({ canView: true, canUpload: false });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md p-6 w-full max-w-2xl shadow-lg relative min-h-80 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Add Participant</h2>

                    <input
                        type="text"
                        placeholder="Search by Wallet / User ID / Phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring"
                    />

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {searchResults.map((user) => (
                            <SearchUserResultCard
                                key={user._id}
                                user={user}
                                isSelected={selectedUser?.walletAddress === user.walletAddress}
                                onSelect={() =>{
                                    if(selectedUser){
                                        setSelectedUser(null);
                                    }else {
                                        setSelectedUser(user);
                                    }
                                } }
                            />
                        ))}
                    </div>

                    {selectedUser && (
                        <div className="mt-4">
                            <p className="font-semibold">Permissions:</p>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={permissions.canView}
                                        onChange={(e) =>
                                            setPermissions((p) => ({ ...p, canView: e.target.checked }))
                                        }
                                    />
                                    View
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={permissions.canUpload}
                                        onChange={(e) =>
                                            setPermissions((p) => ({ ...p, canUpload: e.target.checked }))
                                        }
                                    />
                                    Upload
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-center gap-3">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!selectedUser || grantAccessMutation.isPending}
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {grantAccessMutation.isLoading ? "Adding..." : "Done"}
                    </button>
                </div>
            </div>
        </div>
    );
};

AddParticipantModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    caseId: PropTypes.string.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default AddParticipantModal;
