import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
  }
  render(){
    return(
      <>
        <Route exact path="/" render = {(routeProps)=> <Home/>}/>
        <Route exact path="/user/profile" render = {(routeProps)=> <Profile/>}/>
      </>
    )
  }
}
export default App;
