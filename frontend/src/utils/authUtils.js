// frontend/src/Hooks/authUtills.js

export const loginUser = (setters, token) => {
  localStorage.setItem("token", token);
  setters.setAuthToken(token);
  setters.setIsAuthenticated(true);
};

export const logoutUser = (setters) => {
  localStorage.removeItem("token");
  setters.setAuthToken(null);
  setters.setIsAuthenticated(false);

  // Optional helper for better decoupling
  if (setters.resetUserStates) setters.resetUserStates();
};
