import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./GardenCard.css";

export default class GardenCard extends Component {
    render() {
        return (
            <>
                <div className="gardenCard__image">
                    <Link to={{ pathname: "/garden/" + this.props.garden.id,
                                state: {garden: this.props.garden}}}  className="gardenCard__link" garden={this.props.garden}><h3 className="gardenCard__name">{this.props.garden.team.name}</h3></Link>   
                </div>
                
            </>
        )
    }
}