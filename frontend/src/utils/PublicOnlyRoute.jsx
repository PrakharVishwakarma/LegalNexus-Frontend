// /frontend/frontend/src/utils/PublicOnlyRoute.jsx

import { Navigate } from "react-router-dom";

import { useRecoilValue } from "recoil";

import { isAuthenticatedState } from "../recoil/atoms/authAtom";

import PropTypes from "prop-types";


const PublicOnlyRoute = ({ children }) => {
    const isAuthenticated = useRecoilValue(isAuthenticatedState);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

PublicOnlyRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicOnlyRoute;