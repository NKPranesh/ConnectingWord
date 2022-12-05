import React, { useEffect } from "react";
import NavbarUser from "../components/navbarUser";
import Map from "../components/map";
import { useNavigate } from "react-router-dom";
import "../stylesheets/UserPage.css";

const UserPage = () => {
  const navigate = useNavigate();

  const authenticate = async () => {
    let isAuthenticated = false;

    await fetch("https://connectingworld-api.cyclic.app/authenticate", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if ("status" in responseJson) {
          isAuthenticated = true;
          navigate("/userpage");
        }
      })
      .catch((error) => {
        console.log("error");
        isAuthenticated = false;
        navigate("/login");
      });

    return isAuthenticated;
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <div className="UserPageDiv">
      <NavbarUser />
      <div
        className="UPMapBox"
        style={
          window.innerWidth > 768
            ? {
                height: "calc(100vh - 60px)",
                width: "100vw",
                position: "relative",
                marginTop: "5px",
              }
            : {
                height: "calc(100vh - 60px)",
                width: "100vw",
                position: "relative",
                marginTop: "55px",
              }
        }
      >
        <Map />
      </div>
    </div>
  );
};

export default UserPage;
