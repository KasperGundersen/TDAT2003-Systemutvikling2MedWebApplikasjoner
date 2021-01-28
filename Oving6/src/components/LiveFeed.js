import React, { Component } from "react";
import "../styles/LiveFeed.css";

export default class LiveFeed extends Component {
  render() {
    return (
      <section id="breaking-news">
        <div>
          <div class="sitewidth">
            <div class="br-title">SISTE NYHETER</div>
            <marquee>
              <ul className="great-news">
                <li>
                  <a href="#">helloooo..... </a>
                </li>
                <li>
                  <a href="#">this is bangladesh</a>
                </li>
                <li>
                  <a href="#">bangladesh play well</a>
                </li>
                <li>
                  <a href="#">helloooo..... </a>
                </li>
                <li>
                  <a href="#">this is bangladesh</a>
                </li>
                <li>
                  <a href="#">bangladesh play well</a>
                </li>
              </ul>
            </marquee>
          </div>
        </div>
      </section>
    );
  }
}
