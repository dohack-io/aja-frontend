import React, { Component } from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/" className="navbar__link"><i class="fab fa-pagelines fa-2x"></i></Link>
        <div>
          <i class="fas fa-bars fa-2x"></i>
          
          <div className="navbar__linkContainer">
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/signup" className="navbar__link">SignUp</Link>
            <Link to="/about" className="navbar__link">About</Link>
          </div>
          
        </div>
      </div>
    )
  }
}
