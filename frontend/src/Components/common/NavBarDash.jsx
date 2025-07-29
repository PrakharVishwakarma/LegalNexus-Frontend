// frontend/src/Components/Dashboard/NavBarDash.jsx

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { authTokenState, isAuthenticatedState } from "../../recoil/atoms/authAtom";
import { userRoleState, userIdState, walletAddressState } from "../../recoil/atoms/userAtom";
import { logoutUser } from "../../utils/authUtils";
import { useFlashMessage } from '../../Hooks/useFlashMessage'

const NavBarDash = () => {
  const navigate = useNavigate();
  const { showFlash } = useFlashMessage();

  const setAuthToken = useSetRecoilState(authTokenState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setUserRole = useSetRecoilState(userRoleState);
  const setUserId = useSetRecoilState(userIdState);
  const setWalletAddress = useSetRecoilState(walletAddressState);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
 
  const profileRef = useRef();
  const notifRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
      if (
        notifRef.current && !notifRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser({
      setAuthToken, setIsAuthenticated, resetUserStates: () => {
        setUserRole(null);
        setUserId(null);
        setWalletAddress(null);
      },
    });
    navigate("/");
    showFlash("success", "User Logged out successfully");
  };

  return (
    <nav className="bg-gradient-to-t from-blue-600 to-purple-500 p-4 shadow-lg text-white sticky top-0 left-0 w-full z-50"> 
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide ml-16">Legal Nexus</h1>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6 ">
          {/* Notification Icon */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className="text-xl relative hover:text-yellow-300 hover:scale-110 transition duration-200"
              aria-label="Notifications"
            >
              <FaBell size={24} />
            </button>
            {showNotificationDropdown && (
              <div className="absolute right-0 mt-4 w-80 bg-white/30 backdrop-blur-md text-black rounded-lg shadow-xl p-4 z-20">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Notifications</h3>
                  <button onClick={() => setShowNotificationDropdown(false)} className="text-xl font-bold">
                    ×
                  </button>
                </div>
                <ul className="space-y-2">
                  <li className="bg-white/60 rounded p-2 shadow">📄 Document #1234 reviewed</li>
                  <li className="bg-white/60 rounded p-2 shadow">👤 New user registered</li>
                  <li className="bg-white/60 rounded p-2 shadow">⚠️ Action needed on file #567</li>
                  <li className="bg-white/60 rounded p-2 shadow">📝 Your profile is incomplete</li>
                  <li className="bg-white/60 rounded p-2 shadow">✅ Backup completed successfully</li>
                </ul>
                <div className="mt-3 text-right">
                  <button className="text-blue-700 hover:underline text-sm">Load more...</button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Icon */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="text-2xl hover:text-yellow-200 hover:scale-110 transition duration-200"
              aria-label="User Profile"
            >
              <FaUserCircle size={24} />
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-4 w-56 bg-white/30 backdrop-blur-md text-black rounded-lg shadow-xl p-4 z-20">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Settings</h3>
                  <button onClick={() => setShowProfileDropdown(false)} className="text-xl font-bold">
                    ×
                  </button>
                </div>
                <ul className="space-y-3">
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 rounded hover:bg-white/70 transition"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate("/userprofile");
                      }}
                    >
                      ⚙️ Profile Settings
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-red-700 rounded hover:bg-white/70 transition"
                      onClick={handleLogout}
                    >
                      🔓 Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarDash;


