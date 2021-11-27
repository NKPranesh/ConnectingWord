import React from "react";
import Logo from "../media/Logo.svg";
import "../stylesheets/navbarUser.css";
class NavbarUser extends React.Component {
  render() {
    return (
      <div className="NavbarUserDiv">
        <div className="NULogoDiv">
          <img src={Logo} alt="img" />
        </div>
        <div className="NUSearchDiv">
          <input type="text" placeholder="&#128269; Search" />
        </div>
        <div className="NUButtonsDiv">
          <button className="NURequestListButton button">Request List</button>
          <button className="NULogoutButton button">Logout</button>
        </div>
      </div>
    );
  }
}

export default NavbarUser;
