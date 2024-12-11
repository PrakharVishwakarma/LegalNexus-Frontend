import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Pwreset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState(null);
  const [timer, setTimer] = useState(120);
  const [isResendVisible, setIsResendVisible] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsResendVisible(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Handle Password Reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/forgot-password/reset', {
        phoneNumber,
        resetCode,
        newPassword,
      });
      setFlashMessage({ type: 'success', text: response.data.message });
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reset password. Please try again.';
      setFlashMessage({ type: 'error', text: errorMessage });
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/forgot-password/request-reset', {
        phoneNumber,
      });
      setFlashMessage({ type: 'success', text: 'Reset code resent successfully.' });
      setTimer(120); // Reset timer
      setIsResendVisible(false); // Hide resend button
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to resend reset code. Please try again.';
      setFlashMessage({ type: 'error', text: errorMessage });
    }
  };

  return (
    <div className='h-72 xl:w-4/12 lg:w-5/12 sm:w-7/12 w-9/12 shadow-lg shadow-zinc-400 hover:shadow-cyan-400 rounded-lg p-3 bg-blue-200'>
      <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 'bold' }}>Reset Password</h2>
      {flashMessage && <div className={`flash-message ${flashMessage.type}`}>{flashMessage.text}</div>}
      <form className='flex flex-col justify-evenly  items-center h-44' onSubmit={handleResetPassword}>
        <label className='w-full flex justify-between items-center'>
          Reset Code:
          <input
            type="text"
            placeholder="Enter reset code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
            maxLength="6"
            className='w-4/6 shadow-md p-1'
          />
        </label>
        <label className='w-full flex justify-between items-center'>
          New Password:
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength="6"
            className='w-4/6 shadow-md p-1'
          />
        </label>

        <button type="submit" className="p-[1px] relative w-44">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-700 rounded-lg" />
          <div className="px-2 py-1  bg-blue-500 rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Reset Password
          </div>
        </button>
      </form>
      {timer > 0 ? (
        <p>Time remaining: {timer} seconds</p>
      ) : (
        isResendVisible && <button onClick={{ handleResendOtp }} type="submit" className="p-[1px] relative w-44">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg" />
          <div className="px-2 py-1 bg-white rounded-[6px]  relative group transition duration-200 hover:bg-transparent text-slate-950 hover:text-white">
            Resend Code
          </div>
        </button>
      )}
    </div>
  );
};

export default Pwreset;
