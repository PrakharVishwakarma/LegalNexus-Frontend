import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authAtom";
import { useFlashMessage } from "./useFlashMessage";

const useChangeCaseAdmin = ({ caseId, onSuccess }) => {
  const token = useRecoilValue(authTokenState);
  const queryClient = useQueryClient();
  const { showFlash } = useFlashMessage();

  return useMutation({
    mutationFn: async ({ newAdminWallet, roleOfNewAdmin }) => {
      const { data } = await axios.patch(
        `http://localhost:3000/api/v1/cases/${caseId}/migrate-admin`,
        { newAdminWallet , roleOfNewAdmin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      // Invalidate both caseDetails and case-documents
      queryClient.invalidateQueries({ queryKey: ["caseDetails", caseId] });
      queryClient.invalidateQueries({ queryKey: ["case-documents", caseId] });
      if (onSuccess) onSuccess();
      showFlash("success", "Case Migrated Successfully");
    },
    onError: (error) => {
      console.error("Admin migration failed:", error);
      showFlash("error", "Case Migration Failed");
    },
  });
};

export default useChangeCaseAdmin;
