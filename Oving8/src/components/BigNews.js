import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BigNews extends Component<{
  title?: string,
  src?: string,
  alt?: string,
  href?: string
}> {
  render() {
    return (
      <div className="col-sm-" style={{ margin: "1rem" }}>
        <Link class="text-body" exact to={this.props.href}>
          <div className="card mx-auto bg-danger border-0" style={{ width: "auto" }}>
            <div>
              <img
                src={this.props.src}
                class="img-fluid"
                alt={this.props.alt}
              />
            </div>
            <div className="card-body">
              <h1 className="text-center">{this.props.title}</h1>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
