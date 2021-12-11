import React from "react";
import UsersData from "../data/usersTable.json";
import "../stylesheets/gITSearchBox.css";
import PNYlist from "../calc/PNYfunc";
class GITSearchBox extends React.Component {
  state = {
    searchResults: [],
    searchQuery: "",
    dist :null
  };
  updateSearchResults = () => {
    let newState = { ...this.state };
    newState.searchResults = UsersData.filter((user) => {
      return user.name
        .toLowerCase()
        .includes(this.state.searchQuery.toLowerCase());
    });
    newState.dist=PNYlist(this.state.searchResults.latitude,this.state.searchResults.longitude,"pranesh@gmail.com");
    if (this.state.searchQuery === "") newState.searchResults = [];
    this.setState(newState);
  };
  //let dist=PNYlist(this.state.searchResults.latitude,this.state.searchResults.longitude,"pranesh@gmail.com");
  render() {
    return (
      <div className="GITSBMainDiv">
        <input
          type="text"
          className="GITSBInput"
          placeholder="&#128269; Search"
          onChange={(e) => {
            let newState = { ...this.state };
            newState.searchQuery = e.target.value.trim();
            this.setState(newState);
            setTimeout(() => {
              this.updateSearchResults();
            }, 1);
          }}
        />
        <div className="GITSBResultsDiv">
          {this.state.searchResults.map((user) => {
            let index = this.state.searchResults.indexOf(user);
            return (
              <div
                key={index}
                className="GITSBSearchResult"
                onClick={() => {
                  this.props.sendSearchData.GITDataHandle({
                    name: user.name,
                    email: user.email,
                    latitude: user.latitude,
                    longitude: user.longitude,
                    occupation :user.occupation,
                    distance: this.state.dist,
                    //PNYlist(user.latitude,user.longitude,"pranesh@gmail.com"), //-------------------------------------------------------------
                  });
                  let newState = { ...this.state };
                  newState.searchQuery = "";
                  this.setState(newState);
                  setTimeout(() => {
                    this.updateSearchResults();
                  }, 1);
                }}
              >
                <p>
                  {user.name}
                  <br />
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Email: {user.email}
                  </p>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GITSearchBox;