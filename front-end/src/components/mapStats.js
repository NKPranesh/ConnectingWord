import React from "react";
import GITSearchBox from "./gITSearchBox";
import LocateUser from "./locateUser";
import PNYlist from "../calc/PNYfunc";
import GITlist from "../calc/GITfunc";
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
    distance: null,
    LocationFlag: false,
    EmailNodesUserTableFlag: false,
  };

  userEmail = null;
  userTable = [];
  nodes = [];
  getEmailNNodesNUserTable = async () => {
    await fetch("https://connectingworld-api.cyclic.app/friends-list", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        this.nodes = responseJson.nodes;
        this.userEmail = responseJson.userEmail;
        await fetch("https://connectingworld-api.cyclic.app/usertable", {
          method: "get",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((responseJson) => {
            this.userTable = responseJson;
            let newState = { ...this.state };
            newState.EmailNodesUserTableFlag = true;
            this.setState(newState);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillMount() {
    this.getEmailNNodesNUserTable();
  }

  toRadians = (degrees) => {
    var pi = Math.PI;
    return degrees * (pi / 180);
  };

  calculateDistance = (destLatitide, destLongitude) => {
    let lon1 = this.toRadians(this.state.longitude);
    let lon2 = this.toRadians(destLongitude);
    let lat1 = this.toRadians(this.state.latitude);
    let lat2 = this.toRadians(destLatitide);

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    return c * r;
  };

  gITSearchedDataHandle = (e) => {
    let newState = { ...this.state };
    newState.GITSearchedData = e;
    newState.GITPathsData = GITlist(
      this.userEmail,
      newState.GITSearchedData.email,
      this.nodes,
      this.userTable
    );
    newState.distance = this.calculateDistance(e.latitude, e.longitude);
    this.setState(newState);
  };

  locationHandle = (latitude, longitude) => {
    let newState = { ...this.state };
    newState.latitude = latitude;
    newState.longitude = longitude;
    newState.LocationFlag = true;
    this.setState(newState);
  };

  getPNYDiv = (isMobile) => {
    return (
      <div className="MSPNYDiv">
        <div className="MSPNYLocationDiv">
          <p className="MSPNYLocationLabel">
            <span className="RLMobHeading">Your Location</span>
            {isMobile === true && (
              <span className="RLMobCloseButton" onClick={this.props.PNYClose}>
                &#10006;
              </span>
            )}
          </p>
          <div
            style={
              window.innerWidth > 768
                ? {
                    height: "220px",
                    width: "100%",
                    paddingBottom: "10px",
                  }
                : {
                    height: "150px",
                    width: "100%",
                    paddingBottom: "10px",
                  }
            }
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
            {this.state.LocationFlag === false ||
            this.state.EmailNodesUserTableFlag === false ? (
              <div className="PNYLoadingDiv">
                <div className="Loading"></div>
              </div>
            ) : (
              PNYlist(
                this.state.latitude,
                this.state.longitude,
                this.userEmail,
                this.nodes,
                this.userTable
              ).map((user) => {
                let index = user.email;
                return (
                  <div key={index} className="MSPNYListItemDiv">
                    <p className="MSPNYName">{user.name}</p>
                    <p className="MSPNYEmail">Email: {user.email}</p>
                    <p className="MSPNYLatitudeLongitude">
                      Latitude: {parseFloat(user.latitude).toFixed(4)}{" "}
                      &emsp;&emsp; Longitude:{" "}
                      {parseFloat(user.longitude).toFixed(4)}
                    </p>
                    <p className="MSPNYDistance">
                      Occupation: {user.occupation}{" "}
                    </p>
                    <p className="MSPNYDistance">
                      Distance: {parseFloat(user.distance.toFixed(2))} Km
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  };

  getGITDiv = (isMobile) => {
    // let pathcount=0;
    return (
      <div className="MSGITDiv">
        {this.state.EmailNodesUserTableFlag === false ? (
          <div className="PNYLoadingDiv">
            <div className="Loading"></div>
          </div>
        ) : (
          <React.Fragment>
            <div className={isMobile === true ? "GITMobileHeader" : ""}>
              <GITSearchBox
                sendSearchData={{ GITDataHandle: this.gITSearchedDataHandle }}
                nodesData={this.nodes}
                userEmail={this.userEmail}
              />
              {isMobile === true && (
                <span
                  className="RLMobCloseButton"
                  onClick={this.props.GITClose}
                >
                  &#10006;
                </span>
              )}
            </div>
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
                    Latitude:{" "}
                    {parseFloat(this.state.GITSearchedData.latitude).toFixed(4)}{" "}
                    &emsp;&emsp; Longitude:{" "}
                    {parseFloat(this.state.GITSearchedData.longitude).toFixed(
                      4
                    )}
                  </p>
                  <p className="MSGITDistance">
                    Occupation: {this.state.GITSearchedData.occupation}
                  </p>
                  <p className="MSGITDistance">
                    Distance: {parseFloat(this.state.distance.toFixed(2))} Km
                  </p>
                </div>
                <div className="MSGITPathsDiv">
                  <p className="MSGITPathsLabel">Possible Paths</p>
                  <div className="MSGITPathListDiv">
                    {this.state.GITPathsData.map((path) => {
                      console.log(this.state.GITPathsData);
                      let index = this.state.GITPathsData.indexOf(path);
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
          </React.Fragment>
        )}
      </div>
    );
  };

  render() {
    if (this.props.mobile === true) {
      if (this.props.PNYStatus === true)
        return (
          <div className="PNYMobileOuterDiv">
            <div className="PNYMobile"> {this.getPNYDiv(true)}</div>
          </div>
        );
      else
        return (
          <div className="GITMobileOuterDiv">
            <div className="GITMobile">{this.getGITDiv(true)}</div>
          </div>
        );
    } else
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
          {this.state.PNYDisplay && this.getPNYDiv(false)}
          {this.state.GITDisplay && this.getGITDiv(false)}
        </div>
      );
  }
}

export default MapStats;
