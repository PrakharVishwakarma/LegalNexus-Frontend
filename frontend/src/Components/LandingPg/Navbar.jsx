import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "./navbar.css"; 

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    // Determine which buttons to render based on the current route
    const renderAuthButtons = () => {
        if (location.pathname === "/register") {
            return (
                <button className="btn-signin" onClick={() => navigate('/login')}>
                    Sign In
                </button>
            );
        } else if (location.pathname === "/login") {
            return (
                <button className="btn-signup" onClick={() => navigate('/register')}>
                    Sign Up
                </button>
            );
        } else {
            return (
                <>
                    <button className="btn-signin" onClick={() => navigate('/login')}>
                        Sign In
                    </button>
                    <button className="btn-signup" onClick={() => navigate('/register')}>
                        Sign Up
                    </button>
                </>
            );
        }
    };

    return (
        <nav className="navbar">
            <div className="container">
                {/* Logo Section */}
                <div className="logo ">
                    Legal Nexus
                </div>

                {/* Menu Icon for Mobile */}
                <div className="menu-icon" onClick={handleShowNavbar}>
                    ☰
                </div>

                {/* Navigation Elements */}
                <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
                    <ul>
                        <li>
                            <NavLink to="/" onClick={() => setShowNavbar(false)}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" onClick={() => setShowNavbar(false)}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects" onClick={() => setShowNavbar(false)}>
                                Our Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" onClick={() => setShowNavbar(false)}>
                                Testimonial
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" onClick={() => setShowNavbar(false)}>
                                Join Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" onClick={() => setShowNavbar(false)}>
                                FAQs
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Authentication Buttons */}
                <div className="auth-buttons">
                    {renderAuthButtons()}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
