import React, { Component } from 'react';
import "./GardenDetails.css";
import MainLayout from "../Components/MainLayout";
import {Link} from 'react-router-dom';

import User from "../Utils/User";
const user = new User();


export default class GardenDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gardenID: this.props.match.params.id,
      garden: [],
      error: null,

    }
  }

  componentDidMount() {
    user.getSingleGarden(this.state.gardenID)
      .then(res => {
        this.setState({garden: res.data});
        console.log(res)
      })
      .catch((error)=>{
        this.setState({error: error.message})
      })
  }


  render() {
    return (
      <MainLayout>
        <h2>Garden Eden</h2>
        <div className="details__box">
          <div className="details__image image__one"></div>
          <div className="details__image image__two"></div>
          <div className="details__image image__three"></div>
          <div className="details__image add__image"><i class="far fa-plus-square fa-3x"></i></div>
        </div>
        <div className="details__box details__info">
          <h3><span>{this.state.garden.team_id}</span> is currently taking care of this garden.</h3>
        </div>
        <div className="details__box">
          <div className="details__comments">
            <p className="comment__text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et xD</p>
            <div className="comment__info">
              <p>Username</p>
              <p>12 hours ago</p>
              <Link to ="#"><p><i class="fas fa-reply"></i> reply</p></Link>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }
}


