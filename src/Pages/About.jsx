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
          <h5 className="about__feature">Join your city</h5>
          <h5 className="about__feature">Take care of a garden</h5>
          <h5 className="about__feature">Be part of the community</h5>
          <h5 className="about__feature">Increase everyones quality of live</h5>
        </div>
      </MainLayout>

    )
  }
}
