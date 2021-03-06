import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import About from "./Pages/About";
import MyGardens from "./Pages/MyGardens";
import GardenDetails from "./Pages/GardenDetails";
import Map from "./Pages/Map";

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
  }
  render(){
    return(
      <>
        <Route exact path="/" render = {(routeProps)=> <Home {...routeProps}/>}/>
        <Route exact path="/about" render = {(routeProps)=> <About {...routeProps}/>}/>
        <Route exact path="/gardenAround" render ={()=> <Map/>}/>
        <Route exact path="/signup" render ={(routeProps)=><SignUp {...routeProps}/>}/>
        <Route exact path="/login" render = {(routeProps)=><Login {...routeProps}/>}/>
        <Route exact path="/user/profile" render = {(routeProps)=> <Profile {...routeProps}/>}/>
        <Route exact path="/user/mygardens" render = {(routeProps)=> <MyGardens {...routeProps}/>}/>
        <Route exact path="/garden/:id" render = {(routeProps) => <GardenDetails {...routeProps} /> } />
      </>
    )
  }
}
export default App;
