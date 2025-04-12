// /frontend/src/components/Signin.jsx

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const roles = ['Admin', 'Civilian', 'Judge', 'Lawyer', 'Police'];

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [form, setForm] = useState({
    role: 'Civilian',  // Default role
    identifier: '',
    password: '',
  });
  const [flashMessage, setFlashMessage] = useState(null);

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Determine if the role requires userId or employeeId
  const isUserIdRequired = form.role === 'Civilian' || form.role === 'Admin';

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', form);
      setFlashMessage({ type: 'success', text: 'Login successful!' });
      login(response.data.token); // ✅ Set token via context
      navigate('/dashboard');     // ✅ Redirect after context update
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setFlashMessage({ type: 'error', text: errorMessage });
    }
  };

  return (
    <div id='signinBox' className='shadow-xl rounded-lg hover:shadow-blue-500/60 up-down'>
      <p style={{ margin: '0.4rem 0 0.6rem 0', fontSize: '2.2rem', fontWeight:'bold'}}>SignIn on LegalNexus</p>
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.text}
        </div>
      )}
      <form className='signFormBox' onSubmit={handleLogin}>
        <label>
          Role:
          <select style={{ marginRight: '14.4rem' }} name="role" value={form.role} onChange={handleChange} className='shadow-lg focus:shadow-none'>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </label>
        {isUserIdRequired ? (
          <label>
            User ID:
            <input
              type="text"
              name="identifier"
              placeholder="Enter User ID"
              value={form.identifier}
              onChange={handleChange}
              required
              className='shadow-lg focus:shadow-none'
            />
          </label>
        ) : (
          <label>
            Employee ID:
            <input
              type="text"
              name="identifier"
              placeholder="Enter Employee Identity Card ID"
              value={form.identifier}
              onChange={handleChange}
              required
              className='shadow-lg focus:shadow-none'
            />
          </label>
        )}
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            minLength="6"
            className='shadow-lg focus:shadow-none'
          />
        </label>
        <button type="submit" className="p-[3px] relative w-44">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg" />
          <div className="px-8 py-2  bg-blue-500 rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Sign In
          </div>
        </button>
      </form>
      <div className='w-full flex justify-between p-2'>
        <div>
          <p>
            Dont have an account? <Link className='text-blue-700 hover:text-purple-500' to="/register">SignUp</Link>
          </p>
        </div>
        <div>
          <p>
            <Link className='text-blue-700 hover:text-purple-500' to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
