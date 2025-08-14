// frontend/src/Components/CaseDocSetting/CaseDocSettings.jsx

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authAtom";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import { useDebounce } from "../../Hooks/useDebounce";
import { useParams } from "react-router-dom";

const GrantAccessModal = ({ onClose }) => {
    const { caseId, docId } = useParams();
    const token = useRecoilValue(authTokenState);
    const { showFlash } = useFlashMessage();
    const queryClient = useQueryClient();

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [canView, setCanView] = useState(true);
    const [canDelete, setCanDelete] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const resetModal = () => {
        setSearchTerm("");
        setSearchResults([]);
        setSelectedUser(null);
        setCanView(true);
        setCanDelete(false);
    };

    useEffect(() => {
        const searchUsers = async () => {
            if (!debouncedSearchTerm.trim()) {
                setSearchResults([]);
                return;
            }
            try {
                setIsSearching(true);
                const res = await axios.get(
                    `http://localhost:3000/api/v1/user/${caseId}/${docId}/search?query=${debouncedSearchTerm}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setSearchResults(res.data || []);
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setIsSearching(false);
            }
        };

        searchUsers();
    }, [debouncedSearchTerm]);

    const grantMutation = useMutation({
        mutationFn: async () => {
            const res = await axios.patch(
                `http://localhost:3000/api/v1/case-doc/${caseId}/${docId}/grant-access`,
                {
                    targetWallet: selectedUser.wallet,
                    permissions: {
                        canView,
                        canDelete,
                    }
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return res.data;
        },
        onSuccess: () => {
            showFlash("Access granted successfully", "success");
            queryClient.invalidateQueries({
                queryKey: ["doc-participants", caseId, docId, token],
            });
            onClose(); // close modal
            resetModal();
        },
        onError: () => {
            showFlash("Failed to grant access", "error");
        },
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50" style={{ marginTop: 0 }}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 min-h-[15rem] flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Grant Access</h2>

                    {/* Search box */}
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                        placeholder="Search by wallet, userId, or phone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Search results */}
                    {isSearching && <p className="text-sm text-gray-500">Searching...</p>}
                    {!selectedUser && searchResults.length > 0 && (
                        <ul className="max-h-40 overflow-y-auto border rounded p-2 space-y-2">
                            {searchResults.map((user) => (
                                <li
                                    key={user.wallet}
                                    className="cursor-pointer hover:bg-blue-50 p-2 border rounded flex justify-between items-center"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setSearchResults([]);
                                    }}
                                >
                                    <span>{user.userId || user.employeeId} ({user.role})</span>
                                    <span className="text-xs text-gray-500">
                                        {user.wallet.slice(0, 8)}...{user.wallet.slice(-4)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Selected User + Toggles */}
                    {selectedUser && (
                        <div className="border rounded p-3 space-y-3">
                            <div className="text-gray-800 font-medium">
                                Granting access to: {selectedUser.userId || selectedUser.employeeId} ({selectedUser.role})
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={canView}
                                        onChange={() => setCanView(!canView)}
                                    />
                                    <span>Can View</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={canDelete}
                                        onChange={() => setCanDelete(!canDelete)}
                                    />
                                    <span>Can Delete</span>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-3 pt-2">
                    <button
                        onClick={() => {
                            onClose();
                            resetModal();
                        }}
                        className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => grantMutation.mutate()}
                        disabled={!selectedUser || grantMutation.isPending}
                        className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
                    >
                        {grantMutation.isPending ? "Granting..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

GrantAccessModal.propTypes = {
    caseId: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default GrantAccessModal;
