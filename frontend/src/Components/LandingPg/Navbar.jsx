// /frontend/src/Components/LandingPg/Navbar.jsx

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenState, isAuthenticatedState } from "../../recoil/atoms/authAtom";
import { walletAddressState } from "../../recoil/atoms/userAtom";
import { logoutUser } from "../../utils/authUtils"
import "./navbar.css";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import WalletConnect from "./WalletConnect";
import { useWalletAddress } from "../../Hooks/useWalletAddress";
import { useUserRole } from "../../Hooks/useUserRole";

const Navbar = () => {
    const navigate = useNavigate();

    useWalletAddress();
    
    useUserRole();

    const { showFlash } = useFlashMessage();
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
    const walletAddress = useRecoilValue(walletAddressState);
    const setAuthToken = useSetRecoilState(authTokenState);
    const [showNavbar, setShowNavbar] = useState(false);


    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const handleLogout = () => {
        logoutUser({ setIsAuthenticated, setAuthToken });
        showFlash("success", "User Logged Out successfully!");
        navigate("/"); // ✅ redirect to home
    };

    return (
        <nav className="navbar bg-[#a0d3dc] shadow-md">
            <div className="container flex justify-between items-center py-4 px-6">
                {/* Left: Logo */}
                <div
                    className="logo text-2xl font-bold text-[#2c2045] cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Legal Nexus
                </div>

                {/* Menu Toggle (for mobile) */}
                <div className="menu-icon text-xl cursor-pointer" onClick={handleShowNavbar}>
                    ☰
                </div>

                {/* Navigation Links */}
                <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
                    <ul className="flex space-x-6 font-medium text-[#2c2045]">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/our-ervices">Our Services</NavLink></li>
                        <li><NavLink to="/testimonial">Testimonial</NavLink></li>
                        <li><NavLink to="/join-us">Join Us</NavLink></li>
                        <li><NavLink to="/faqs">FAQs</NavLink></li>
                    </ul>
                </div>

                {/* Authentication Buttons */}
                <div className="auth-buttons flex items-center space-x-3">
                    {!isAuthenticated ? (
                        <>
                            <button
                                className="flex items-center gap-2 bg-[#2c2045] text-white px-4 py-2 rounded-md hover:bg-[#3a2c64] transition"
                                onClick={() => navigate("/login")}
                            >
                                <FaSignInAlt /> Sign In
                            </button>
                            <button
                                className="flex items-center gap-2 bg-[#5a4f4f] text-white px-4 py-2 rounded-md hover:bg-[#6e5e5e] transition"
                                onClick={() => navigate("/register")}
                            >
                                <FaUserPlus /> Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            {(!walletAddress) ? (
                                <WalletConnect />
                            ) : (
                                <div className="pulseDashButton hover:cursor-pointer" onClick={() => navigate("/dashboard")}><FaUserShield className="mr-2" size={20} /> Dashboard</div>
                            )}
                            <button
                                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
