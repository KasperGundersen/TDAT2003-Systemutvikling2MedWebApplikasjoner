import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav
        class="navbar navbar-expand-md navbar-dark nav-bg-custom sticky-top"
        role="navigation"
      >
        <a class="navbar-brand">
          <NavLink className="nav-link" exact to="/">
            LOGO
          </NavLink>
        </a>
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
            <li class="nav-item custom-nav-text mr-5 my-auto">
              <NavLink className="nav-link" exact to="/">
                FORSIDE
              </NavLink>
            </li>
            <li class="nav-item custom-nav-text mr-5 my-auto">
              <NavLink className="nav-link" exact to="/register">
                REGISTRER
              </NavLink>
            </li>
            <li class="nav-item custom-nav-text my-auto d-none d-md-block">
              <div class="navBar-container">
                <input className="input-custom" type="text" placeholder="Søk..."></input>
                <div class="search"></div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
