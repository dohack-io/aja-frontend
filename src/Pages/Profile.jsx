import React, { Component } from 'react';
import {Link} from "react-router-dom";
import MainLayout from "../Components/MainLayout";

export default class Profile extends Component {
    render() {
        return (
            <MainLayout>
                <div className="profilePage">
                    <div className="settings">
                        <Link><i class="fas fa-cog"></i> Setting</Link>
                    </div>
                    <div className="mygardens">
                        <Link><i class="fab fa-pagelines"></i> My Gardens</Link>
                    </div>
                    <div className="followed">
                        <Link><i class="fas fa-portrait"></i> Followed</Link>
                    </div>
                </div>
            </MainLayout>
        )
    }
}
