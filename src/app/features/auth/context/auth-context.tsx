"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: {
    id: string;
  } | null;
  login: (email: string, password: string) => void;
  logout: (id: string) => void;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      setLoading(true);
      const response = await fetch("/api/validate-session");

      if (!response.ok) {
        
        //invalid session re-direct to login-page;
        router.push("/login")
      }
      const { user } = await response.json();
      setUser(user);
      setLoading(false);
    };

    validateSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // This is crucial
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const { message } = await response.json();
      setError(message);
      setLoading(false);
      return;
    }

    const { user } = await response.json();
    setUser(user);
    setError(null);
    router.push("/");
    setLoading(false);
  };

  const logout = async (id: string) => {
    setLoading(true);
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // This is crucial
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      const { message } = await response.json();
      setError(message);
      setLoading(false);
      return;
    }

    setUser(null);
    setError(null);
    router.push("/login");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error(`Please use auth context inside auth context provider`);
  }

  return contextValue;
};
