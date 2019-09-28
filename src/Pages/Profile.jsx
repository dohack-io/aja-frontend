import React, { Component } from 'react';
import {Link} from "react-router-dom";
import MainLayout from "../Components/MainLayout";

export default class Profile extends Component {
    render() {
        return (
            <MainLayout>
                <div className="profilePage">
                    <div className="profilePage__settings">
                        <Link to="/user/setting"><i class="fas fa-cog"></i> Setting</Link>
                    </div>
                    <div className="profilePage__mygardens">
                        <Link to="/user/mygardens"><i class="fab fa-pagelines"></i> My Gardens</Link>
                    </div>
                    <div className="profilePage__followed">
                        <Link to="/user/followed"><i class="fas fa-portrait"></i> Followed</Link>
                    </div>
                </div>
            </MainLayout>
        )
    }
}
