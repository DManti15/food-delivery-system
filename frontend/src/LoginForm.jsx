import React, { useState, useEffect } from "react";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, User } from "phosphor-react";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();
    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/admin-home");
      console.log("success");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors(error.response.data.errors);
      }
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="hide-element">Username</label>
        <div className="input-icon-container">
          <User className="input-icon" size={"1.5em"} />
          <input
            className="form-input"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        {errors && errors.email && (
            <span className="error">{errors.email[0]}</span>
          )}
      </div>
      <div className="input-group">
        <label className="hide-element">Password</label>
        <div className="input-icon-container">
          <Lock className="input-icon" color="currentColor" size={"1.5em"} />
          <input
            className="form-input"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {errors && errors.password && (
            <span className="error">{errors.password[0]}</span>
          )}
      </div>
      <div className="submit-group">
        <h2>Login</h2>
        <button type="submit">
          <ArrowRight
            className="arrow-icon"
            color="currentColor"
            size={"1.8em"}
          />
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
