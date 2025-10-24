import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isTokenValid } from "../services/auth";

export default function RequireAuth() {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Sem token ou token expirado: limpar e redirecionar
  if (!token || !isTokenValid()) {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {}
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
