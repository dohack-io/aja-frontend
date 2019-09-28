import React, { Component } from 'react';
import './SignUp.css';
import {Link} from "react-router-dom";
import MainLayout from "../Components/MainLayout";

export default class SignUp extends Component {
  render() {
    return (
      <MainLayout>
        <div className="signupForm">
          <h3>Sign up</h3>
        </div>
      </MainLayout>
    )
  }
}
