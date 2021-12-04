import React from "react";
import UsersData from "../data/usersTable.json";
import "../stylesheets/gITSearchBox.css";

class GITSearchBox extends React.Component {
  state = {
    searchResults: [],
    searchQuery: "",
  };

  updateSearchResults = () => {
    let newState = { ...this.state };
    newState.searchResults = UsersData.filter((user) => {
      return user.name
        .toLowerCase()
        .includes(this.state.searchQuery.toLowerCase());
    });
    if (this.state.searchQuery === "") newState.searchResults = [];
    this.setState(newState);
  };

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
                    distance: "200km", //-------------------------------------------------------------
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
