import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import MainLayout from "../Components/MainLayout";
import axios from "axios";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAP_TOKEN
  });
// import { Map, GoogleApiWrapper } from 'google-maps-react';


class Home extends Component {
    _isUpdated = false;

    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem('user')),
            longitude: null,
            latitude:null
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
        
        

        // let geojson = {
        //     type: 'FeatureCollection',
        //     features: [{
        //       type: 'Feature',
        //       geometry: {
        //         type: 'Point',
        //         coordinates: [-77.032, 38.913]
        //       },
        //       properties: {
        //         title: 'Mapbox',
        //         description: 'Washington, D.C.'
        //       }
        //     },
        //     {
        //       type: 'Feature',
        //       geometry: {
        //         type: 'Point',
        //         coordinates: [-122.414, 37.776]
        //       },
        //       properties: {
        //         title: 'Mapbox',
        //         description: 'San Francisco, California'
        //       }
        //     }]
        //   };
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
                console.log(allGardens)
                // const mapStyles = {
                //     width: '100%',
                //     height: '100%',
                //   };
    
                return(
                    <MainLayout>
                        <Map
                        style="mapbox://styles/mapbox/streets-v9"
                        containerStyle={{
                            height: '50vh',
                            width: '50vw'
                        }}
                        >
                        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                            <Feature coordinates={[this.state.latitude, this.state.longitude]} />
                        </Layer>
                        </Map>                   
                        {/* <Map
                            google={this.props.google}
                            zoom={8}
                            style={mapStyles}
                            initialCenter={{ lat: this.state.latitude, lng: this.state.longitude}}
                        /> */}
                    </MainLayout>
                )
        } else {
            return (
                <MainLayout>
                    <div className="homepage">
                    <div id='map'></div>
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