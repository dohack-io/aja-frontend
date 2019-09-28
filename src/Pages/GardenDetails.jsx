import React, { Component } from 'react';
import "./GardenDetails.css";
import MainLayout from "../Components/MainLayout";

import User from "../Utils/User";
const user = new User();


export default class GardenDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gardenID: this.props.location.state.garden.id,
      garden: [],
      error: null,

    }
  }

  componentDidMount() {
    debugger
    user.getSingleGarden(this.state.gardenID)
      .then(res => {
        this.setState({garden: res.data})
      })
      .catch((error)=>{
        this.setState({error: error.message})
      })
  }


  render() {
    return (
      <MainLayout>
        <div>
          
        </div>
        <p>{this.state.garden.id}</p>
      </MainLayout>
    )
  }
}


