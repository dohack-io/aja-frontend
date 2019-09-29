import React, { Component } from 'react';
import "./GardenDetails.css";
import MainLayout from "../Components/MainLayout";
import {Link} from 'react-router-dom';
import axios from 'axios';
import User from "../Utils/User";
import {timeFormat} from "../Utils/method";

const user = new User();


export default class GardenDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      gardenID: this.props.match.params.id,
      garden: [],
      posts: null,
      error: null,
      text:""
    };
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API}`});
    this.service=service;
    this.timeFormat=timeFormat.bind(this);
  }

  componentDidMount() {
    user.getSingleGarden(this.state.gardenID)
      .then(res => {
        this.service.get(`/garden/${this.state.gardenID}/posts`)
        .then(response =>{
          let allPosts=response.data;
          let now = new Date();
          let eachPost= allPosts.map((post) => {
              post.time=this.timeFormat(new Date(post.created_at), now)
              return post
            })
          this.setState({garden: res.data, posts:eachPost});
          }) 
      .catch((error)=>{
        this.setState({error: error.message})
      })
  })}

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
    this.service.post(`/user/${this.state.user.user.id}/garden/${this.state.gardenID}/posts`, {text})
    .then(response=>{
        this.props.history.push(`/garden/${response.data.garden_id}`)
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
    let eachPost=null;
    if(this.state.posts){
      let allPosts=this.state.posts;
      eachPost=allPosts.map((post)=>{
        return(
          <div className="details__posts">
              <p className="post__text">{post.text}</p>
              <div className="post__info">
                <p className="post__time">{post.time}</p>
                {/* <Link to ="#"><p><i class="fas fa-reply"></i> reply</p></Link> */}
              </div>
          </div>
        )
      })
    }
    return (
      <MainLayout>
        <h4 className="details__owner"><span className="details__teamName">{(this.state.garden.team) ? this.state.garden.team.name : "No one"}</span> is currently taking care of this garden. </h4> 
        <div className="details__box">
          <div className="details__image image__one"></div>
          <div className="details__image image__two"></div>
          <div className="details__image image__three"></div>
          <div className="details__image add__image"><i className="far fa-plus-square fa-3x"></i></div>
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
            <form onSubmit={this.handleFormSubmit}>
                <textarea className="postForm__input" name="text" cols="400" rows="5" placeholder="Write your post..." value={this.state.text} onChange={this.handleChange}></textarea>
                <button className="adoptBtn" type="submit">Post</button>
            </form>

            {(this.state.posts) ? (eachPost): null}
        </div>
        
      </MainLayout>
    )
  }
}


