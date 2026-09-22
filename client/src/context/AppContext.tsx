import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyUser } from "../assets/assets";

interface UserType {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "uesr" | "admin" | "owner";
}

interface AppContextType {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string,
    role?: string,
  ) => Promise<boolean>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log(email, password);
    setUser(dummyUser as any);
    setToken(dummyUser.token);
    localStorage.setItem("token", dummyUser.token);
    return true;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
    role?: string,
  ): Promise<boolean> => {
    console.log(name, email, password, phone, role);
    setUser(dummyUser as any);
    setToken(dummyUser.token);
    localStorage.setItem("token", dummyUser.token);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const loadUesr = async () => {
      if (token) {
        setUser(dummyUser as any);
      }
      setLoading(false);
    };
    loadUesr();
  }, []);

  const value: AppContextType = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    register,
    logout,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext)
  if(!context){
    throw new Error("useAppContext must be used within AppContextProvider")
  }
  return context
}
