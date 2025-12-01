import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  const isAuthenticated = !!loginInfo?.accessToken;
  const isAdmin = loginInfo?.role === "ADMIN";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
