import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ArrowRight, Lock, User } from "phosphor-react";
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css";

const endpoint = 'http://localhost:8000/api/register'

function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(endpoint, { username: username, email: email, password: password, password_confirmation: password_confirmation });
    navigate('/guest')
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Username</label>
        <div
          className='username'
         >
            <input
            className="form-input"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
            </div>
            </div>
        <label >Email</label>
        <div
          className='email'
        >
            <input
            className="form-input"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
            </div>
      <div className="input-group">
        <label >Password</label>
        <div
          className='password'
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
        <label >Password Confirmation</label>
        <div
          className='passwordConf'
        >
          <Lock className="input-icon" color="currentColor" size={"1.5em"} />
          <input
            className="form-input"
            name="password"
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Password confirmation"
          />
        </div>
      </div>
      
      <div className="submit-group">
        <h2>Register</h2>
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

export default CreateUser;
