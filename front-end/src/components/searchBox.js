import React from "react";
import setData from "../calc/setData";
import "../stylesheets/searchBox.css";

class SearchBox extends React.Component {
  state = {
    searchResults: [],
    searchQuery: "",
  };

  // friendship Status
  // 0 - friend request sent
  // 1 - friend
  // -1 - not friend

  addFriendHandle = () => {};

  updateSearchResults = () => {
    let UsersTable = [];
    let FriendsTable = [];
    let RequestListTable = [];
    let userEmail = null;
    setData().then((data) => {
      UsersTable = data.usersList;
      FriendsTable = data.friendsList;
      RequestListTable = data.requestList;
      userEmail = data.userEmail;

      let newUsersTable = UsersTable.filter((user) => {
        if (user.email === userEmail) return false;
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
      if (
        newState.searchResults.length === 0 &&
        !(this.state.searchQuery === "")
      )
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
    });
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
                {user.email && user.friendshipStatus === -1 && (
                  <button
                    className="SEAddFriendButton"
                    onClick={this.addFriendHandle}
                  >
                    Add Friend
                  </button>
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
