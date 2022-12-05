import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import "../stylesheets/loginBox.css";

const LoginBox = () => {
  const [error, setError] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("none");
  const [loadingDisplay, setLoadingDisplay] = useState(false);
  const navigate = useNavigate();

  let submitButtonHandle = async () => {
    let email = document.getElementsByClassName("LBEmailInput")[0];
    let password = document.getElementsByClassName("LBPasswordInput")[0];

    setLoadingDisplay(true);

    await fetch("https://connectingworld-api.cyclic.app/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if ("error" in responseJson) {
          setErrorDisplay("block");
          setLoadingDisplay(false);
          setError(responseJson.error);
        }
        if ("user" in responseJson) {
          setErrorDisplay("none");
          setError("");
          setLoadingDisplay(false);
          navigate("/userpage");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="LoginBoxDiv">
      <div className="LBHeadDiv">Login</div>
      <div className="LBBodyDiv">
        <div className="LBErrorDiv" style={{ display: errorDisplay }}>
          <p className="LBError">{error}</p>
        </div>
        <div className="LBEmailDiv">
          <label className="LBEmailLabel">Enter your email</label>
          <input className="LBEmailInput LBInput" type="email" />
        </div>
        <div className="LBPasswordDiv">
          <label className="LBPasswordLabel">Password</label>
          <input className="LBPasswordInput LBInput" type="password" />
        </div>
        <div className="LBLoginButtonDiv">
          <button className="LBLoginButton" onClick={submitButtonHandle}>
            Login
          </button>
        </div>
      </div>
      {loadingDisplay && <Loading />}
    </div>
  );
};

export default LoginBox;
