// /frontend/frontend/src/utils/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// ✅ Prop validation
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
