import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const roles = ['Admin', 'Civilian', 'Judge', 'Lawyer', 'Police'];

const SignIn = () => {
  const navigate = useNavigate();
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
      localStorage.setItem('token', response.data.token); // Store token
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setFlashMessage({ type: 'error', text: errorMessage });
    }
  };

  return (
    <div id='signinBox'>
      <p style={{ margin: '0.4rem 0 0.6rem 0', fontSize: '2rem' }}>SignIn on LegalNexus</p>      
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.text}
        </div>
      )}
      <form className='signFormBox' onSubmit={handleLogin}>
        <label>
          Role:
          <select style={{marginRight:'15.9rem'}} name="role" value={form.role} onChange={handleChange}>
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
            />
          </label>
        ) : (
          <label>
            Employee ID:
            <input
              type="text"
              name="identifier"
              placeholder="Enter Employee ID"
              value={form.identifier}
              onChange={handleChange}
              required
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
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
