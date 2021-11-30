import React from "react";
import UsersTable from "../data/usersTable.json";
import FriendsTable from "../data/friendsTable.json";
import RequestListTable from "../data/requestListTable.json";
import "../stylesheets/searchBox.css";
class SearchBox extends React.Component {
  loginEmail = "msd@gmail.com";
  state = {
    searchResults: [],
    searchQuery: "",
  };

  // friendship Status
  // 0 - friend request sent
  // 1 - friend
  // -1 - not friend

  updateSearchResults = () => {
    let newUsersTable = UsersTable.filter((user) => {
      return user.name
        .toLowerCase()
        .includes(this.state.searchQuery.toLowerCase());
    });
    newUsersTable = newUsersTable.map((user) => {
      let newUser = { ...user };
      newUser.friendshipStatus = -1;
      for (let u of RequestListTable) {
        if (u.toEmail === user.email) {
          newUser.friendshipStatus = 0;
          break;
        }
      }

      for (let u of FriendsTable) {
        if (u.friendEmail === user.email) {
          newUser.friendshipStatus = 1;
          break;
        }
      }

      return newUser;
    });

    let newState = { ...this.state };
    if (this.state.searchQuery === "") newState.searchResults = [];
    else newState.searchResults = newUsersTable;
    if (newState.searchResults.length === 0 && !(this.state.searchQuery === ""))
      newState.searchResults = [
        {
          email: null,
          name: "No Result found",
          latitude: null,
          longitude: null,
          occupation: null,
        },
      ];
    this.setState(newState);
  };

  render() {
    return (
      <div className="SearchBoxMainDiv">
        <input
          type="text"
          className="SEInput"
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
        <div className="SEResultsDiv">
          {this.state.searchResults.map((user) => {
            let index = this.state.searchResults.indexOf(user);
            return (
              <div key={index} className="SESearchResult">
                <p>{user.name}</p>
                {user.email && user.friendshipStatus === -1 && (
                  <button className="SEAddFriendButton">Add Friend</button>
                )}
                {user.email && user.friendshipStatus === 0 && (
                  <button className="SEFriendRequestSent">
                    Friend Request Sent
                  </button>
                )}
                {user.email && user.friendshipStatus === 1 && (
                  <button className="SEFriends">Friends</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchBox;
