// /frontend/frontend/src/utils/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PropTypes from "prop-types";

const PublicOnlyRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

PublicOnlyRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PublicOnlyRoute;
