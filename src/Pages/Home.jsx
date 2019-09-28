import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import MainLayout from "../Components/MainLayout";
import axios from "axios";
import ReactMapGL, {Marker,Popup} from 'react-map-gl';
import GardenPin from "../Components/GardenPin";

class Home extends Component {
    _isUpdated = false;

    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem('user')),
            longitude: null,
            latitude:null,
            garden:null,
            showPopup: false
        }
        this.displayLocationInfo= this.displayLocationInfo.bind(this)
    }

    displayLocationInfo(position) {
        this._isUpdated=true;
        this.setState({
            longitude : position.coords.longitude,
            latitude : position.coords.latitude
        })
    }

    componentDidMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
          }
    }

    componentDidUpdate(){
        if(this._isUpdated){
            axios.post(`${process.env.REACT_APP_API}/gardens/search`,{longitude:this.state.longitude, latitude:this.state.latitude})
            .then(response => {
                this._isUpdated=false;
                this.setState({gardens:response.data})
            })
        }
    }

    render() {
        if(this.state.user && this.state.gardens){
                let allGardens = this.state.gardens;
                const {showPopup} = this.state;
                return(
                    <MainLayout>
                      <ReactMapGL
                      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN} 
                      width={800}
                      height={400}
                      latitude={this.state.latitude} 
                      longitude={this.state.longitude} zoom={13}>
                        <Marker latitude={this.state.latitude} 
                                longitude={this.state.longitude} 
                                offsetLeft={-20} 
                                offsetTop={-10}>
                            <GardenPin size={20} onClick={() => this.setState({showPopup: true})} />
                        </Marker>
                            {/* <Marker latitude={this.state.latitude} 
                                    longitude={this.state.longitude} 
                                    offsetLeft={-20} 
                                    offsetTop={-10}
                                    onClick={()=> this.setState({showPopup:true})}
                            >
                                <img className="location_icon" src="/images/location.png" alt=""/>

                            </Marker> */}
                            {showPopup && <Popup
                                latitude={this.state.latitude}
                                longitude={this.state.longitude}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => this.setState({showPopup: false})}
                                anchor="top" >
                                <div>You are here</div>
                                </Popup>}
                        </ReactMapGL>
                    </MainLayout>
                )
        } else {
            return (
                <MainLayout>
                    <div className="homepage">
                        <div className="homepage__headerImg"></div>
                        <div className="homepage__welcome">
                        <h1>Welcome to Aja's Garden</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Link to="/signup" className="homepage__getStarted"> Get started</Link>
                        </div>
                    </div>
                </MainLayout>
            )
        }
        
    }
}

// export default GoogleApiWrapper({
//     apiKey: process.env.REACT_APP_MAP_TOKEN
//   })(Home);
  
export default Home;