import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";

export default class GardenInfo extends PureComponent {
  render() {
    const {id} = this.props;
    return (
      <div>
        <Link to={`/garden/${id}`}>Go to Garden</Link>
      </div>
    );
  }
}
