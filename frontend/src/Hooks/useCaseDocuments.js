// src/Hooks/useCaseDocuments.js

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authAtom";

const fetchCaseDocuments = async (caseId, params, token) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const { data } = await axios.get(
    `http://localhost:3000/api/v1/case-doc/${caseId}?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

const useCaseDocuments = (caseId, queryParams) => {
  const authToken = useRecoilValue(authTokenState);

  return useQuery({
    queryKey: ["case-documents", caseId, ...Object.values(queryParams)],
    queryFn: () => fetchCaseDocuments(caseId, queryParams, authToken),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    enabled: !!caseId && !!authToken,
  });
};

export default useCaseDocuments;
