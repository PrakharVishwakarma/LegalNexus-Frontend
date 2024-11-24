import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgotpw = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('+91');
    const [flashMessage, setFlashMessage] = useState(null);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/forgot-password/request-reset', {
                phoneNumber,
            });
            setFlashMessage({ type: 'success', text: response.data.message });
            navigate('/password-reset', { state: { phoneNumber } }); // Pass phoneNumber to the next page
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to send reset code. Please try again.';
            setFlashMessage({ type: 'error', text: errorMessage });
        }
    };

    return (<div className='h-screen w-screen flex justify-center items-center'>
        <div className=' bg-slate-200 w-4/12 h-52 rounded-md p-4 shadow-xl shadow-blue-200'>
            <p className='w-full text-center text-2xl'>Forget Password</p>
                {flashMessage && <div className={`flash-message ${flashMessage.type}`}>{flashMessage.text}</div>}
                <form onSubmit={handleForgotPassword} className='h-28 flex flex-col items-center justify-around mt-3'>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            placeholder="Enter your registered phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className='ml-6 shadow-lg h-8 p-2 w-56'
                        />
                    </label>


                    <button type="submit" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Get Code</button>

                    
                </form>
        </div>
    </div>
    );
};

export default Forgotpw;
