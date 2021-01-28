import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav
        class="navbar navbar-expand-md navbar-dark bg-primary sticky-top "
        role="navigation"
      >
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav mx-auto">
            <li class="nav-item custom-nav-text">
              <NavLink className="nav-link" exact to="/">
                FORSIDE
              </NavLink>
            </li>
            <li class="nav-item custom-nav-text">
              <NavLink className="nav-link" exact to="/register">
                REGISTRER
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
