import React, { useState } from "react";
import "../stylesheets/signupBox.css";
import { useNavigate } from "react-router-dom";
import LocationSvg from "../media/LocationSvg.svg";
import Loading from "./loading";

const SignupBox = (props) => {
  const [error, setError] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("none");
  const [loadingDisplay, setLoadingDisplay] = useState(false);
  const navigate = useNavigate();

  let submitButtonHandle = async () => {
    let email = document.getElementsByClassName("SBEmailInput")[0];
    let password = document.getElementsByClassName("SBPassword1Input")[0];
    let confirmPassword =
      document.getElementsByClassName("SBPassword2Input")[0];
    let name = document.getElementsByClassName("SBNameInput")[0];
    let latitude = document.getElementsByClassName("SBLatitudeInput")[0];
    let longitude = document.getElementsByClassName("SBLongitudeInput")[0];
    let occupation = document.getElementsByClassName("SBOccupationInput")[0];

    if (password.value !== confirmPassword.value) {
      setErrorDisplay("block");
      setError("Password do not match");
      return;
    }

    setLoadingDisplay(true);

    await fetch("https://connectingworld-api.cyclic.app/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
        latitude: latitude.value,
        longitude: longitude.value,
        occupation: occupation.value,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if ("user" in responseJson) {
          setErrorDisplay("none");
          setError("");
          setLoadingDisplay(false);
          navigate("/userpage");
        } else {
          let errorsArr = Object.values(responseJson.errors);
          for (let i = 0; i < errorsArr.length; i++) {
            if (errorsArr[i] !== "") {
              setErrorDisplay("block");
              setError(errorsArr[i]);
              break;
            }
          }
          setLoadingDisplay(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="SBsignupBox">
      <div className="SBHeadDiv">Sign Up</div>
      <div className="SBBodyDiv">
        <div className="SBErrorDiv" style={{ display: errorDisplay }}>
          <p className="SBError">{error}</p>
        </div>
        <div className="SBNameDiv">
          <label className="SBNameLabel">Name</label>
          <br />
          <input className="SBNameInput SBInput" type="text" />
        </div>
        <div className="SBLocationDiv">
          <label className="SBLocationLabel">Location</label>
          <img
            className="SBLocationImg"
            src={LocationSvg}
            alt="img"
            onClick={() => {
              props.mapDisplay.mapDisplayHandle(
                document.getElementsByClassName("SBLatitudeInput")[0],
                document.getElementsByClassName("SBLongitudeInput")[0]
              );
            }}
          />
          <br />
        </div>
        <div className="SBPassword">
          <div className="SBPassword1Div">
            <label className="SBLatitudeLabel">Latitude</label>
            <br />
            <input className="SBLatitudeInput SBInputpassword" type="number" />
          </div>
          <div className="SBPassword2Div">
            <label className="SBLongitudeLabel">Longitude</label>
            <br />
            <input className="SBLongitudeInput SBInputpassword" type="number" />
          </div>
        </div>
        <div className="SBEmailDiv">
          <label className="SBOccupationLabel">Occupation</label>
          <br />
          <input className="SBOccupationInput SBInput" type="text" />
        </div>
        <div className="SBEmailDiv">
          <label className="SBEmailLabel">Email</label>
          <br />
          <input className="SBEmailInput SBInput" type="email" />
        </div>
        <div className="SBPassword">
          <div className="SBPassword1Div">
            <label className="SBPassword1Label">Password</label>
            <br />
            <input
              className="SBPassword1Input SBInputpassword"
              type="password"
            />
          </div>
          <div className="SBPassword2Div">
            <label className="SBPassword2Label">Confirm Password</label>
            <br />
            <input
              className="SBPassword2Input SBInputpassword"
              type="password"
            />
          </div>
        </div>
        <div className="SBPrivacyPolicy">
          By submitting you agree to our{" "}
          <a
            href="https://www.termsfeed.com/live/ec278a4f-abd4-4c6c-bdfb-0dd13e12a441"
            target="_blank"
            className="PrivacyPolicyLink"
          >
            Privacy Policy
          </a>{" "}
          and consent your information being sent to ConnectingWorld consultant.
        </div>
        <div className="SBSignupButtonDiv">
          <button className="SBSignupButton" onClick={submitButtonHandle}>
            Signup
          </button>
        </div>
      </div>
      {loadingDisplay === true && <Loading />}
    </div>
  );
};

export default SignupBox;
