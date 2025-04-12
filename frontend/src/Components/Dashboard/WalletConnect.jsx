import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { FaWallet, FaTimesCircle } from "react-icons/fa";
import { useAuth } from "../../context/useAuth";
import { useFlash } from "../../context/useFlash";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { showFlash } = useFlash();
  const { token } = useAuth();

  // Load wallet address if already saved (fetch from backend)
  useEffect(() => {
    const getWallet = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.walletAddress) {
          setWalletAddress(res.data.walletAddress);
        }
      } catch (err) {
        console.error("Failed to load wallet:", err);
      }
    };

    getWallet();
  }, [token]);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        showFlash("Please install MetaMask to connect.", "error");
        setIsConnecting(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = ethers.getAddress(accounts[0]);

      // Send to backend
      const res = await axios.patch(
        "http://localhost:3000/api/v1/user/update-wallet",
        { walletAddress: address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showFlash(res.data.message || "Wallet connected!", "success");
      setWalletAddress(address);
    } catch (err) {
      console.error("Wallet connection error:", err);
      showFlash(
        err?.response?.data?.message || "Failed to connect wallet.",
        "error"
      );
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex justify-center">
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <FaWallet />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div
          className="relative px-6 py-2 text-white bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-md flex items-center gap-3"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <FaWallet className="text-lg" />
          <span className="font-mono">
            ✅ {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>

          {hovered && (
            <FaTimesCircle
              className="absolute -right-3 -top-3 text-white bg-red-500 rounded-full p-1 cursor-pointer hover:bg-red-600 transition"
              size={20}
              title="Remove Wallet (coming soon)"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
