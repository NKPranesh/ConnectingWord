import React from "react";
import setData from "../calc/setData";
import "../stylesheets/searchBox.css";

class SearchBox extends React.Component {
  state = {
    searchResults: [],
    searchQuery: "",
    setDataFlag: false,
    UsersTable: null,
    FriendsTable: null,
    RequestListTable: null,
    userEmail: null,
    loadingDisplay: true,
  };

  // friendship Status
  // 0 - friend request sent
  // 1 - friend
  // -1 - not friend

  addFriendHandle = async (reqEmail) => {
    await fetch("https://connectingworld-api.cyclic.app/add-friend", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        reqEmail: reqEmail,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.updateSearchResults(reqEmail);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  updateSearchResults = (reqEmail) => {
    let UsersTable = this.state.UsersTable;
    let FriendsTable = this.state.FriendsTable;
    let RequestListTable = this.state.RequestListTable;
    let userEmail = this.state.userEmail;
    if (this.state.setDataFlag === false) {
      setData().then((data) => {
        let newState = { ...this.state };

        UsersTable = data.usersList;
        FriendsTable = data.friendsList;
        RequestListTable = data.requestList;
        userEmail = data.userEmail;

        newState.UsersTable = data.usersList;
        newState.FriendsTable = data.friendsList;
        newState.RequestListTable = data.requestList;
        newState.userEmail = data.userEmail;

        newState.setDataFlag = true;
        newState.loadingDisplay = false;

        this.setState(newState);

        let newUsersTable = UsersTable.filter((user) => {
          if (user.email === userEmail) return false;
          return user.name
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase());
        });
        newUsersTable = newUsersTable.map((user) => {
          let newUser = { ...user };
          newUser.friendshipStatus = -1;
          if (newUser.email === reqEmail) newUser.friendshipStatus = 0;
          for (let u of RequestListTable) {
            if (u.fromEmail === userEmail && u.toEmail === user.email) {
              newUser.friendshipStatus = 0;
              break;
            }
          }

          for (let u of FriendsTable) {
            if (u.email === userEmail && u.friendEmail === user.email) {
              newUser.friendshipStatus = 1;
              break;
            }
          }

          return newUser;
        });

        newState = { ...this.state };
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
    } else {
      let newUsersTable = UsersTable.filter((user) => {
        if (user.email === userEmail) return false;
        return user.name
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase());
      });
      newUsersTable = newUsersTable.map((user) => {
        let newUser = { ...user };
        newUser.friendshipStatus = -1;
        if (newUser.email === reqEmail) newUser.friendshipStatus = 0;
        for (let u of RequestListTable) {
          if (u.fromEmail === userEmail && u.toEmail === user.email) {
            newUser.friendshipStatus = 0;
            break;
          }
        }

        for (let u of FriendsTable) {
          if (u.email === userEmail && u.friendEmail === user.email) {
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
    }
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
              this.updateSearchResults("");
            }, 1);
          }}
        />
        <div className="SEResultsDiv">
          {this.state.loadingDisplay === true &&
          !(this.state.searchQuery === "") ? (
            <div className="SESearchResult SELoadingMainDiv">
              <div className="Loading"></div>
            </div>
          ) : (
            this.state.searchResults.map((user) => {
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
                      onClick={() => {
                        this.addFriendHandle(user.email);
                      }}
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
            })
          )}
        </div>
      </div>
    );
  }
}

export default SearchBox;
