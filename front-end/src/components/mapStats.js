import React from "react";
import GITSearchBox from "./gITSearchBox";
import LocateUser from "./locateUser";
import PNYlist from "../calc/PNYfunc";
import GITlist from "../calc/GITfunc";
//import GetInTouchImg from "../media/GetInTouch.svg";
import "../stylesheets/mapStats.css";

class MapStats extends React.Component {
  state = {
    PNYDisplay: true,
    GITDisplay: false,
    latitude: null,
    longitude: null,
    PNYData: [
      {
        name: "Mahesh",
        email: "mahesh@gmail.com",
        latitude: 17.34,
        longitude: 78.34,
        distance: 200,
      },
      {
        name: "Pranesh",
        email: "mahesh@gmail.com",
        latitude: 17.34,
        longitude: 78.34,
        distance: 200,
      },
    ],
    GITSearchedData: null,
    GITPathsData: [
      ["MSD", "Teja", "Varun", "Mahesh"],
      ["MSD", "Vamshi", "Virat", "Rohit", "Mahesh"],
    ],
  };
  gITSearchedDataHandle = (e) => {
    let newState = { ...this.state };
    newState.GITSearchedData = e;
    newState.GITPathsData=GITlist("pranesh@gmail.com",newState.GITSearchedData.email);
    this.setState(newState);
  };

  locationHandle = (latitude, longitude) => {
    let newState = { ...this.state };
    newState.latitude = latitude;
    newState.longitude = longitude;
    this.setState(newState);
  };

  getPNYDiv = () => {
    return (
      <div className="MSPNYDiv">
        <div className="MSPNYLocationDiv">
          <p className="MSPNYLocationLabel">Your Location</p>
          <div
            style={{
              height: "220px",
              width: "100%",
              paddingBottom: "10px",
            }}
          >
            <LocateUser
              locate={{ latitudeLongitudeUpdate: this.locationHandle }}
            />
          </div>
          <div className="MSPNYLocationResultDiv">
            <span>Latitude: {parseFloat(this.state.latitude).toFixed(4)}</span>
            <span>
              Longitude: {parseFloat(this.state.longitude).toFixed(4)}
            </span>
          </div>
        </div>
        <div className="MSPNYResultDiv">
          <p className="MSPNYResultLabel">People</p>
          <div className="MSPNYListDiv">
            {PNYlist(this.state.latitude,this.state.longitude,"pranesh@gmail.com").map((user) => {
              let index = user.email;
              return (
                <div key={index} className="MSPNYListItemDiv">
                  <p className="MSPNYName">{user.name}</p>
                  <p className="MSPNYEmail">Email: {user.email}</p>
                  <p className="MSPNYLatitudeLongitude">
                    Latitude: {user.latitude} &emsp;&emsp; Longitude:{" "}
                    {user.longitude}
                  </p>
                  <p className="MSPNYDistance">Occupation: {user.occupation} </p>
                  <p className="MSPNYDistance">Distance: {parseFloat(user.distance.toFixed(2))} Km</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  getGITDiv = () => {
    // let pathcount=0;
    return (
      <div className="MSGITDiv">
        <GITSearchBox
          sendSearchData={{ GITDataHandle: this.gITSearchedDataHandle }}
        />
        {this.state.GITSearchedData === null ? (
          <div className="MSGITNoSearch">
            <p>Search for the person to get in touch.</p>
          </div>
        ) : (
          <React.Fragment>
            <div className="MSGITSearchInfoDiv">
              <p className="MSGITName">{this.state.GITSearchedData.name}</p>
              <p className="MSGITEmail">
                Email: {this.state.GITSearchedData.email}
              </p>
              <p className="MSGITLatitudeLongitude">
                Latitude: {this.state.GITSearchedData.latitude} &emsp;&emsp;
                Longitude: {this.state.GITSearchedData.longitude}
              </p>
               <p className="MSGITDistance">
                Occupation: {this.state.GITSearchedData.occupation}
              </p>
              <p className="MSGITDistance">
                Distance: {this.state.GITSearchedData.distance}
              </p>
            </div>
            <div className="MSGITPathsDiv">
              <p className="MSGITPathsLabel">Possible Paths</p>
              <div className="MSGITPathListDiv">
                {this.state.GITPathsData.map((path) => {
                  let index=this.state.GITPathsData.indexOf(path);
                  return (
                    <div className="MSGITPathDiv" key={index}>
                      <p className="MSGITPathNo">Path: {index}</p>
                      <p className="MSGITPath">
                        {path.map((node) => {
                          let i = path.indexOf(node) + 1;
                          let returnValue =
                            i === path.length ? node : node + " --> ";
                          return <span key={i}>{returnValue}</span>;
                        })}
                      </p>
                      <p className="MSGITPathLength">
                        Path Length: {path.length - 1}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="MapStatsMainDiv">
        <div className="MSButtonsDiv">
          <button
            className={
              this.state.PNYDisplay ? "MSPNYButton active" : "MSPNYButton"
            }
            onClick={() => {
              let newState = { ...this.state };
              newState.PNYDisplay = true;
              newState.GITDisplay = false;
              this.setState(newState);
            }}
          >
            People Near You
          </button>
          <button
            className={
              this.state.GITDisplay ? "MSGITButton active" : "MSGITButton"
            }
            onClick={() => {
              let newState = { ...this.state };
              newState.PNYDisplay = false;
              newState.GITDisplay = true;
              this.setState(newState);
            }}
          >
            Get In Touch
          </button>
        </div>
        {this.state.PNYDisplay && this.getPNYDiv()}
        {this.state.GITDisplay && this.getGITDiv()}
      </div>
    );
  }
}

export default MapStats;
