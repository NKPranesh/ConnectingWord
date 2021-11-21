import React from "react";
import Logo from "../media/Logo.svg";
import { Link } from "react-router-dom";
import "../stylesheets/navbar.css";

class Navbar extends React.Component {
  state = {
    login: this.props.parent.login,
    signup: this.props.parent.signup,
  };
  render() {
    return (
      <div className="NavbarDiv">
        <div className="LogoDiv">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="ButtonsDiv">
          <Link to="/login">
            <button
              className={
                this.state.login
                  ? "loginButton button active"
                  : "loginButton button"
              }
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              className={
                this.state.signup
                  ? "signupButton button active"
                  : "signupButton button"
              }
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
