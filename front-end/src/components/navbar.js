import React from "react";
import Logo from "../media/Logo.svg";
import { Link } from "react-router-dom";
import MenuImg from "../media/menu.svg";
import "../stylesheets/navbar.css";

class Navbar extends React.Component {
  state = {
    login: this.props.parent.login,
    signup: this.props.parent.signup,
    menuDisplay: null,
  };

  menuDisplayHandle = () => {
    let newState = { ...this.state };
    if (newState.menuDisplay === null) newState.menuDisplay = true;
    else newState.menuDisplay = !newState.menuDisplay;
    this.setState(newState);
  };

  render() {
    return (
      <React.Fragment>
        <div className="NavbarDiv">
          <div className="LogoDiv">
            <Link to="/" className="LogoLink">
              <img src={Logo} alt="Logo" />
            </Link>
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
          <div className="MenuDiv">
            <a
              className={
                this.state.menuDisplay === true
                  ? "MenuOpen Menu"
                  : "MenuClose Menu"
              }
              onClick={this.menuDisplayHandle}
            >
              <img src={MenuImg} alt="Menu" />
            </a>
          </div>
        </div>
        <div
          className={
            this.state.menuDisplay
              ? "MenuItemsDiv MenuItemsDivOpen"
              : this.state.menuDisplay === null
              ? "MenuItemsInitial"
              : "MenuItemsDiv MenuItemsDivClose"
          }
        >
          <Link
            to="/login"
            className={
              this.state.login ? "loginItem Item itemActive" : "loginItem Item"
            }
          >
            <a>Login</a>
          </Link>
          <Link
            to="/signup"
            className={
              this.state.signup
                ? "signupItem Item itemActive"
                : "signupItem Item"
            }
          >
            <a>Sign Up</a>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
