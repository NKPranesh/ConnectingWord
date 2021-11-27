import React from 'react';
import "../stylesheets/signupBox.css";
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
                 <br/>
                <input className="SBLocationInput SBInput" type="text" />
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
