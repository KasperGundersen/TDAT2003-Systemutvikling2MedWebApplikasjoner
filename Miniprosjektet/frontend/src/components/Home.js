//@flow

import React, { Component } from "react";
import "../styles/stylesheet.css";
import Navbar from "./Navbar.js";
import LiveFeed from "./LiveFeed";
import Footer from "./Footer.js";
import Eventer from "./Eventer.js";
import "../styles/Home.css";

type Props = {
  match: { params: { id: number } }
};

export default class Home extends Component<Props,{}> {
  render() {
    return (
      <div className="home-container bg-light">
        <Navbar />
        <LiveFeed />
        <Eventer kategori={this.props.match.params.id}/>
        <Footer />
      </div>
    );
  }
}
