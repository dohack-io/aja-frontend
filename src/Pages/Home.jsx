import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import MainLayout from "../Components/MainLayout";

class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      user: JSON.parse(localStorage.getItem("user"))
    }
  }

  render() {
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
                {(this.state.user)?
                null
                :
                <>                
                  <Link to="/signup" className="homepage__getStarted">
                    {"Sign up"}
                  </Link>
                  <Link to="/login" className="homepage__getStarted">
                    {"Log in"}
                  </Link>
                </>
                }
              </div> 
          </div>
        </MainLayout>
      );
    }
}

// export default GoogleApiWrapper({
//     apiKey: process.env.REACT_APP_MAP_TOKEN
//   })(Home);

export default Home;
