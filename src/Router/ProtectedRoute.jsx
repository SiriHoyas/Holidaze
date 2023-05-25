import { Navigate, Outlet } from "react-router-dom";

import getAuth from "../js/getAuth";

function ProtectedRoute() {
  const isLoggedIn = getAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
