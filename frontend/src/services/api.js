// frontend/src/services/api.js

import axios from "axios";

// -----------------------------
// Base Backend API Setup
// -----------------------------

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Inject Bearer token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------
// Pinata IPFS API Setup
// -----------------------------

export const pinataApi = {
  jwt: import.meta.env.VITE_PINATA_JWT || "your-default-jwt-token",

  // Upload file to Pinata
  uploadFile: async (file, metadata = {}) => {
    const formData = new FormData();
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: metadata.name || file.name,
      keyvalues: { ...metadata },
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", pinataOptions);

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${pinataApi.jwt}`,
          },
        }
      );

      return {
        success: true,
        ipfsCid: response.data.IpfsHash,
        pinSize: response.data.PinSize,
        timestamp: response.data.Timestamp,
      };
    } catch (error) {
      console.error("Pinata upload error:", error);
      throw error;
    }
  },

  // Build IPFS Gateway URL
  getFileUrl: (ipfsCid) => `https://gateway.pinata.cloud/ipfs/${ipfsCid}`,

  // Unpin file (optional feature)
  unpinFile: async (ipfsCid) => {
    try {
      await axios.delete(`https://api.pinata.cloud/pinning/unpin/${ipfsCid}`, {
        headers: {
          Authorization: `Bearer ${pinataApi.jwt}`,
        },
      });
      return { success: true };
    } catch (error) {
      console.error("Pinata unpin error:", error);
      throw error;
    }
  },
};

export default api;
