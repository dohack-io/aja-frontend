import React, { Component } from 'react';
import "./GardenCard.css";

export default class GardenCard extends Component {
    render() {
        return (
            <div className="gardenCard">
                <div className="gardenCard__image"></div>
                <h3 className="gardenCard__name">Garden-name</h3>
            </div>
        )
    }
}
