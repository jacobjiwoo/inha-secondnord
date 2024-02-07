import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;
