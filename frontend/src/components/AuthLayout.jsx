import { Navigate, Outlet } from "react-router-dom";

import useAuthContext from "../contexts/AuthContext";

const AuthLayout = () => {
  const { isLoggedIn, user } = useAuthContext();
  return isLoggedIn() && user ? <Outlet /> : <Navigate to="/admin" />;
};

export default AuthLayout;
