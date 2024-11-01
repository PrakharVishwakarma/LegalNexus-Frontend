import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location.state?.phoneNumber;
  const [otp, setOtp] = useState('');
  const [flashMessage, setFlashMessage] = useState(null);
  const [timer, setTimer] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);

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

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/verify-otp', { phoneNumber, otp });
      setFlashMessage({ type: 'success', text: response.data.message });
      navigate('/Login'); // Redirect to dashboard on success
    } catch (error) {
      setFlashMessage({ type: 'error', text: error.response.data.message || 'OTP verification failed' });
    }
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', { phoneNumber });
      setFlashMessage({ type: 'success', text: 'OTP resent to your phone number' });
      setTimer(60); // Reset timer
      setIsResendVisible(false); // Hide resend button
    } catch (error) {
      setFlashMessage({ type: 'error', text: 'Failed to resend OTP' });
    }
  };

  return (
    <div id='verifyOtpBox'>
      <h2>OTP Verification</h2>
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.text}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); handleOtpSubmit(); }} className='signFormBox'>
        <label>
          OTP:
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength="6" />
        </label>
        <button type="submit">Verify OTP</button>
      </form>
      {timer > 0 ? (
        <p>Time remaining: {timer} seconds</p>
      ) : (
        isResendVisible && <button onClick={handleResendOtp}>Resend OTP</button>
      )}
    </div>
  );
};

export default VerifyOtp;
