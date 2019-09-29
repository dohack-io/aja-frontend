import React, { Component } from 'react';
import "./Comment.css";
import {Link} from 'react-router-dom';

export default class Comment extends Component {
    render() {
        return (
            <div className="details__comments">
                <p className="comment__text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et xD</p>
                <div className="comment__info">
                    <p>Username</p>
                    <p>12 hours ago</p>
                    <Link to ="#"><p><i class="fas fa-reply"></i> reply</p></Link>
                </div>
             </div>
        )
    }
}
