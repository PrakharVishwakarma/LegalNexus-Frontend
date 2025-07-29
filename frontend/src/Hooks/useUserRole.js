// frontend/src/hooks/useUserRole.js

import { useEffect } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { authTokenState } from "../recoil/atoms/authAtom";

import { userRoleState, walletAddressState } from "../recoil/atoms/userAtom";

import axios from "axios";

export const useUserRole = () => {
  const authToken = useRecoilValue(authTokenState);
  const setUserRole = useSetRecoilState(userRoleState);
  const walletAddress = useRecoilValue(walletAddressState);

  useEffect(() => {
    let isMounted = true;

    const fetchUserRole = async () => {
      if (!authToken) {
        if (isMounted) setUserRole(null);
        return;
      }

      if (!walletAddress) {
        console.warn("Wallet address is not set, skipping user role fetch.");
        if (isMounted) setUserRole(null);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/role", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (isMounted) {
          setUserRole(res.data.role || null);
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        if (isMounted) {
          setUserRole("");
        }
      }
    };

    fetchUserRole();

    return () => {
      isMounted = false;
    };
  }, [authToken, setUserRole, walletAddress]);
};
