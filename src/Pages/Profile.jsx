import React, { Component } from 'react';
import {Link} from "react-router-dom";
import MainLayout from "../Components/MainLayout";

export default class Profile extends Component {
    render() {
        return (
            <MainLayout>
                <div className="profilePage">
                    <div className="settings">
                        <p><i class="fas fa-cog"></i> Setting</p>
                    </div>
                    <div className="mygardens">
                        <p><i class="fab fa-pagelines"></i> My Gardens</p>
                    </div>
                    <div className="followed">
                        <p><i class="fas fa-portrait"></i> Followed</p>
                    </div>
                </div>
            </MainLayout>
        )
    }
}
