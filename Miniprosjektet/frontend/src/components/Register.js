//@flow

import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import "../styles/Register.css";
import { postEvent, getKategori } from "./Service.js";
import "./Service.js";
import DatePicker from "react-datepicker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

type State = {
  navn: string,
  beskrivelse: string,
  bilde: string,
  dato: string,
  kategori: number,
  kategorier: Array<{ id: number, Navn: string }>,
  viktighet: number
};

export default class Register extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      navn: "",
      beskrivelse: "",
      bilde: "",
      dato: "",
      kategori: -1,
      kategorier: [],
      viktighet: -1
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = () => {
    getKategori().then(kategorier => {
      this.setState({ kategorier });
    });
  };

  handleChange = (event: any) => {
    {
      event.target.value == ""
        ? alert(event.target.name + " må ha innhold")
        : console.log(event.target.value);
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (e: any) => {
    if(this.state.navn == ""){
      alert("Du må skrive inn en tittel på eventet")
    } else if(this.state.beskrivelse == ""){
      alert("Du må skrive inn en beskrivelse")
    } else if(this.state.bilde == ""){
      alert("Du må skrive inn en bildeadresse")
    } else if(this.state.dato == ""){
      alert("Du må velge en dato")
    } else if(this.state.viktighet == -1){
      alert("Du må velge en viktighet. \nKun de med viktighet 1 vises på forsiden")
    } else if(this.state.kategori == -1){
      alert("Du må velge en kategori")
    } else{
      postEvent(this.state).then(res => {
        window.location.hash = "";
      })
    }
    
  };
  handleDayChange = (day: any) => {
    var feilDato = day.toLocaleDateString().replace(/\./g, "-");
    var riktigDato =
      feilDato.substring(6, 11) +
      feilDato.substring(2, 6) +
      feilDato.substring(0, 2);
    console.log(riktigDato);
    this.setState({ dato: riktigDato });
  };

  render() {
    const {
      navn,
      beskrivelse,
      bilde,
      dato,
      kategorier,
      viktighet
    } = this.state;
    return (
      <div>
        <Navbar />
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Registrer en sak!</h1>
            <p class="lead">
              Her kan du laste opp en nyhetssak til vår nettside.
            </p>
          </div>
        </div>
        <form>
          <div class="form-group mx-5">
            <label>Tittel</label>
            <input
              type="text"
              class="form-control"
              name="navn"
              value={navn}
              placeholder="Skriv inn tittelen til din sak"
              onChange={this.handleChange}
            ></input>
            <small class="form-text text-muted">
              Denne vil vises på forsiden.
            </small>
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
                onDayChange={this.handleDayChange}
              />
            </div>
          </div>

          <div id="viktig" className="form-group mx-5">
            <label for="exampleFormControlFile1">Viktighet</label>
            <br />

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
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
          <button
            type="button"
            onClick={this.handleSubmit.bind(this)}
            class="btn btn-primary mx-5"
          >
            Submit
          </button>
        </form>
        <Footer />
      </div>
    );
  }
}
