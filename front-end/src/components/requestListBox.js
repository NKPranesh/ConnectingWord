import React from "react";
import "../stylesheets/requestListBox.css";
class RequestListBox extends React.Component {
  state = {
    RequestListTable: [],
    display: true,
  };

  handleAccept = async (reqEmail) => {
    await fetch("https://connectingworld-api.herokuapp.com/accept-request", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        reqEmail: reqEmail,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("good");
      })
      .catch((error) => {
        console.log(error);
      });
    this.handleReject(reqEmail);
  };

  handleReject = async (reqEmail) => {
    await fetch("https://connectingworld-api.herokuapp.com/reject-request", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        reqEmail: reqEmail,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setData = async () => {
    this.props.getList().then((responseJson) => {
      let newState = { ...this.state };
      newState.RequestListTable = responseJson;
      newState.display = responseJson.length === 0 ? false : true;
      this.setState(newState);
    });
  };

  componentWillMount() {
    this.setData();
  }
  render() {
    return (
      <div
        className={
          this.props.isDisplay
            ? "RequestListBoxMainDiv Open"
            : "RequestListBoxMainDiv Close"
        }
      >
        {this.state.display ? (
          this.state.RequestListTable.map((request) => {
            let index = this.state.RequestListTable.indexOf(request);
            return (
              <div className="RLRequestDiv" key={index}>
                <div className="RLTextDiv">
                  <p className="RLName">{request.name}</p>
                  <p className="RLEmail">{"Email: " + request.email}</p>
                </div>
                <div className="RLButtonsDiv">
                  <button
                    className="RLRejectButton"
                    onClick={() => {
                      this.handleReject(request.email);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="RLAcceptButton"
                    onClick={() => {
                      this.handleAccept(request.email);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="RLRequestDiv">
            <div className="RLTextDiv">
              <p className="RLName">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; You have no Friend Requests.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RequestListBox;
