import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};