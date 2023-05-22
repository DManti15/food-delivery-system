import { ArrowRight, Lock, User } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

import useAuthContext from "../contexts/AuthContext";

import "../styles/LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="hide-element">Email</label>
        <div
          className={
            errors.email || errors.login
              ? "input-icon-container error-line"
              : "input-icon-container"
          }
        >
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
        {errors?.email?.[0] && <span className="error">{errors.email[0]}</span>}
      </div>
      <div className="input-group">
        <label className="hide-element">Password</label>
        <div
          className={
            errors.password || errors.login
              ? "input-icon-container error-line"
              : "input-icon-container"
          }
        >
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
        {errors?.password?.[0] && (
          <span className="error">{errors.password[0]}</span>
        )}
        {errors.login && <span className="error">{errors.login}</span>}
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
