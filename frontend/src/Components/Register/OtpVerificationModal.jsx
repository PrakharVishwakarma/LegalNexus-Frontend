// frontend/src/Components/Register/OtpVerificationModal.jsx

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import SpinnerLoader from "../common/SpinnerLoader";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const RESEND_DELAY = 60; // seconds

const OtpVerificationModal = ({ phoneNumber, onClose }) => {
  const { showFlash } = useFlashMessage();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(RESEND_DELAY);
  const navigate = useNavigate();


  // Countdown for resend button
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Mutation: Verify OTP
  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/user/verify-otp",
        { phoneNumber, otp },
      );
      return res.data;
    },
    onSuccess: (data) => {
      showFlash(data.message, "success");
      onClose(); 
      navigate("/login");
    },
    onError: (error) => {
      showFlash(error.response?.data?.message || "OTP verification failed", "error");
    },
  });

  // Mutation: Resend OTP
  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/user/resend-otp",
        { phoneNumber },
      );
      return res.data;
    },
    onSuccess: (data) => {
      showFlash(data.message, "success");
      setTimeLeft(RESEND_DELAY); // reset countdown
    },
    onError: (error) => {
      showFlash(error.response?.data?.message || "Failed to resend OTP", "error");
    },
  });

  const handleVerify = (e) => {
    e.preventDefault();
    verifyOtpMutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
        <p className="text-sm mb-4">
          Enter the 6-digit OTP sent to <strong>{phoneNumber}</strong>.
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="Enter OTP"
            className="border rounded px-3 py-2 w-full mb-4"
            required
          />

          <button
            type="submit"
            disabled={verifyOtpMutation.isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex justify-center"
          >
            {verifyOtpMutation.isPending ? <SpinnerLoader/> : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4 flex justify-between items-center">
          <button
            disabled={timeLeft > 0 || resendOtpMutation.isLoading}
            onClick={() => resendOtpMutation.mutate()}
            className="text-blue-600 hover:underline disabled:opacity-50"
          >
            {resendOtpMutation.isLoading
              ? "Sending..."
              : timeLeft > 0
              ? `Resend OTP in ${timeLeft}s`
              : "Resend OTP"}
          </button>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

OtpVerificationModal.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OtpVerificationModal;
