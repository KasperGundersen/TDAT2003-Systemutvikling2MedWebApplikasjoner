//@flow

import React, { Component } from "react";
import "../styles/LiveFeed.css";
import { NavLink } from "react-router-dom";
import { getEvents } from "./Service.js";

type State = {
  events: Array<{
    id: number,
    navn: string,
    beskrivelse: string,
    bilde: string,
    dato: string,
    opprettelse: string,
    kategori: number,
    viktighet: number
  }>
};

export default class LiveFeed extends Component<{}, State> {
  state = {
    events: []
  };

  componentDidMount() {
    getEvents().then(events => {
      this.setState({ events });
    });
  }
  render() {
    console.log(this.state.events.slice(0, 5));
    return (
      <div class="marquee">
        <div>SISTE NYTT</div>
        <p className="h-5 row text-uppercase">
          {this.state.events.slice(0, 6).map(e => feedLink(e))}
        </p>
      </div>
    );
  }
}

function feedLink(temp) {
  return (
    <NavLink className=" col mb-5 pt-0 mt-0" exact to={"/eventer/" + temp.id}>
      <a className="custom-date">
        {temp.dato}
      </a>
      &nbsp;&nbsp;&nbsp;
      <a className="custom-name">{temp.navn}</a>
    </NavLink>
  );
}
