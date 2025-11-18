import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isTokenValid, getDashboardRoute, getUser } from "../services/auth";

export default function RedirectIfAuthed({ to = "/escolhercriancas" }) {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const authed = !!token && isTokenValid();
  const user = typeof window !== 'undefined' ? getUser() : null;
  const destino = getDashboardRoute(user?.tipo, to);

  if (authed) {
    return <Navigate to={destino} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
