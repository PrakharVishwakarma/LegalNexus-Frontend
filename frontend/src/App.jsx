import './App.css'

import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';

import Register from './Pages/Register';

import OtpVerification from './pages/OtpVerification';

import Login from './pages/Login';

import Dashboard from './pages/Dashboard';

import Forgotpw from './Pages/Forgotpw';

import Resetpw from './Pages/Resetpw';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/OtpVerification" element={<OtpVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<Forgotpw />} />
          <Route path="/password-reset" element={<Resetpw />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
