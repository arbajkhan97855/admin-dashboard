
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/login/check_auth`,
        {
          method: "GET",
          credentials: "include", 
        }
      );

      const data = await res.json();

      setAuth(data.authenticated);
    } catch (err) {
      setAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
