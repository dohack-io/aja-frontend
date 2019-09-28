import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import MainLayout from "../Components/MainLayout";
import axios from "axios";
import GardenInfo from "../Components/GardenInfo";
import ReactMapGL, {Marker,Popup} from 'react-map-gl';
const Gardens= [{
    "id":1,
    "longitude": 7.5236,
    "latitude": 51.5028
},
{    "id":2,
    "longitude": 7.5146,
    "latitude": 51.5093
},
{    "id":3,
    "longitude": 7.5163,
    "latitude": 51.5012
},
{    "id":4,
    "longitude": 7.5261,
    "latitude": 51.5087
},
{    "id":5,
    "longitude": 7.5320,
    "latitude": 51.5016
}
]

class Home extends Component {
    _isUpdated = false;

    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem('user')),
            longitude: null,
            latitude:null,
            showPopup: false,
            gardens:null
        }
        this.displayLocationInfo= this.displayLocationInfo.bind(this)
    }

    displayLocationInfo(position) {
        this._isUpdated=true;
        this.setState({
            longitude : position.coords.longitude,
            latitude : position.coords.latitude,
            gardens: Gardens
        })
    }

    componentDidMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
          }
    }

    componentDidUpdate(){
        if(this._isUpdated){
            axios.post(`${process.env.REACT_APP_API}/gardens/search`,{longitude:this.state.longitude, latitude:this.state.latitude, radius:5})
            .then(response => {
                this._isUpdated=false;
                this.setState({gardens:response.data})
            })
        }
    }


    render() {
        if(this.state.user && this.state.gardens){
            console.log(this.state)

                let allGardens = this.state.gardens;
                let eachGarden = allGardens.map((garden,index)=>{
                const {showPopup} = this.state;
                return(
                    <>
                        <Marker 
                        key={`marker-${index}`}
                        latitude={garden.latitude} 
                        longitude={garden.longitude} 
                        offsetLeft={-20} 
                        offsetTop={-10}
                        >
                        <img className="location_icon" src="/images/location.png" alt="" onClick={() => this.setState({showPopup: true})}/>

                        </Marker>
                        {showPopup && <Popup
                                    tipSize={5}
                                    anchor="top"
                                    longitude={garden.longitude}
                                    latitude={garden.latitude}
                                    closeOnClick={false}
                                    onClose={() => this.setState({showPopup: false})}
                                    >
                                        <GardenInfo id={garden.id} />
                                    </Popup>}
                    </>
                )
                })
                return(
                    <MainLayout>
                        <div className="map">
                            <ReactMapGL
                            mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN} 
                            width={1200}
                            height={600}
                            latitude={this.state.latitude} 
                            longitude={this.state.longitude} 
                            zoom={13}
                            >
                                {eachGarden}
                            </ReactMapGL>
                        </div>
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