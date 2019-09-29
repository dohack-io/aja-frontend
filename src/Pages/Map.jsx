import React, { Component } from "react";
import "./Home.css";
import MainLayout from "../Components/MainLayout";
import axios from "axios";
import GardenInfo from "../Components/GardenInfo";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const settings = {
  dragPan: true
};

class Map extends Component {
  _isUpdated = false;

  constructor(props) {
    super(props);
    this.state = {
      popups: [],
      viewport: {},
      gardens: null
    };
    this.displayLocationInfo = this.displayLocationInfo.bind(this);
  }

  _onInteractionStateChange = interactionState =>
    this.setState({ interactionState });

  _onViewportStateChange = viewport => this.setState({ viewport: {...viewport} });

  displayLocationInfo(position) {
    this._isUpdated = true;
    this.setState({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      viewport: {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      }
    });
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }
  }

  componentDidUpdate() {
    if (this._isUpdated && !this._isUpdating) {
      this._isUpdating = true;
      axios
        .post(`${process.env.REACT_APP_API}/gardens/search`, {
          longitude: this.state.viewport.longitude,
          latitude: this.state.viewport.latitude,
          radius: 5
        })
        .then(response => {
          this._isUpdated = false;
          this._isUpdating = false;
          this.setState({ gardens: response.data });
        })
        .catch(error => {
          this._isUpdating = false;
        });
    }
  }

  render() {
    if (this.state.gardens) {
      //console.log(this.state);

      let allGardens = this.state.gardens;
      const { popups, viewport } = this.state;
      let eachGarden = allGardens.map((garden, index) => {
        return (
          <>
            <Marker
              key={garden.id}
              latitude={garden.latitude}
              longitude={garden.longitude}
              offsetLeft={-15}
              offsetTop={-30}
            >
              <img
                className="location_icon"
                src="/images/location.png"
                alt=""
                onClick={() => {
                  let popups = this.state.popups;
                  popups.push({ id: garden.id });
                  this.setState({ popups });
                }}
              />
            </Marker>
            {popups.find(popup => popup.id === garden.id) && (
              <Popup
                tipSize={5}
                anchor="top"
                key={`popup-${garden.id}`}
                longitude={garden.longitude}
                latitude={garden.latitude}
                closeOnClick={false}
                onClose={() => {
                  let popups = this.state.popups;
                  popups = popups.filter(popup => popup.id !== garden.id);
                  this.setState({ popups });
                }}
              >
                <GardenInfo id={garden.id} key={`info-${garden.id}`}/>
              </Popup>
            )}
          </>
        );
      });
      return (
        <MainLayout>
          <h1>Gardens around you</h1>

          <div className="map">
            <ReactMapGL
              {...settings}
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
              onViewportChange={this._onViewportStateChange}
              onInteractionStateChange={this._onInteractionStateChange}
              width={1200}
              height={600}
              mapStyle="mapbox://styles/mapbox/navigation-preview-day-v2"
              zoom={13}
            >
              <Marker
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              offsetLeft={-15}
              offsetTop={-30}
            >
              <i class="fas fa-circle"></i>
            </Marker>
              {eachGarden}
            </ReactMapGL>
          </div>
        </MainLayout>
      );
    } else {
      return (
        <p>Loading...</p>
      );
    }
  }
}

// export default GoogleApiWrapper({
//     apiKey: process.env.REACT_APP_MAP_TOKEN
//   })(Home);

export default Map;
