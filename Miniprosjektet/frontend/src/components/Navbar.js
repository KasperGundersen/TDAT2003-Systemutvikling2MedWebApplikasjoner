//@flow

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { getKategori, eventSearch } from "./Service.js";

type State = {
  kategorier: Array<{ id: number, Navn: string }>,
  events: Array<string>
};

export default class Navbar extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      kategorier: [],
      events: []
    };
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    getKategori().then(kategorier => {
      this.setState({ kategorier });
    });
  }

  search = (ord: string) => {
    eventSearch(ord.target.value).then(events => {
      this.setState({ events });
      console.log(events);
    });
  };

  render() {
    const { eventer, kategorier } = this.state;
    return (
      <nav
        class="navbar  navbar-dark nav-bg-custom sticky-top"
        role="navigation"
      >
        <a class="navbar-brand ml-3">
          <NavLink className="navbar-brand" exact to="/">
            EVENT BOSS
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

        <div class="collapse navbar-collapse ml-3" id="navbarSupportedContent">
          <ul class="nav navbar-nav mx-auto">
            <li>
              <div class="input-group md-form form-sm form-1 pl-0 search-custom">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text pink lighten-3"
                    id="basic-text1"
                  >
                    <img src="./resources/search.png" width="24"></img>
                  </span>
                </div>
                <input
                  class="form-control my-0 py-1"
                  type="text"
                  placeholder="Søk"
                  aria-label="Search"
                  data-toggle="dropdown"
                  onChange={this.search}
                />
              </div>
              <div class="customDrop" aria-labelledby="dropdownMenuButton">
                {this.state.events.map(e => (
                  <li class="list-group-item py-1">
                    <NavLink
                      className="custom-event-text stretched-link"
                      exact
                      to={"/eventer/" + e.id}
                      onClick={() => {
                        window.location.hash = "/eventer/" + e.id;
                        window.location.reload(true);
                      }}
                    >
                      {e.navn}
                    </NavLink>
                  </li>
                ))}
              </div>
            </li>
            <li>
              <div id="accordion">
                <div class="card nav-item">
                  <div class="card-header nav-item" id="headingOne">
                    <h5 class="mb-0">
                      <button
                        class="btn btn-link nav-item"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <NavLink
                          className="custom-nav-text stretched-link"
                          exact
                          to="/register"
                        >
                          REGISTRER
                        </NavLink>
                      </button>
                    </h5>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingTwo">
                    <h5 class="mb-0">
                      <button
                        class="btn custom-nav-text collapsed stretched-link"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        KATEGORI
                      </button>
                    </h5>
                  </div>
                  <div
                    id="collapseTwo"
                    class="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordion"
                  >
                    <div class="card-body">
                      <div class="card">
                        <ul class="list-group list-group-flush">
                          {this.state.kategorier.map(e => (
                            <li class="list-group-item py-0 small-text-custom">
                              <NavLink
                                className="custom-nav-text stretched-link"
                                exact
                                to={"/kategori/" + e.id}
                                onClick={() => {
                                  window.location.hash = "/kategori/" + e.id;
                                  window.location.reload(true);
                                }}
                              >
                                {e.Navn}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
