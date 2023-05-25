import React from "react";
import { Link } from "react-router-dom";

import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <h1 className="header">Which type of user are you?</h1>
      <div className="user-type">
        <Link to="guest">
          <button className="home-btn">Guest</button>
        </Link>
        <Link to="admin">
          <button className="home-btn">Admin</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
