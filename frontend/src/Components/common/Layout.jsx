// frontend/src/Components/common/Layout.jsx

import Sidebar from './Sidebar';
import NavBarDash from './NavBarDash';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <NavBarDash />
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div
                className={`
          transition-all duration-300 ease-in-out min-h-screen bg-slate-50
          ${isOpen ? 'ml-64' : 'ml-16'}
        `}
            >
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;
