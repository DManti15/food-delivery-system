import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="header">Which type of user are you?</h1>
      <div className="user-type">
        <Link to="guest">
          <button className="btn">Guest</button>
        </Link>
        <Link to="admin">
          <button className="btn">Admin</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
