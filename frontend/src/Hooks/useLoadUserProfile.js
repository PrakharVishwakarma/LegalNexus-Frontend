// frontend/src/Hooks/useLoadUserProfile.js 

import axios from "axios";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  userRoleState,
  userIdState,
} from "../recoil/atoms/userAtom";
import { authTokenState } from "../recoil/atoms/authAtom";
import { useCallback } from "react";


export const useLoadUserProfile = () => {
  const setUserRole = useSetRecoilState(userRoleState);
  const setUserId = useSetRecoilState(userIdState);
  const token = useRecoilValue(authTokenState);

  const loadProfile = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { role, userId, employeeId } = res.data;

      setUserRole(role);
      setUserId(role === "Civilian" || role === "Admin" ? userId : employeeId);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }, [token, setUserRole, setUserId]);
  
  return loadProfile;
};
