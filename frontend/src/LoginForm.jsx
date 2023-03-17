import React, { useState } from "react";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, User } from "phosphor-react";
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/login', {username, password});
      setUsername("");
      setPassword("");
      navigate("/admin-home");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="input-group">
        <label className="hide-element">Username</label>
        <div className="input-icon-container">
          <User className="input-icon" size={"1.5em"} />
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
      </div>
      <div className="input-group">
        <label className="hide-element">Password</label>
        <div className="input-icon-container">
          <Lock className="input-icon" color="currentColor" size={"1.5em"} />
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
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
