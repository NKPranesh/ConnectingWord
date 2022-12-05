import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import SignupPageImg from "../media/SignupPageImg.svg";
import SignupBox from "../components/signupBox.js";
import { useNavigate } from "react-router-dom";
import "../stylesheets/SignupPage.css";
import LocateUser from "../components/locateUser";

const SignupPage = () => {
  const [mapDisplay, setMapDisplay] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitudeInput, setLatitudeInput] = useState(null);
  const [longitudeInput, setLongitudeInput] = useState(null);

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
      });

    return isAuthenticated;
  };

  useEffect(() => {
    authenticate();
  }, []);

  let mapDisplayHandle = (latInput, longInput) => {
    setMapDisplay(!mapDisplay);
    setLatitudeInput(latInput);
    setLongitudeInput(longInput);
  };
  let setLatitudeLongitude = (lat, long) => {
    setLatitude(lat);
    setLongitude(long);
    latitudeInput.value = lat;
    longitudeInput.value = long;
  };

  return (
    <div>
      <Navbar parent={{ login: false, signup: true }} />
      <div className="SPBody">
        {mapDisplay === false && (
          <img className="SPImg" src={SignupPageImg} alt="img" />
        )}
        {mapDisplay === true && (
          <div
            className="SPMapBox"
            style={{
              height: "370px",
              width: "600px",
            }}
          >
            <LocateUser
              locate={{ latitudeLongitudeUpdate: setLatitudeLongitude }}
            />
          </div>
        )}
        <SignupBox
          mapDisplay={{ mapDisplayHandle: mapDisplayHandle }}
          location={{
            displayLatitude: latitude,
            displayLongitude: longitude,
          }}
        />
      </div>
    </div>
  );
};

export default SignupPage;
