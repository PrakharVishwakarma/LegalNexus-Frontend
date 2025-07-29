// /frontend/frontend/src/utils/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

import { useRecoilValue } from "recoil";

import { isAuthenticatedState } from "../recoil/atoms/authAtom";

import { walletAddressState,  } from "../recoil/atoms/userAtom";

import PropTypes from "prop-types";


const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useRecoilValue(isAuthenticatedState);
    const walletAddress = useRecoilValue(walletAddressState);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    if (!walletAddress) {
        return <Navigate to="/" replace />;
    }

    return <>
        {children}
    </>
    
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;