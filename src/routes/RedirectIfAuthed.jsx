import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isTokenValid } from "../services/auth";

export default function RedirectIfAuthed({ to = "/escolhercriancas" }) {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const authed = !!token && isTokenValid();

  if (authed) {
    return <Navigate to={to} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

