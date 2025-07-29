// src/Hooks/useUploadDocument.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, pinataApi } from "../services/api";
import { useSetRecoilState } from "recoil";
import { flashMessageState } from "../recoil/atoms/flashMessageAtom";

export const useUploadDocument = (caseId) => {
  const queryClient = useQueryClient();
  const setFlashMessage = useSetRecoilState(flashMessageState);

  const mutation = useMutation({
    mutationFn: async ({ file, title, encrypted = false }) => {
      // Upload to Pinata IPFS
      const ipfsRes = await pinataApi.uploadFile(file, { caseId, title });

      const fileType = file.type || "application/octet-stream";
      const fileSize = file.size;

      // Upload metadata to backend
      const res = await api.post("/case-doc/upload", {
        caseId,
        title,
        fileType,
        fileSize,
        ipfsCid: ipfsRes.ipfsCid,
        encrypted,
      });

      if (res.status !== 201) {
        throw new Error("Failed to upload to database.");
      }

      return res.data;
    },

    onSuccess: () => {
      // ✅ Invalidate cache to trigger real-time refetch
      queryClient.invalidateQueries({
        queryKey: ["case-documents", caseId],
        exact: false,
      });

      setFlashMessage({
        type: "success",
        title: "Upload Successful",
        text: "Document uploaded and linked to case successfully.",
      });
    },

    onError: async (error, _, context) => {
      // Rollback: unpin file from IPFS if DB upload fails
      setFlashMessage({
        type: "error",
        title: "Upload Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred.",
      });

      if (context?.ipfsCid) {
        try {
          await pinataApi.unpinFile(context.ipfsCid);
        } catch (rollbackErr) {
          console.warn("Rollback (unpin) failed:", rollbackErr);
        }
      }

      setFlashMessage({
        type: "error",
        title: "Upload Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred.",
      });
    },
  });

  return {
    uploadDocument: mutation.mutateAsync,
    isUploading: mutation.isPending,
    error: mutation.error?.message || "",
  };
};
