// frontend/src/Hooks/useCases.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authAtom";

export const useCases = (filters, refreshTrigger = 0) => {
  const [cases, setCases] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useRecoilValue(authTokenState);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCases = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          ...filters,
          page: currentPage,
        };

        const response = await axios.get(
          "http://localhost:3000/api/v1/cases/get-cases",
          {
            params,
            headers: { Authorization: `Bearer ${token}` },
            signal,
          }
        );

        setCases(response.data.cases);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching cases:", err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCases();

    return () => controller.abort(); 
  }, [filters, currentPage, token, refreshTrigger]);

  return {
    cases,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
  };
};
