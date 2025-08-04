// frontend/src/Components/common/Sidebar.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { TfiMenuAlt } from "react-icons/tfi";
import { GoLaw } from "react-icons/go";
import { IoDocuments } from "react-icons/io5";
import { GoIssueTrackedBy } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";

import { authTokenState, isAuthenticatedState } from '../../recoil/atoms/authAtom';
import { userRoleState, userIdState, walletAddressState } from '../../recoil/atoms/userAtom';
import { logoutUser } from '../../utils/authUtils';
import { useFlashMessage } from '../../Hooks/useFlashMessage';
import PropTypes from 'prop-types';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showFlash } = useFlashMessage();

    // Recoil State
    const userRole = useRecoilValue(userRoleState);
    const setAuthToken = useSetRecoilState(authTokenState);
    const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
    const setUserRole = useSetRecoilState(userRoleState);
    const setUserId = useSetRecoilState(userIdState);
    const setWalletAddress = useSetRecoilState(walletAddressState);

    // Local State
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [setIsOpen]);

    // Filter menu items based on user role
    const menuItems = useMemo(() => {
        const allMenuItems = [
            {
                name: 'Dashboard',
                icon: TbLayoutDashboardFilled,
                path: '/dashboard',
                allowedRoles: ['Judge', 'Lawyer', 'Police', 'Civilian']
            },
            {
                name: 'Cases',
                icon: GoLaw,
                path: '/cases',
                allowedRoles: ['Judge', 'Lawyer', 'Police', 'Civilian']
            },
            {
                name: 'Personal Documents',
                icon: IoDocuments,
                path: '/personal-docs', // Updated path as requested
                allowedRoles: ['Judge', 'Lawyer', 'Police', 'Civilian']
            },
            {
                name: 'Version Control',
                icon: GoIssueTrackedBy,
                path: '/version-control',
                allowedRoles: ['Judge', 'Lawyer', 'Police', 'Civilian']
            }
        ];
        if (!userRole) return []; // No menu items if role is not set

        return allMenuItems.filter(item =>
            item.allowedRoles.includes(userRole)
        );
    }, [userRole]);

    // Get current active item based on current route
    const getCurrentActiveItem = React.useCallback(() => {
        const currentPath = location.pathname;
        const activeItem = menuItems.find(item => item.path === currentPath);
        return activeItem ? activeItem.name : 'Dashboard';
    }, [location.pathname, menuItems]);

    const [activeItem, setActiveItem] = useState(getCurrentActiveItem());

    // Update active item when route changes
    useEffect(() => {
        setActiveItem(getCurrentActiveItem());
    }, [location.pathname, menuItems, getCurrentActiveItem]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        try {
            // Set active item
            setActiveItem(item.name);

            // Navigate to the corresponding path
            navigate(item.path);

            // Close sidebar on mobile after navigation
            if (isMobile) {
                setIsOpen(false);
            }

            // Show success flash message for navigation
            showFlash("info", `Navigated to ${item.name}`);

        } catch (error) {
            console.error('Navigation error:', error);
            showFlash("error", "Navigation failed. Please try again.");
        }
    };

    const handleLogout = () => {
        try {
            logoutUser({
                setAuthToken,
                setIsAuthenticated,
                resetUserStates: () => {
                    setUserRole(null);
                    setUserId(null);
                    setWalletAddress(null);
                },
            });
            navigate("/");
            showFlash("success", "User logged out successfully");
        } catch (error) {
            console.error('Logout error:', error);
            showFlash("error", "Logout failed. Please try again.");
        }
    };

    // Don't render sidebar if user role is not available
    if (!userRole) {
        return (
            <div className="sticky top-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded-lg shadow-lg z-50">
                <p className="text-sm font-medium">Loading user permissions...</p>
                {userRole}
            </div>
        );
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 
                text-white shadow-2xl z-50 transition-all duration-150 ease-in-out
                ${isOpen ? 'w-64' : 'w-16'}
                ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
            `}>
                {/* Header with Toggle Button and Role Badge */}
                <div className="flex items-center justify-between px-3 py-4 border-b border-slate-700">
                    <div className={`flex flex-col ${!isOpen && 'items-center'}`}>
                        {isOpen && (
                            <>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Legal Nexus
                                </h1>

                            </>
                        )}
                        {/* {!isOpen && (
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                    {userRole?.charAt(0)}
                                </span>
                            </div>
                        )} */}
                    </div>

                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                    >
                        {isOpen ? <VscChromeClose /> : <TfiMenuAlt />}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-6">
                    {menuItems.length > 0 ? (
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const IconComponent = item.icon;
                                const isActive = activeItem === item.name;

                                return (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => handleItemClick(item)}
                                            className={`
                                                w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200
                                                group relative overflow-hidden
                                                ${isActive
                                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                                }
                                                ${!isOpen && 'justify-center'}
                                            `}
                                            title={!isOpen ? item.name : ''}
                                        >
                                            {/* Active indicator */}
                                            {isActive && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                                            )}

                                            <IconComponent className={`
                                                w-5 h-5 flex-shrink-0 transition-transform duration-200
                                                ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                                                ${isOpen ? 'mr-3' : ''}
                                            `} />

                                            {isOpen && (
                                                <span className={`
                                                    font-medium transition-all duration-200 truncate
                                                    ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                                                `}>
                                                    {item.name}
                                                </span>
                                            )}

                                            {/* Hover effect for collapsed state */}
                                            {!isOpen && (
                                                <div className="absolute left-16 bg-slate-800 text-white px-2 py-1 rounded-lg 
                                                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                                            pointer-events-none whitespace-nowrap text-sm shadow-lg z-50">
                                                    {item.name}
                                                </div>
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="text-center text-slate-400 text-sm">
                            No menu items available for your role.
                        </div>
                    )}
                </nav>

                {/* User Info Section (if expanded) */}
                {isOpen && (
                    <div className="px-4 py-2 border-t border-slate-700">
                        <div className="text-xs text-slate-400 mb-1">Access Level:</div>
                        <div className="text-sm font-medium text-slate-200">
                            {userRole === 'Civilian' ? 'Limited Access' : 'Full Access'}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                            {menuItems.length} menu{menuItems.length !== 1 ? 's' : ''} available
                        </div>
                    </div>
                )}

                {/* Logout Button at Bottom */}
                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={handleLogout}
                        className={`
                            w-full flex items-center px-1 py-1 rounded-xl transition-all duration-200
                            text-red-400 hover:bg-red-900/20 hover:text-red-300 group relative
                            ${!isOpen && 'justify-center'}
                        `}
                        title={!isOpen ? 'Logout' : ''}
                    >
                        <MdLogout size={24} className={isOpen ? 'mr-2' : ''} />

                        {isOpen && (
                            <span className="font-medium">Logout</span>
                        )}

                        {/* Hover tooltip for collapsed state */}
                        {!isOpen && (
                            <div className="absolute left-16 bg-slate-800 text-white px-2 py-1 rounded-lg 
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                        pointer-events-none whitespace-nowrap text-sm shadow-lg z-50">
                                Logout
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;