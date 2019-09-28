import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import MainLayout from "../Components/MainLayout";
import axios from "axios";

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
        if(this.state.user){
            return(
                <MainLayout>
                    <div className="homepage">
                        <div>
                            Here is the map
                        </div>
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

export default Home;