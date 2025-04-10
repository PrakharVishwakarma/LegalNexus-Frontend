import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
