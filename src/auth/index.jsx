"use client";
import { deleteCookies, getCookies, setCookies } from "@/actions/cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    getCookies("__auth").then((token) => {
      if (token) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  const login = async (accessToken, user) => {
    // Set the access token in a cookie
    await setCookies("__auth", accessToken);
    setIsAuth(true);
  };

  const logout = async () => {
    // Clear the user state and cookie
    setIsAuth(false);
    await deleteCookies("__auth");
    window.location.reload();
  };
  return (
    <AuthContext.Provider value={{ login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
