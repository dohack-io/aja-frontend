import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import About from "./Pages/About";

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
  }
  render(){
    return(
      <>
        <Route exact path="/" render = {(routeProps)=> <Home/>}/>
        <Route exact path="/about" render = {()=> <About/>}/>
        <Route exact path="/signup" render ={()=><SignUp/>}/>
        <Route exact path="/login" render = {()=><Login/>}/>
        <Route exact path="/user/profile" render = {(routeProps)=> <Profile/>}/>

      </>
    )
  }
}
export default App;
