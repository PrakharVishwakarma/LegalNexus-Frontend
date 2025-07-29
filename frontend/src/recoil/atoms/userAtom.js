// frontend/src/recoil/atoms/userAtom.js

import { atom } from "recoil";

import { localStorageEffect } from "../effects/localStorageEffect";

export const userRoleState = atom({
  key: "userRoleState",
  default: null, // e.g., "Civilian", "Judge", etc.
  effects: [localStorageEffect("userRoleState")]
});

export const walletAddressState = atom({
  key: "walletAddressState",
  default: null,
  effects: [localStorageEffect("walletAddressState")]
});

export const userIdState = atom({
  key: "userIdState",
  default: null, // e.g., "johnDoe01" or employeeId
});

/*
const walletAddressSelector = selector({
  key: "walletAddressSelector",
  get: async ({ get }) => {
    try {
      const token = get(authTokenState)
      if (!token) return null;

      const res = await axios.get("http://localhost:3000/api/v1/user/wallet-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.walletAddress || null;
    } catch (error) {
      console.error("Failed to fetch wallet address:", error);
      return ""; // Provide fallback value
    }
  },
});

export const walletAddressState = atom({
  key: "walletAddressState",
  default: walletAddressSelector,
});
*/


// // using GET /api/v1/user/role
// const usesrRoleSelector = selector({
//   key: "userRoleSelector",
//   get: async ({ get }) => {
//     try {
//       const token = get(authTokenState);
//       if (!token) return null;

//       const walletAddress = get(walletAddressState);
//       if(!walletAddress) return null;

//       const res = await axios.get("http://localhost:3000/api/v1/user/role", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       return res.data.role || null;
//     } catch (error) {
//       console.error("Failed to fetch user role:", error);
//       return null; // Provide fallback value
//     }
//   },
// })

// export const userRoleState = atom({
//   key: "userRoleState",
//   default: usesrRoleSelector,
// });