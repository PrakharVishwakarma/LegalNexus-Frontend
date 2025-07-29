// frontend/src/Hooks/useWalletAddress.js

import { useEffect } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { authTokenState } from "../recoil/atoms/authAtom";

import { walletAddressState } from "../recoil/atoms/userAtom";

import axios from "axios";

export const useWalletAddress = () => {
  const authToken = useRecoilValue(authTokenState);
  const setWalletAddress = useSetRecoilState(walletAddressState);
  useEffect(() => {
    let isMounted = true;

    const fetchWalletAddress = async () => {
      if (!authToken) {
        if (isMounted) setWalletAddress(null);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/wallet-address",
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        if (isMounted) {
          setWalletAddress(res.data.walletAddress || null);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn(
            "Wallet address not found. User needs to connect their wallet."
          );
          if (isMounted) setWalletAddress(null);
        } else {
          console.error("Failed to fetch wallet address:", error);
          if (isMounted) setWalletAddress("");
        }
      }
    };

    fetchWalletAddress();

    return () => {
      isMounted = false;
    };
  }, [authToken, setWalletAddress]);
};
