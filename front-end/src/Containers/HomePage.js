import React from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import HomePage1 from "../media/HomePage1.svg";
import HomePage2 from "../media/HomePage2.svg";
import HomePage3 from "../media/HomePage3.svg";
import "../stylesheets/HomePage.css";
class HomePage extends React.Component {
  render() {
    return (
      <div className="HPMainDiv">
        <Navbar parent={{ login: false, signup: false }} />
        <div className="HPParent">
          <div className="HPPart1">
            <div className="HPBody1">
              <div className="HPHeading">CONNECTING WORLD</div>
              <div className="Hptext">
                This is an online platform which helps you to get to know about
                your circle and helps you to contact them.
              </div>
              <Link to="/signup">
                <button className="HPButton">Get Started</button>
              </Link>
            </div>
            <div className="HPImg1">
              <img src={HomePage1} alt="img" />
            </div>
          </div>
          <div className="HPPart2">
            <div className="HPImg2">
              <img src={HomePage2} alt="img" />
            </div>
            <div className="HPBody2">
              <div className="HPHeading2">
                Find people in your circle near to your location.
              </div>
              <div className="Hptext2">
                This website helps to capture your location and help you to find
                people near you whom you can contact later.
              </div>
            </div>
          </div>
          <div className="HPPart3">
            <div className="HPBody1">
              <div className="HPHeading3">
                Want to find a Heart surgeon in your circle?
              </div>
              <div className="Hptext3">
                You can find out the occupation of people in your circle and get
                to know the possible ways to contact.
              </div>
            </div>
            <div className="HPImg3">
              <img src={HomePage3} alt="img" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
