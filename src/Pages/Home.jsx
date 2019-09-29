import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import MainLayout from "../Components/MainLayout";
import axios from "axios";
import GardenInfo from "../Components/GardenInfo";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const settings = {
  dragPan: true
};

class Home extends Component {
  _isUpdated = false;

  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
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
    if (this.state.user && this.state.gardens) {
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
              {eachGarden}
            </ReactMapGL>
          </div>
        </MainLayout>
      );
    } else {
      return (
        <MainLayout>
            <div className="homepage__headerImg">
              <div className="homepage__welcome">
                <h1>Welcome to Aja</h1>
                <p>
                  We make cities greener and bring the neighborhood together. With
                  Aja everyone can take care of a small pice of land and transform
                  a brown and boring parcel into a blooming garden. You can browse
                  open gardening areas on our map after logging in.
                </p>
                <Link to="/signup" className="homepage__getStarted">
                  {"Sign up"}
                </Link>
                <Link to="/login" className="homepage__getStarted">
                  {"Log in"}
                </Link>
              </div> 
          </div>
        </MainLayout>
      );
    }
  }
}

// export default GoogleApiWrapper({
//     apiKey: process.env.REACT_APP_MAP_TOKEN
//   })(Home);

export default Home;
