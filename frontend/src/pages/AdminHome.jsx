import { useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

function AdminHome() {
  const { user, logout } = useAuthContext();
  

  return (
    <div>
      <div style={{ fontSize: "3em" }}>
        Hello {user?.username}, This is the admin dashboard
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminHome;
