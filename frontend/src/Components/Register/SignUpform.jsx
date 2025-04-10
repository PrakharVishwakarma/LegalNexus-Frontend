import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


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
    <div id='signupBox' className='up-down shadow-xl hover:shadow-blue-500/60 rounded-lg'>
      <p style={{ margin: '0.4rem 0 0.6rem 0', fontSize: '2.2rem', fontWeight: 'normal' }}>Signup on LegalNexus</p>
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.text}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className='signFormBox'>
        <label>
          Role:
          <select style={{ marginRight: '14.5rem' }} name="role" value={form.role} onChange={handleChange} className='shadow-xl focus:shadow-none'>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </label>
        <label>
          First Name:
          <input type="text" placeholder='John' name="firstName" value={form.firstName} onChange={handleChange} required className='shadow-lg focus:shadow-none' />
        </label>
        <label>
          Last Name:
          <input type="text" placeholder='Doe' name="lastName" value={form.lastName} onChange={handleChange} required className='shadow-lg focus:shadow-none' />
        </label>
        <label>
          Aadhar Number:
          <input type="text" placeholder='12 digit Aadhar number' name="aadharNumber" value={form.aadharNumber} onChange={handleChange} required minLength="12" maxLength="12" className='shadow-lg focus:shadow-none' />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required className='shadow-lg focus:shadow-none' />
        </label>
        {isCivilian ? (
          <label>
            User ID:
            <input type="text" placeholder='johnDoe01' name="userId" value={form.userId} onChange={handleChange} required className='shadow-lg focus:shadow-none' />
          </label>
        ) : (
          <label>
            Employee ID:
            <input type="text" placeholder='Employee Identity Card Id' name="employeeId" value={form.employeeId} onChange={handleChange} required className='shadow-lg focus:shadow-none' />
          </label>
        )}
        <label>
          Password:
          <input type="password" placeholder='@95Zln70' name="password" value={form.password} onChange={handleChange} required minLength="6" className='shadow-lg focus:shadow-none' />
        </label>

        <button type="submit" className="p-[3px] relative w-44">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg" />
          <div className="px-8 py-2  bg-blue-500 rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Sign Up
          </div>
        </button>
      </form>
      <div className='mt-2'>
        <p>
          Already have an account?
          <Link className='text-blue-700 hover:text-purple-500' to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
