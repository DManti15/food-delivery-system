import React from "react";
import './LoginForm.css'

function LoginForm() {
  return (
    <form>
      <div className="username-group">
        <label className="hide-element">Username</label>
        <input className="form-input" type="text" placeholder="Username" />
      </div>
      <div className="password-group">
        <label className="hide-element">Password</label>
        <input className="form-input" type="password" placeholder="Password" />
      </div>
      <div className="submit-group">
        <h2>Login</h2>
        <button type="submit"></button>
      </div>
    </form>
  );
}

export default LoginForm;
