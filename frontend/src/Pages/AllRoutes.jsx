// frontend/src/Pages/AllRoutes.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import OtpVerification from './OtpVerification';
import Login from './Login';
import Forgotpw from './Forgotpw';
import Resetpw from './Resetpw';
import UserProfile from "./UserProfile";
import Dashboard from './Dashboard';
import Cases from './Cases';
import Case from './Case';
import CaseSettings from './CaseSettings';
import PersonalDocs from './PersonalDocs';
import VersionControl from './VersionControl';
import CaseDocSettings from '../Components/CaseDocSetting/CaseDocSettings';

// 🛡️ Route protection imports
import ProtectedRoute from "../utils/ProtectedRoute";
import PublicOnlyRoute from "../utils/PublicOnlyRoute";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import {
    authTokenState,
    isAuthenticatedState
} from '../recoil/atoms/authAtom';

import { useWalletAddress } from '../Hooks/useWalletAddress';

// import { useLoadUserProfile } from '../Hooks/useLoadUserProfile';
import { useUserRole } from '../Hooks/useUserRole';

import Layout from '../Components/common/Layout';

function AllRoutes() {
    const setAuthToken = useSetRecoilState(authTokenState);
    const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

    useWalletAddress();

    useUserRole();

    // const loadUserProfile = useLoadUserProfile();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
            // loadUserProfile(); // ✅ this restores user role, ID, wallet
        }
    }, [setAuthToken, setIsAuthenticated, /* loadUserProfile */]);

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
                <Route path="/userprofile" element={
                    <ProtectedRoute><UserProfile /></ProtectedRoute>
                } />
                {/* <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/cases" element={
                    <ProtectedRoute><Cases /></ProtectedRoute>
                } />
                <Route path="/personal-docs" element={
                    <ProtectedRoute><PersonalDocs /></ProtectedRoute>
                } />
                <Route path="/version-control" element={
                    <ProtectedRoute><VersionControl /></ProtectedRoute>
                } /> */}
                <Route element={<Layout />}>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/cases"
                        element={
                            <ProtectedRoute>
                                <Cases />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/cases/:caseId"
                        element={
                            <ProtectedRoute>
                                <Case/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/cases/:caseId/settings"
                        element={
                            <ProtectedRoute>
                                <CaseSettings/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/cases/:caseId/doc/:docId/settings"
                        element={
                            <ProtectedRoute>
                                <CaseDocSettings/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/personal-docs"
                        element={
                            <ProtectedRoute>
                                <PersonalDocs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/version-control"
                        element={
                            <ProtectedRoute>
                                <VersionControl />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default AllRoutes;
