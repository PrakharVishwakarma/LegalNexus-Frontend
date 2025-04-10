import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
