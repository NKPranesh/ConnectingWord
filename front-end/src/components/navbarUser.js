import React from "react";
import Logo from "../media/Logo.svg";
import SearchBox from "./searchBox";
import RequestListBox from "./requestListBox";
import { Link } from "react-router-dom";
import "../stylesheets/navbarUser.css";
class NavbarUser extends React.Component {
  state = {
    requestListDisplay: false,
  };

  getList = async () => {
    let data = [];
    await fetch("/user-request-list", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        data = responseJson;
      })
      .catch((error) => {
        console.log("error");
      });
    return data;
  };

  handleRequestListDisplay = async () => {
    let newState = { ...this.state };
    newState.requestListDisplay = !this.state.requestListDisplay;
    this.setState(newState);
  };

  logoutButtonHandle = async () => {
    await fetch("/logout", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="NavbarUserDiv">
        <div className="NULogoDiv">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="NUSearchDiv">
          <SearchBox />
        </div>
        <div className="NUButtonsDiv">
          <button
            className={
              this.state.requestListDisplay
                ? "NURequestListButton button active"
                : "NURequestListButton button"
            }
            onClick={this.handleRequestListDisplay}
          >
            Request List
          </button>
          <RequestListBox
            isDisplay={this.state.requestListDisplay}
            getList={this.getList}
          />
          <button
            className="NULogoutButton button"
            onClick={this.logoutButtonHandle}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default NavbarUser;
