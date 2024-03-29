import React, { createContext,useContext, useState } from "react";

export const AuthContext = createContext();

// For the authorization of the blood center routes
export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
  
    const handleLogin = (token) => {
      setToken(token);
      console.log("Handle Login Token:",token);
      localStorage.setItem('token', token);

    };
  
    const handleLogout = () => {
      setToken(null);
      localStorage.removeItem('token');
    };
  
    return (
      <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };
export const useAuth = () => useContext(AuthContext);
