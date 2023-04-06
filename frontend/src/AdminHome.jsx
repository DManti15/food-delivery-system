import React, { useEffect } from "react";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";

function AdminHome() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin");
      return;
    }
    axios
      .get("/api/admin-home", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/admin");
        }
      });
  }, []);

  return ( 
    <div style={{fontSize: '3em'}}>This is the admin dashboard</div>
   );
}

export default AdminHome;