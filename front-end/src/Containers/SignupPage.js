import React from "react";
import Navbar from "../components/navbar";
import SignupPageImg from  "../media/SignupPageImg.svg";
import SignupBox from "../components/signupBox.js"
import "../stylesheets/SignupPage.css";
class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <Navbar parent={{ login: false, signup: true }} />
        <div className="SPBody">
        <img src={SignupPageImg} alt="img" />
        <SignupBox />
        </div>
      </div>
    );
  }
}

export default SignupPage;
