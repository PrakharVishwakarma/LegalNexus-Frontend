// frontend/src/Components/CaseDocSetting/AccessControlPanel.jsx

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authAtom";
import PropTypes from "prop-types";
import GrantAccessModal from "./GrantAccessModal";
import { walletAddressState } from "../../recoil/atoms/userAtom";

const fetchParticipants = async ({ queryKey }) => {
    const [_key, caseId, docId, token] = queryKey;
    const res = await axios.get(
        `http://localhost:3000/api/v1/case-doc/${caseId}/${docId}/participants`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data.participants;
};

const revokePermission = async ({ caseId, docId, targetWallet, token }) => {
    const res = await axios.patch(
        `http://localhost:3000/api/v1/case-doc/${caseId}/${docId}/revoke-access`,
        { targetWallet },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data;
};

const AccessControlPanel = ({ caseId, docId, currentUserPermissions }) => {
    const token = useRecoilValue(authTokenState);
    const walletAddress = useRecoilValue(walletAddressState);
    const { showFlash } = useFlashMessage();
    const queryClient = useQueryClient();

    const [showGrantModal, setShowGrantModal] = useState(false);

    // console.log("Current User Permissions: ", currentUserPermissions);

    const { data: participants = [], isLoading } = useQuery({
        queryKey: ["doc-participants", caseId, docId, token],
        queryFn: fetchParticipants,
        refetchOnWindowFocus: false,
    });

    const { mutate: revokeAccess, isPending } = useMutation({
        mutationFn: ({ targetWallet }) =>
            revokePermission({ caseId, docId, targetWallet, token }),
        onSuccess: () => {
            showFlash("Access revoked successfully", "success");
            queryClient.invalidateQueries({
                queryKey: ["doc-participants", caseId, docId, token],
            });
        },
        onError: () => {
            showFlash("Failed to revoke access", "error");
        },
    });

    const canGrantOrDeleteAccess = currentUserPermissions.isUserCaseAdmin || currentUserPermissions.isUserDocCreator;


    if (!currentUserPermissions.hasUserViewAccess) return null;

    return (
        <div className="bg-white shadow rounded-lg p-6 space-y-4 border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    🛡️ Manage Access Control
                </h2>
                {/* Grant Access button placeholder */}
                {
                    canGrantOrDeleteAccess && (<button
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded"
                        onClick={() => {
                            setShowGrantModal(true);
                        }}
                    >
                        + Grant Access
                    </button>)
                }
            </div>

            {showGrantModal && (
                <GrantAccessModal
                    caseId={caseId}
                    docId={docId}
                    onClose={() => setShowGrantModal(false)}
                />
            )}

            {isLoading ? (
                <div className="text-gray-500">Loading access list...</div>
            ) : participants.length === 0 ? (
                <div className="text-gray-500 italic">
                    No participants currently have access to this document.
                </div>
            ) : (
                <ul className="space-y-3">
                    {participants.map((user) => (
                        <li
                            key={user.wallet}
                            className="bg-gray-50 border rounded p-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-center items-center gap-4">
                                    <div className="font-semibold text-gray-800">
                                        {user.userId ? <span>{user.userId}</span> : <span>{user.employeeId}</span>}
                                    </div>
                                    <div className="font-semibold text-gray-800">
                                        ({user.role})
                                    </div>
                                </div>
                                <div className="flex justify-center items-center gap-4">
                                    <div className="text-sm text-gray-500 text-center">
                                        {user.phoneNumber.slice(3, 7)}...{user.phoneNumber.slice(-2)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Wallet: {user.wallet.slice(0, 10)}....{user.wallet.slice(-12)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="text-sm text-gray-500">
                                    Can View : {user.canView ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Can Delete : {user.canDelete ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}
                                </div>
                            </div>

                            <div className="flex gap-3 items-center flex-wrap">
                                {canGrantOrDeleteAccess && (
                                    user.wallet === walletAddress ? (
                                        <span className="text-xs text-blue-700 font-semibold px-2 py-1 bg-blue-100 rounded">
                                            👑 Case Admin
                                        </span>
                                    ) : (
                                        <button
                                            disabled={isPending}
                                            className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
                                            onClick={() =>
                                                revokeAccess({ targetWallet: user.wallet })
                                            }
                                        >
                                            🗑️ Delete
                                        </button>
                                    )
                                )}

                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

AccessControlPanel.propTypes = {
    caseId: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    currentUserPermissions: PropTypes.object.isRequired,
};

export default AccessControlPanel;
