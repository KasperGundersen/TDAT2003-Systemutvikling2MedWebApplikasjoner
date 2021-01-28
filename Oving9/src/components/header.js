import * as React from 'react';
import {Link } from 'react-router-dom';
import jQuery from "jquery";

function Header(){
    return(
        <nav class="navbar navbar-expand-md navbar-light bg-light">
  <a class="navbar-brand" href="#">Øving 9</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link" href="#/students">Students</a>
      <a class="nav-item nav-link" href="#/courses">Courses</a>
    </div>
  </div>
</nav>
    )
}

export default Header;