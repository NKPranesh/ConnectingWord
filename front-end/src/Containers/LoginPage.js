import React from "react";
import Navbar from "../components/navbar";
import LoginBox from "../components/loginBox";
import LoginPageImg from "../media/LoginPageImg.svg";
import "../stylesheets/LoginPage.css";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Navbar parent={{ login: true, signup: false }} />
        <div className="LPBody">
          <img src={LoginPageImg} alt="img" />
          <LoginBox />
        </div>
      </div>
    );
  }
}

export default LoginPage;
