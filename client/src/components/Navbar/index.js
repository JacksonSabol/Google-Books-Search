import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar">
      <Link className="navbar__brand" to="/">
        Google Books Search
      </Link>
      <div>
        <div className="navbar__nav">
          <a className="nav__nav--item">
            <Link
              to="/"
              className={
                window.location.pathname === "/" || window.location.pathname === "/saved"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Saved  
            </Link>
          </a>
          <a className="nav__nav--item">
            <Link
              to="/search"
              className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
            >
              Search
            </Link>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
