import React, { Component } from 'react';
import './MyGardens.css';
import GardenCard from "../Components/GardenCard";
import MainLayout from "../Components/MainLayout";

import User from "../Utils/User";
const user = new User();



export default class MyGardens extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      gardens: [],
      error: null
    }
  }
  
  componentDidMount() {
    user.getGardens(this.state.user.user.id)
      .then(res => {
        debugger
        this.setState({gardens: res.data})
      })
      .catch((error)=>{
        this.setState({error: error.message})
      })
  }

  render() {
    return (
      <MainLayout>
        <div className="myGardens">
          {this.state.gardens.map((garden) => 
            <GardenCard garden={garden}/>
          )}
        </div>
      </MainLayout>
    )
  }
}
