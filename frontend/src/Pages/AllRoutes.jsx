import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import OtpVerification from './OtpVerification';
import Login from './Login';
import Dashboard from './Dashboard';
import Forgotpw from './Forgotpw';
import Resetpw from './Resetpw';
import UserProfile from "./UserProfile";

// 🛡️ Route protection imports
import ProtectedRoute from "../utils/ProtectedRoute";
import PublicOnlyRoute from "../utils/PublicOnlyRoute";

function AllRoutes() {
    return (
        <Router>
            <Routes>
                {/* Publicly accessible */}
                <Route path="/" element={<Home />} />

                {/* Public-Only Routes */}
                <Route path="/register" element={
                    <PublicOnlyRoute><Register /></PublicOnlyRoute>
                } />
                <Route path="/OtpVerification" element={
                    <PublicOnlyRoute><OtpVerification /></PublicOnlyRoute>
                } />
                <Route path="/login" element={
                    <PublicOnlyRoute><Login /></PublicOnlyRoute>
                } />

                {/* Forgot/Reset password — open to all */}
                <Route path="/forgot-password" element={<Forgotpw />} />
                <Route path="/password-reset" element={<Resetpw />} />

                {/* Protected Routes (only if logged in) */}
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/userprofile" element={
                    <ProtectedRoute><UserProfile /></ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default AllRoutes;
