import React from "react";
import Logo from "../media/Logo.svg";
import SearchBox from "./searchBox";
import RequestListBox from "./requestListBox";
import "../stylesheets/navbarUser.css";
class NavbarUser extends React.Component {
  state = {
    requestListDisplay: false,
  };

  handleRequestListDisplay = () => {
    let newState = { ...this.state };
    newState.requestListDisplay = !this.state.requestListDisplay;
    this.setState(newState);
  };

  render() {
    return (
      <div className="NavbarUserDiv">
        <div className="NULogoDiv">
          <img src={Logo} alt="img" />
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
          <RequestListBox isDisplay={this.state.requestListDisplay} />
          <button className="NULogoutButton button">Logout</button>
        </div>
      </div>
    );
  }
}

export default NavbarUser;
