import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/stylesheet.css";
import Navbar from "./Navbar.js";
import BigNews from "./BigNews.js";
import MedNews from "./MedNews.js";
import SmallNews from "./SmallNews.js";
import LiveFeed from "./LiveFeed";
import Footer from "./Footer.js";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container bg-light">
        <Navbar />
        <LiveFeed />
        <div className="row justify-content-center">
          <BigNews
            title="Trump Dump adopterer Greta Thunberg"
            src="../resources/trump.jpg"
            alt="Trump og Northug jr."
            href="/article"
          />         
        </div>
        <div className="row justify-content-center">
          <SmallNews
            title=" Trump Dump til angrep på Northug"
            src="../resources/trump.jpg"
            alt="Trump og Northug jr."
            href="#"
          />
          <SmallNews
            title=" Trump Dump til angrep på Northug"
            src="../resources/trump.jpg"
            alt="Trump og Northug jr."
            href="#"
          />
          <SmallNews
            title=" Trump Dump til angrep på Northug"
            src="../resources/trump.jpg"
            alt="Trump og Northug jr."
            href="#"
          />
        </div>
        <div className="row justify-content-center">
          <MedNews
            title="Northug til angrep på Trump Dump"
            src="../resources/northug.jpg"
            alt="Trump og Northug jr."
            href="#"
          />
          <SmallNews
            title=" Trump Dump til angrep på Northug"
            src="../resources/trump.jpg"
            alt="Trump og Northug jr."
            href="#"
          />
        </div>
        <div className="row justify-content-center">
          <SmallNews
            title="Trump Dump til angrep på Northug"
            src="../resources/northug.jpg"
            alt="Trump og Northug jr."
            href="#"
          />
          <MedNews
            title="Trump Dump til angrep på Northug"
            src="../resources/trump.jpg"
            alt="Trump og Northug jr."
            href="#"
          />
        </div>
        <div className="row justify-content-center">
          <BigNews
            title="Trump Dump til angrep på Northug"
            src="../resources/northug.jpg"
            alt="Trump og Northug jr."
            href="#"
          />
        </div>
        <Footer />
      </div>
    );
  }
}
