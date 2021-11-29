import React from "react";
import NavbarUser from "../components/navbarUser";
import Map from "../components/map";
import "../stylesheets/UserPage.css";

class UserPage extends React.Component {
  render() {
    return (
      <div className="UserPageDiv">
        <NavbarUser />
        <div
          className="UPMapBox"
          style={{
            height: "calc(100vh - 60px)",
            width: "100vw",
            position: "relative",
            marginTop: "5px",
          }}
        >
          <Map />
        </div>
      </div>
    );
  }
}

export default UserPage;
