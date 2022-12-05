import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import LoginBox from "../components/loginBox";
import LoginPageImg from "../media/LoginPageImg.svg";
import { useNavigate } from "react-router-dom";
import "../stylesheets/LoginPage.css";

const LoginPage = () => {
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

  return (
    <div className="LPMainDiv">
      <Navbar parent={{ login: true, signup: false }} />
      <div className="LPBody">
        <img src={LoginPageImg} alt="img" />
        <LoginBox />
      </div>
    </div>
  );
};

export default LoginPage;
