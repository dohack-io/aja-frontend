import React, { Component } from 'react';
import "./About.css";
import MainLayout from "../Components/MainLayout";

export default class About extends Component {
  render() {
    return (
      <MainLayout>
        <p className="about__description">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
        <div className="about__featuresBox">
          <h3>Features</h3>
          <p className="about__feature">feature 1</p>
          <p className="about__feature">feature 2</p>
          <p className="about__feature">feature 3</p>
          <p className="about__feature">feature 4</p>
        </div>
      </MainLayout>

    )
  }
}
