import React, { Component } from 'react';
import "./GardenDetails.css";
import MainLayout from "../Components/MainLayout";
import {Link} from 'react-router-dom';
import axios from 'axios';
import User from "../Utils/User";
const user = new User();


export default class GardenDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      gardenID: this.props.match.params.id,
      garden: [],
      error: null,
      text:""
    };
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API}`});
    this.service=service;
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

  adoptGarden (gardenId){
    axios({
        method:"POST",
        baseURL:`${process.env.REACT_APP_API}/user/${this.state.user.user.id}/garden/${gardenId}`
    })   
    .then(()=>{
        this.props.history.push('/user/mygardens');
    })
    .catch(err=>{
        console.log(err)
    })
  }

  deleteGarden (gardenId){
    axios({
        method:"DELETE",
        baseURL:`${process.env.REACT_APP_API}/user/${this.state.user.user.id}/garden/${gardenId}`
    })   
    .then(()=>{
        this.props.history.push('/user/mygardens');
    })
    .catch(err=>{
        console.log(err)
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const text = this.state.text;
    this.service.post(`/user/${this.state.user.user.id}/garden/${this.state.gardenID}/comment`, {text})
    .then(response=>{
        this.props.history.push(`/garden/${this.state.gardenID}`)
    })
    .catch(err =>{
        console.log(err)
    })
  }
  
  handleChange = (event) => {  
  const {name, value} = event.target;
  this.setState({[name]: value});
  }

  render() {
    return (
      <MainLayout>
        <h4 className="details__owner"><span className="details__teamName">{(this.state.garden.team) ? this.state.garden.team.name : "No one"}</span> is currently taking care of this garden. </h4> 
        <div className="details__box">
          <div className="details__image image__one"></div>
          <div className="details__image image__two"></div>
          <div className="details__image image__three"></div>
          <div className="details__image add__image"><i class="far fa-plus-square fa-3x"></i></div>
        </div>
        <div className="details__box details__info">
          
          <h4>Size: <span>{this.state.garden.size}</span> m²</h4>
          {(this.state.garden.team)?
          <button className="adoptBtn" onClick={()=>{this.deleteGarden(this.state.gardenID)}}  type="submit">Abandon garden</button>
          :
          <button className="adoptBtn" onClick={()=>{this.adoptGarden(this.state.gardenID)}}  type="submit">Adopt garden</button>
        }
        </div>

        <div className="details__box">
          <div className="comment">
            <form onSubmit={this.handleFormSubmit}>
                <textarea className="comment__input" name="text" cols="40" rows="5" placeholder="Write your comment..." value={this.state.text} onChange={this.handleChange}></textarea>
                <button style={{marginTop:"10px"}} type="submit">Share</button>
            </form>
          </div>
          <div className="details__comments">
            <p className="comment__text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et xD</p>
            <div className="comment__info">
              <p>Username</p>
              <p>12 hours ago</p>
              <Link to ="#"><p><i class="fas fa-reply"></i> reply</p></Link>
            </div>
          </div>
          <div className="details__comments">
            <p className="comment__text">sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et xD</p>
            <div className="comment__info">
              <p>Username</p>
              <p>18 hours ago</p>
              <Link to ="#"><p><i class="fas fa-reply"></i> reply</p></Link>
            </div>
          </div>
          <div className="details__comments">
            <p className="comment__text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <div className="comment__info">
              <p>Username</p>
              <p>21 hours ago</p>
              <Link to ="#"><p><i class="fas fa-reply"></i> reply</p></Link>
            </div>
          </div>
          <div className="details__comments">
            <p className="comment__text">Lorem ipsum dolor sit amet.</p>
            <div className="comment__info">
              <p>Username</p>
              <p>23 hours ago</p>
              <Link to ="#"><p><i class="fas fa-reply"></i> reply</p></Link>
            </div>
          </div>
        </div>
        
      </MainLayout>
    )
  }
}


