import React, { Component } from 'react';
import {Link} from "react-router-dom";
import MainLayout from "../Components/MainLayout";

class Profile extends Component {
    render() {
        return (
            <MainLayout>
                <div className="profilePage">
                    <div className="profilePage__settings">
                        <Link to="/user/setting"><i className="fas fa-cog"></i> Setting</Link>
                    </div>
                    <div className="profilePage__mygardens">
                        <Link to="/user/mygardens"><i className="fab fa-pagelines"></i> My Gardens</Link>
                    </div>
                    <div className="profilePage__followed">
                        <Link to="/user/followed"><i className="fas fa-portrait"></i> Followed</Link>
                    </div>
                </div>
            </MainLayout>
        )
    }
}
export default Profile;