// frontend/src/Hooks/useUpdateMetadata.js

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authTokenState } from "../recoil/atoms/authAtom";
import { useRecoilValue } from "recoil";

export const useUpdateMetadata = () => {
  const token = useRecoilValue(authTokenState);

  return useMutation({
    mutationFn: async ({ caseId, data }) => {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/cases/${caseId}/metadata`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
  });
};
