import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./GardenCard.css";

export default class GardenCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          garden: this.props.garden,
          error: null
        }
      }

    render() {
        return (
            <>
                <div className="gardenCard__image">
                    <Link   garden={this.state.garden}
                            to={{ pathname: "/garden/" + this.state.garden.id,
                                state: {garden: this.state.garden}}}  className="gardenCard__link"><h3 className="gardenCard__name">{this.state.garden.team.name}</h3></Link>   
                </div>
                
            </>
        )
    }
}

