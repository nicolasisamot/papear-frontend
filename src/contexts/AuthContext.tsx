import { createContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";
import getToken from "../helpers/getToken.tsx";
import { Link } from "react-router-dom";

interface UserInterface {
  id: number;
  username: string;
  email: string;
  userImageUrl: string;
}

export const AuthContext = createContext<any>(null);
AuthContext.displayName = "Auth";

interface AuthContextType {
  token: string | null;
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  login: (token: string) => void;
  logout: () => void;
}
interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [socketIsConnected, setSocketIsConnected] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = getToken();
      if (token) {
        login(token);
      }
    } catch (error) {}
  }, []);

  const login = (token: string) => {
    try {
      setToken(token);
    } catch (error) {
      ////
    }
  };

  const logout = () => {
    setToken(null);
    setSocketIsConnected(false);
    setUser(null);
    localStorage.removeItem("authToken");
    setTimeout(() => {
      window.location.assign("/login");
    }, 0);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        user,
        setUser,
        socketIsConnected,
        setSocketIsConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
