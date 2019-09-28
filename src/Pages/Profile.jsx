import React, { Component } from 'react';
import {Link} from "react-router-dom";
import MainLayout from "../Components/MainLayout";
import "./Profile.css";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            error: null
        }
      }

    render() {
        return (
            <MainLayout>
                <div className="profile__box">
                    <div className="profile__userInfo">
                        <h4 className="profile__userName">{this.state.user.user.name}, {this.state.user.user.surname}</h4>
                        <div className="profile__userImage"></div>
                    </div>
                    <div className="profile__links">
                        <Link to="/user/setting" className="profile__link"><i className="fas fa-cog"></i> Setting</Link>
                        <Link to="/user/mygardens" className="profile__link"><i className="fab fa-pagelines"></i> My Gardens</Link>
                        <Link to="/user/followed" className="profile__link"><i className="fas fa-portrait"></i> Followed</Link>
                    </div>

                </div>
            </MainLayout>
        )
    }
}
export default Profile;