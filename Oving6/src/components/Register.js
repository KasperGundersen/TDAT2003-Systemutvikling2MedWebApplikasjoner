import React, { Component } from "react";
import Navbar from "./Navbar.js";

export default class Register extends Component {
  render() {
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
            <label for="exampleInputEmail1">Tittel</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Skriv inn tittelen til din sak"
            ></input>
            <small id="emailHelp" class="form-text text-muted">
              Denne vil vises på forsiden.
            </small>
          </div>
          <div class="form-group mx-5">
            <label for="exampleInputPassword1">Beskrivelse</label>
            <textarea
              type="text"
              class="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Skriv inn det innholdet du ønsker vist i saken"
              rows="5"
            ></textarea>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <div class="form-group">
                  <input
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                  ></input>
                  <label for="exampleFormControlFile1">
                    Last opp bilder eller dokumenter
                  </label>
                </div>
              </div>
              <div class="col-sm">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Kategori
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      Sport
                    </a>
                    <a class="dropdown-item" href="#">
                      Religion
                    </a>
                    <a class="dropdown-item" href="#">
                      Underholdning
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary mx-5">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
