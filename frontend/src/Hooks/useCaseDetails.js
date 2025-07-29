// frontend/src/Hooks/useCaseDetails.js

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import { authTokenState } from "../recoil/atoms/authAtom";
import { useRecoilValue } from "recoil";
import { useCaseAccess } from "../context/useCaseAccess";

const fetchCaseDetails = async (caseId, token) => {
  const res = await axios.get(`http://localhost:3000/api/v1/cases/${caseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // contains: { case, permissions }
};

export const useCaseDetails = (caseId) => {
  const token = useRecoilValue(authTokenState);

  const { setIsUserCaseAdmin, setHasUserViewAccess, setHasUserUploadAccess } =
    useCaseAccess();

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["caseDetails", caseId],
    queryFn: () => fetchCaseDetails(caseId, token),
    enabled: !!caseId && !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Handle successful data fetch
  useEffect(() => {
    if (data && !isLoading && !isError) {
      const perms = data?.permissions || {};
      // console.log("permissions are : ",perms);
      setIsUserCaseAdmin(!!perms.isUserCaseAdmin);
      setHasUserViewAccess(!!perms.hasUserViewAccess);
      setHasUserUploadAccess(!!perms.hasUserUploadAccess);
    }
  }, [
    data,
    isLoading,
    isError,
    setIsUserCaseAdmin,
    setHasUserViewAccess,
    setHasUserUploadAccess,
  ]);

  // Handle errors
  useEffect(() => {
    if (isError && error) {
      console.error(
        "Error fetching case details:",
        error?.response?.data || error
      );
    }
  }, [isError, error]);

  const caseData = data?.case || null;
  const adminData = data?.adminData || null;

  return {
    caseData,
    adminData,
    loading: isLoading,
    error: isError ? error : null,
    refetch, // useful to manually refetch after updates
  };
};
