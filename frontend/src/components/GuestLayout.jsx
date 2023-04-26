import { Navigate, Outlet } from "react-router-dom";

import useAuthContext from "../contexts/AuthContext";

const GuestLayout = () => {
  const { isLoggedIn, user } = useAuthContext();
  return !isLoggedIn() || !user ? <Outlet /> : <Navigate to="/admin-home" />;
};

export default GuestLayout;
