import React, { Component } from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';

export default class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showBurger: "none",
      user: JSON.parse(localStorage.getItem('user'))
    }

    this.toggleBurger = this.toggleBurger.bind(this);
  }

  toggleBurger() {
    (this.state.showBurger === "none") 
    ? this.setState({ showBurger: "flex"}) 
    : this.setState({ showBurger: "none"})  
  }

  logoutUser = () =>{
    localStorage.removeItem('user');
    this.setState({ user: null });
    this.props.history.push('/');
  }

  render() {
    if(this.state.user){
      return(
        <>
          <div className="navbar">
            <Link to="/"><i className="fab fa-pagelines fa-2x navbar__icon"></i></Link>
            <div className="navbar__right">
              <Link to="/user/profile" className="navbar__username" >Hello, {this.state.user.user.name}!</Link>
              <i className="fas fa-bars fa-2x navbar__icon" onClick={this.toggleBurger}></i>   
            </div>
          </div>  
          <div className="navbar__burgerBox" style={{display: this.state.showBurger}}>
          <Link to="/user/profile" className="navbar__link">Profile</Link>
            <Link to="/gardenAround" className="navbar__link">Gardens Around</Link>
            <Link to="#" className="navbar__link" onClick={() => this.logoutUser()}>Log out</Link>   
            <Link to="/about" className="navbar__link">About</Link>          
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="navbar">
            <Link to="/" className="navbar__icon"><i className="fab fa-pagelines fa-2x"></i></Link>
            <i className="fas fa-bars fa-2x navbar__icon" onClick={this.toggleBurger}></i>        
          </div>  
          <div className="navbar__burgerBox" style={{display: this.state.showBurger}}>
            <Link to="/gardenAround" className="navbar__link">Gardens Around</Link>
            <Link to="/signup" className="navbar__link">SignUp</Link>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/about" className="navbar__link">About</Link>
          </div>
        </>
      )
    }
  }
}
