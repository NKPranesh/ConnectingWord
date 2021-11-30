import React from 'react';
import "../stylesheets/signupBox.css";
import LocationSvg from "../media/LocationSvg.svg";
class SignupBox extends React.Component {
  render(){
    return (
      <div className="SBsignupBox">
        <div className="SBHeadDiv">
            Sign Up
        </div>
        <div className="SBBodyDiv">
            <div className="SBNameDiv">
                <label className="SBNameLabel" for="SBNameInput">
                    Name
                </label>
                <br/>
                <input className="SBNameInput SBInput" type="text" />
            </div>
            <div className="SBLocationDiv">
                <label className="SBLocationLabel" for="SBLocationInput">
                    Location
                </label>
                <img className="SBLocationImg" src={LocationSvg} alt="img" onClick={this.props.mapDisplay.mapDisplayHandle} />
                 <br/>
            </div>
            <div className="SBPassword">
            <div className="SBPassword1Div">
                <label className="SBPassword1Label" for="SBPassword1Input">
                    Latitude
                </label>
                 <br/>
                <input className="SBPassword1Input SBInputpassword" type="number" value={this.props.location.displayLatitude}/>
            </div>
            <div className="SBPassword2Div">
                <label className="SBPassword2Label" for="SBPassword2Input">
                    Longitude
                </label>
                 <br/>
                <input className="SBPassword2Input SBInputpassword" type="number" value={this.props.location.displayLongitude}/>
            </div>
            </div>
            <div className="SBEmailDiv">
                <label className="SBEmailLabel" for="SBEmailInput">
                    Email
                </label>
                 <br/>
                <input className="SBEmailInput SBInput" type="email" />
            </div>
            <div className="SBPassword">
            <div className="SBPassword1Div">
                <label className="SBPassword1Label" for="SBPassword1Input">
                    Password
                </label>
                 <br/>
                <input className="SBPassword1Input SBInputpassword" type="password" />
            </div>
            <div className="SBPassword2Div">
                <label className="SBPassword2Label" for="SBPassword2Input">
                    Confirm Password
                </label>
                 <br/>
                <input className="SBPassword2Input SBInputpassword" type="password" />
            </div>
            </div>
            <div className="SBSignupButtonDiv">
            <button className="SBSignupButton">Signup</button>
            </div>
        </div>
      </div>
    );
  }
}

export default SignupBox;
