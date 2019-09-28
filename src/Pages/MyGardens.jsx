import React, { Component } from 'react';
import './MyGardens.css';
import GardenCard from "../Components/GardenCard";
import MainLayout from "../Components/MainLayout";

export default class MyGardens extends Component {
  render() {
    return (
      <MainLayout>
        <div className="myGardens">
          <GardenCard/>
          <GardenCard/>
          <GardenCard/>
        </div>
      </MainLayout>
    )
  }
}
