import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './SignUp.css';
import MainLayout from "../Components/MainLayout";
import AuthService from "../Components/AuthService";

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: ''};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password=this.state.password;
    this.service.login(email,password)
    .then( response => {
      console.log(response)
        this.setState({ 
                        email:"",
                        password: ""
                      });
        this.props.history.push('/user/profile')
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  
  render() {
    return (
        <MainLayout>
        <div className="signupForm">
          <h3>Log in</h3>
          <form className="signupForm__input" onSubmit={this.handleFormSubmit}>

            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
            
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
            
            <button className="submitBtn" type="submit">Log in</button>
        </form>

        <p>Don't have an account? 
            <Link to={"/signup"} style={{ color: 'rgb(5, 5, 5)', textDecoration:"underline" }}> Sign up</Link>
        </p>
        </div>
        </MainLayout>
    )
  }
}
