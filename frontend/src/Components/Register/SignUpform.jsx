import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const roles = ['Civilian', 'Judge', 'Lawyer', 'Police'];

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    role: 'Civilian',
    firstName: '',
    lastName: '',
    aadharNumber: '',
    phoneNumber: '+91',
    userId: '',
    employeeId: '',
    password: '',
  });
  const [flashMessage, setFlashMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isCivilian = form.role === 'Civilian';

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', form);
      setFlashMessage({ type: 'success', text: response.data.message });
      navigate('/OtpVerification', { state: { phoneNumber: form.phoneNumber } });
    } catch (error) {
      setFlashMessage({ type: 'error', text: error.response.data.message || 'Signup failed' });
    }
  };


  return (
    <div id='signupBox'>
      <p style={{margin:'0.4rem 0 0.6rem 0', fontSize:'2rem'}}>Signup on LegalNexus</p>
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.text}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className='signFormBox'>
        <label>
          Role:
          <select style={{marginRight:'15.9rem'}} name="role" value={form.role} onChange={handleChange}>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </label>
        <label>
          First Name:
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
        </label>
        <label>
          Aadhar Number:
          <input type="text" name="aadharNumber" value={form.aadharNumber} onChange={handleChange} required minLength="12" maxLength="12" />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
        </label>
        {isCivilian ? (
          <label>
            User ID:
            <input type="text" name="userId" value={form.userId} onChange={handleChange} required />
          </label>
        ) : (
          <label>
            Employee ID:
            <input type="text" name="employeeId" value={form.employeeId} onChange={handleChange} required />
          </label>
        )}
        <label>
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} required minLength="6" />
        </label>
        <button type="submit">Register</button>
      </form>

    </div>
  );
};

export default Signup;
