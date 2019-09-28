import React, { Component } from 'react';
import './MainLayout.css';
import Nav from './Nav';
import Wrapper from './Wrapper';
import Footer from './Footer';


export default class MainLayout extends Component {
  render() {
    return (
      <div className="mainlayout">
        <Nav />
          <Wrapper>
            {this.props.children}
          </Wrapper>
        <Footer />
      </div>
    )
  }
}
