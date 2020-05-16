import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Pluralsight Administration</h1>
      <p>React Redux and web apps</p>
      <Link to="/about" className="btn btn-info">
        About
      </Link>
    </div>
  );
}

export default HomePage;
