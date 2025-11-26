import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = localStorage.getItem("adminAuth");
  return isAuth ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
