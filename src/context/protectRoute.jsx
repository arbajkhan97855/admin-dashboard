import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./authContext";

export const ProtectedRoute = () => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <div>Checking authentication...</div>;

  return auth ? <Outlet /> : <Navigate to="/" replace />;
};
