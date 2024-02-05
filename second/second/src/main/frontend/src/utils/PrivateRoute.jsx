import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken === null) {
    return <Navigate to="/guest" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
