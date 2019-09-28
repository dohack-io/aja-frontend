import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import About from "./Pages/About";
import MyGardens from "./Pages/MyGardens";
import Setting from "./Pages/Setting";
import Followed from "./Pages/FollowedGardens";
import GardenDetails from "./Pages/GardenDetails";

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    console.log(process.env)
  }
  render(){
    return(
      <>
        <Route exact path="/" render = {(routeProps)=> <Home/>}/>
        <Route exact path="/about" render = {()=> <About/>}/>
        <Route exact path="/signup" render ={(routeProps)=><SignUp {...routeProps}/>}/>
        <Route exact path="/login" render = {(routeProps)=><Login {...routeProps}/>}/>
        <Route exact path="/user/profile" render = {(routeProps)=> <Profile/>}/>
        <Route exact path="/user/setting" render = {(routeProps)=> <Setting/>}/>
        <Route exact path="/user/mygardens" render = {(routeProps)=> <MyGardens/>}/>
        <Route exact path="/user/followed" render = {(routeProps)=> <Followed/>}/>
        <Route exact path="/user/followed/:id" render = {(routeProps) => <GardenDetails />} />
      </>
    )
  }
}
export default App;
