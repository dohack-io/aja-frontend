import React, { Component } from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li>Register</li>
          <li>About</li>
        </ul>
      </div>
    )
  }
}
