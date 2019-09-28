import React, {Component} from 'react';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl} from 'react-map-gl';

import GardenPin from '../Components/GardenPin';
import GardenInfo from '../Components/GardenInfo';


const TOKEN = process.env.REACT_APP_MAP_TOKEN; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _renderCityMarker = (city, index) => {
    return (
      <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
        <GardenPin size={20} onClick={() => this.setState({popupInfo: city})} />
      </Marker>
    );
  };

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <GardenInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >

        {this._renderPopup()}

        <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>

      </MapGL>
    );
  }
}

