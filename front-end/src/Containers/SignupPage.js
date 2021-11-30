import React from "react";
import Navbar from "../components/navbar";
import SignupPageImg from  "../media/SignupPageImg.svg";
import SignupBox from "../components/signupBox.js"
import "../stylesheets/SignupPage.css";
import LocateUser from "../components/locateUser";
class SignupPage extends React.Component {
  state={
    mapDisplay : false,
    latitude :null,
    longitude : null,

  }
  mapDisplayHandle=()=>{
    let newState={...this.state}
    newState.mapDisplay=!this.state.mapDisplay
    this.setState(newState)
  }
  setLatitudeLongitude=(latitude,longitude)=>{
    let newState={...this.state}
    newState.latitude=latitude
    newState.longitude=longitude
    this.setState(newState)
  }
  render() {
    return (
      <div>
        <Navbar parent={{ login: false, signup: true }} />
        <div className="SPBody">
          {this.state.mapDisplay===false &&  <img className="SPImg" src={SignupPageImg} alt="img" />}
          {this.state.mapDisplay===true && <div className="SPMapBox"
          style={{
            height: "370px",
            width: "600px",
          }}>
              <LocateUser locate={{latitudeLongitudeUpdate : this.setLatitudeLongitude}}/>
            </div>}
        <SignupBox mapDisplay={{mapDisplayHandle : this.mapDisplayHandle}} 
        location={{displayLatitude : this.state.latitude,displayLongitude :this.state.longitude}}/>
        </div>
      </div>
    );
  }
}

export default SignupPage;
