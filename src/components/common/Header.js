import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = { color: "black" };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <NavLink className="navbar-brand" exact to="/">
        Navbar
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              exact
              to="/"
              activeStyle={activeStyle}
            >
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/courses"
              activeStyle={activeStyle}
            >
              Courses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about" activeStyle={activeStyle}>
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
