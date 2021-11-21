import React from "react";
import "../stylesheets/loginBox.css";

class LoginBox extends React.Component {
  render() {
    return (
      <div className="LoginBoxDiv">
        <div className="LBHeadDiv">Login</div>
        <div className="LBBodyDiv">
          <div className="LBEmailDiv">
            <label className="LBEmailLabel" for="LBEmailInput">
              Enter your email
            </label>
            <input className="LBEmailInput LBInput" type="email" />
          </div>
          <div className="LBPasswordDiv">
            <label className="LBPasswordLabel" for="LBPasswordInput">
              Password
            </label>
            <input className="LBPasswordInput LBInput" type="password" />
          </div>
          <div className="LBLoginButtonDiv">
            <button className="LBLoginButton">Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginBox;
