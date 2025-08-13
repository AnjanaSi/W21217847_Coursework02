import React, { createContext, useState, useContext } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    const decodedUser = jwt_decode(token);
    console.log("decoded_user",decodedUser)
   
    const userId = decodedUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const userRole = decodedUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const userName = decodedUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    if (userId && userRole) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole); 
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      setUser(decodedUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
