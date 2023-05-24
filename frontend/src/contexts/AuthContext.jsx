import * as cookie from "cookie";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosAPI from "../api/axiosAPI";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const csrf = () => axiosAPI.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axiosAPI.get("/api/user");
    if (!Cookies.get("username")) {
      Cookies.set("username", JSON.stringify(data));
    }
    setUser(data);
  };

  const login = async ({ email, password }) => {
    await csrf();
    try {
      const response = await axiosAPI.post("/api/login", { email, password });
      console.log(response);
      setIsLoading(false);
      await getUser();
      Cookies.set("is_user_logged_in", true, {
        expires: 86400,
        sameSite: "lax",
      });
      navigate("/admin-home");
      setErrors([]);
      console.log("success");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors(error.response.data.errors);
      }
      setIsLoading(false);
      console.log(error);
    }
  };

  const logout = () => {
    axiosAPI.post("/api/logout").then(() => {
      Cookies.remove("is_user_logged_in");
      navigate("/");
    });
  };

  const isLoggedIn = (reqCookies = null) => {
    if (!reqCookies) {
      return !! Cookies.get("is_user_logged_in");
    }

    return !! cookie.parse(reqCookies).is_user_logged_in;
  };

  useEffect(() => {
    if (Cookies.get("username")) {
      const findCookie = Cookies.get("username");
      const userName = JSON.parse(findCookie);
      setUser(userName);
    }
  }, []);
  
  return (
    <AuthContext.Provider
      value={{ user, getUser, errors, login, logout, isLoggedIn, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
