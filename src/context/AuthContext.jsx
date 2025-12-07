import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Change this to the correct import

// Thêm giá trị mặc định để tránh undefined khi chưa có Provider
export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined để xử lý trạng thái loading
  const [token, setToken] = useState(null);   // Lưu token

  const login = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    try {
      const decoded = jwtDecode(jwtToken); // Decode the token
      setUser(decoded);
    } catch (e) {
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const loadUser = () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode(savedToken); // Decode the token
        setUser(decoded);
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
