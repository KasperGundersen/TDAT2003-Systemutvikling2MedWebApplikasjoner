//@flow

import React, { Component } from "react";
import "../styles/stylesheet.css";
import "../styles/Article.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Service.js";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {
  getOneEvent,
  deleteEvent,
  updateEvent,
  getKategori,
  postDeltager,
  deltagereAmount
} from "./Service.js";

type Props = {
  match: { params: { id: number } }
};
type State = {
  id: number,
  navn: string,
  beskrivelse: string,
  bilde: string,
  dato: string,
  opprettelse: string,
  kategori: number,
  kategorier: Array<{ id: number, Navn: string }>,
  viktighet: number,
  email: string,
  deltagere: number,
  kategoriNavn: string
};

export default class Article extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      navn: "",
      beskrivelse: "",
      bilde: "",
      dato: "",
      opprettelse: "",
      kategori: -1,
      kategorier: [],
      viktighet: 0,
      email: "",
      deltagere: 0,
      kategoriNavn: ""
    };
    this.articleDelete = this.articleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  componentDidMount() {
    getKategori().then(kategorier => {
      this.setState({ kategorier });
      getOneEvent(this.props.match.params.id).then(event => {
        this.setState({
          navn: event.navn,
          beskrivelse: event.beskrivelse,
          bilde: event.bilde,
          dato: event.dato,
          opprettelse: event.opprettelse,
          kategori: event.kategori,
          viktighet: event.viktighet
        });
        this.setState({
          kategoriNavn: this.state.kategorier.map(e =>
            e.id == this.state.kategori ? e.Navn : ""
          )
        });
      });
      console.log(this.state.kategoriNavn);
    });

    deltagereAmount(this.props.match.params.id).then(e => {
      this.setState({
        deltagere: e[0].antallDeltakere
      });
    });
  }

  addParticipant = () => {
    if (this.state.email == "") {
      alert("Du kan ikke melde deg på uten å oppgi email");
    } else {
      console.log("deltar på event");
      console.log("id: " + this.state.id + " email: " + this.state.email);
      postDeltager(this.state.id, this.state);
      window.location.reload();
    }
  };

  articleDelete = () => {
    console.log("trykker delete");
    deleteEvent(this.state.id);
    window.location.hash = "";
    window.location.reload();
  };

  handleSubmit = () => {
    if (this.state.navn == "") {
      alert("Du må skrive inn en tittel på eventet");
    } else if (this.state.beskrivelse == "") {
      alert("Du må skrive inn en beskrivelse");
    } else if (this.state.bilde == "") {
      alert("Du må skrive inn en bildeadresse");
    } else if (this.state.dato == "") {
      alert("Du må velge en dato");
    } else if (this.state.viktighet == -1) {
      alert(
        "Du må velge en viktighet. \nKun de med viktighet 1 vises på forsiden"
      );
    } else if (this.state.kategori == -1) {
      alert("Du må velge en kategori");
    } else {
      updateEvent( this.state).then(res => {});
    }
  };
  handleChange = (event: any) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDayChange = (day: any) => {
    var dato = day.toLocaleDateString().replace(/\./g, "-");
    this.setState({ dato: dato });
  };

  render() {
    var currenDate = new Date(this.state.opprettelse);
    var year = currenDate.getFullYear();
    var month = currenDate.getMonth();
    var date = currenDate.getDate();
    var eventDate = this.state.dato;
    const {
      navn,
      beskrivelse,
      bilde,
      dato,
      kategorier,
      viktighet,
      email,
      deltagere
    } = this.state;

    return (
      <div className="home-container bg-light">
        <Navbar />
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title mx-5" id="exampleModalLongTitle">
                  Sletting av arrangement
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body mx-5">
                Er du sikker på at du vil slette arrangementet? Det blir borte
                for alltid!!
              </div>
              <div class="modal-footer">
                <div className="row">
                  <div className="col-sm align-self-left">
                    <div class="text-left align-self-left">
                      <button
                        type="button"
                        class="btn btn-secondary text-left align-self-left"
                        data-dismiss="modal"
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                  <div className="col-sm">
                    {" "}
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={
                        (() => {
                          console.log("onclick");
                        },
                        this.articleDelete)
                      }
                    >
                      Slett
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="EditModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="EditModalTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title mx-5" id="EditModalLongTitle">
                  Redigering av arrangement
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group mx-5">
                    <label for="exampleInputEmail1">Tittel</label>
                    <input
                      type="text"
                      class="form-control"
                      name="navn"
                      value={navn}
                      aria-describedby="emailHelp"
                      placeholder="Skriv inn tittelen til din sak"
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div class="form-group mx-5">
                    <label for="exampleInputPassword1">Beskrivelse</label>
                    <textarea
                      type="text"
                      class="form-control"
                      name="beskrivelse"
                      value={beskrivelse}
                      placeholder="Skriv inn det innholdet du ønsker vist i saken"
                      rows="5"
                      onChange={this.handleChange}
                    ></textarea>
                  </div>
                  <div class="form-group mx-5">
                    <label for="exampleFormControlFile1">Bilde </label>
                    <input
                      type="text"
                      class="form-control"
                      name="bilde"
                      value={bilde}
                      aria-describedby="emailHelp"
                      placeholder="Legg til bildeadressen du vil ha på eventet ditt"
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div class="form-group mx-5">
                    <label for="exampleFormControlFile1">Dato for event</label>
                    <div>
                      <DayPickerInput
                        placeholder="ÅÅÅÅ-MM-DD"
                        value={dato}
                        onDayChange={this.handleDayChange}
                      />
                    </div>
                  </div>

                  <div id="viktig" className="form-group mx-5">
                    <label for="exampleFormControlFile1">Viktighet</label>
                    <br />

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input "
                        type="radio"
                        id="inlineRadio1"
                        name="viktighet"
                        value={viktighet}
                        onClick={() => this.setState({ viktighet: 1 })}
                        
                      />
                      <label class="form-check-label" for="inlineRadio1">
                        1
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        id="inlineRadio2"
                        name="viktighet"
                        value={viktighet}
                        onClick={() => this.setState({ viktighet: 2 })}
                      />
                      <label class="form-check-label" for="inlineRadio2">
                        2
                      </label>
                    </div>
                  </div>
                  <div class="container mx-5">
                    <div class="row">
                      <div class="dropdown">
                        <button
                          class="btn btn-secondary dropdown-toggle"
                          type="button"
                          name="kategorier"
                          value={kategorier}
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {this.state.kategori == -1
                            ? "Kategori"
                            : this.state.kategorier.find(
                                e => e.id == this.state.kategori
                              ).Navn}
                        </button>
                        <div
                          class="dropdown-menu "
                          aria-labelledby="dropdownMenuButton"
                        >
                          {this.state.kategorier.map(e => (
                            <a
                              class="dropdown-item"
                              onClick={() => this.setState({ kategori: e.id })}
                            >
                              {e.Navn}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={() => this.handleSubmit()}
                  data-dismiss="modal"
                >
                  Oppdater
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right mr-3 settings-custom mt-2">
          <div class="dropdown">
            <button
              class="btn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="./resources/innstilling-cogs.png" width="80"></img>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                type="button"
                class="dropdown-item"
                data-toggle="modal"
                data-target="#EditModal"
              >
                Rediger
              </button>
              <button
                type="button"
                class="dropdown-item"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Slett
              </button>
            </div>
          </div>
        </div>
        <img id="image" src={this.state.bilde} />

        <div className="text-box">
          <div className="row my-4">
            <div className="col-sm">
              {" "}
              <h1 className="align-self-left text-left">{this.state.navn}</h1>
            </div>
            <div className="col-sm">
              <div className="align-self-right text-right">
                <h1>
                  {" "}
                  <span class="badge badge-pill badge-primary ">
                    {eventDate}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <span className="badge badge-pill badge-secondary w-100">
            <div className="row mx-3 ">
              <div className="col">
                <h5 id="info-text" className="my-auto">
                  Opprettet: {date}-{month + 1}-{year}
                </h5>
              </div>
              <div className="col">
                <h4 className="my-auto">
                  Påmeldte: &nbsp;
                  <span class="badge badge-pill badge-success ">
                    {this.state.deltagere}
                  </span>
                </h4>
              </div>
              <div className="col">
                <h4 className="my-auto">
                  <span class="badge badge-pill badge-info">
                    <NavLink
                      className="stretched-link"
                      exact
                      to={"/kategori/" + this.state.kategori}
                    >
                      {this.state.kategoriNavn}
                    </NavLink>
                  </span>
                </h4>
              </div>
            </div>
          </span>
          <br />
          <br />
          <br />
          <h3>{this.state.beskrivelse}</h3>
          <br />

          <div className="align-self-center text-center">
            <h5>Meld deg på her:</h5>
            <h3>
              {" "}
              <a
                href="/"
                class="badge badge-pill badge-primary "
                data-toggle="collapse"
                data-target="#participant-form"
                aria-expanded="false"
                aria-controls="participant-form"
              >
                Delta!
              </a>
            </h3>
            <div class="collapse multi-collapse" id="participant-form">
              <div class="card card-body">
                <form>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email-adresse</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Vennligst skriv inn din email"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </div>
                  <h2>
                    <button
                      type="button"
                      class="badge badge-pill badge-primary"
                      onClick={this.addParticipant.bind(this)}
                    >
                      Submit
                    </button>
                  </h2>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
