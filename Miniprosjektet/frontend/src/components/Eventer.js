//@flow
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Service.js";
import { getEvents } from "./Service.js";
import "../styles/Eventer.css";

type Props = {
  kategori: number
};
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
  }>,
  main: Array<{
    id: number,
    navn: string,
    beskrivelse: string,
    bilde: string,
    dato: string,
    opprettelse: string,
    kategori: number,
    viktighet: number
  }>,
  kategori: number
};
export default class Eventer extends Component<Props, State> {
  state = {
    events: [],
    kategori: this.props.kategori,
    main: []
  };
  componentDidMount() {
    getEvents().then(events => {
      this.setState({ events });
      if (this.state.kategori) {
        this.setState({
          main: events.filter(e => e.kategori == this.state.kategori)[0]
        });
      } else {
        this.setState({ main: events.filter(e => e.viktighet == 1)[0] });
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.main == undefined ? (
          <div className="error-container">
            <h1 className="mx-auto text-center">
              Det finnes dessverre ingen eventer innenfor denne kategorien
            </h1>
          </div>
        ) : (
          <div>
            <div className="align-center">{mainEvent(this.state.main)}</div>
            <h3 className="text-center">Kommende eventer:</h3>
            <div class="card-columns mt-5 mx-5">
              {this.state.kategori
                ? this.state.events
                    .filter(e => e.kategori == this.state.kategori)
                    .map(e => card(e))
                : this.state.events
                    .filter(e => e.viktighet == 1)
                    .map(e => card(e))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mainEvent(temp: any) {
  return (
    <div class="card mx-auto my-3 w-50 mb-4">
      <div class="card-body">
        <h1 className="card-title text-center">{temp.navn}</h1>
        <NavLink
          className="nav-link stretched-link"
          exact
          to={"/eventer/" + temp.id}
        ></NavLink>
      </div>
      <img
        src={temp.bilde}
        class="card-img-bottom img-circle"
        alt="Main Event Card"
      />
    </div>
  );
}

function card(temp) {
  return (
    <div class="card">
      <img class="card-img-top" src={temp.bilde} alt="Card-image-cap"></img>
      <div class="card-body">
        <h5 class="card-title mx-3 mt-2">{temp.navn}</h5>
        <p class="card-text mx-3">{temp.beskrivelse}</p>
        <NavLink
          className="nav-link stretched-link"
          exact
          to={"/eventer/" + temp.id}
        ></NavLink>
      </div>
      <div class="card-footer">
        <small class="text-muted">
          Dato:{" "}
          {temp.dato}
        </small>
      </div>
    </div>
  );
}
