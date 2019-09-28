import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import MainLayout from "../Components/MainLayout";

export default class Home extends Component {
    render() {
        return (
            <MainLayout>
                <div className="homepage__headerImg"></div>
                <div className="homepage__welcome">
                    <h1>Welcome to Aja's Garden</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <Link to="/signup" className="homepage__getStarted">Get started</Link>
                </div>
            </MainLayout>
        )
    }
}
