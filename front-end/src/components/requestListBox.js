import React from "react";
import "../stylesheets/requestListBox.css";
import Loading from "./loading";
class RequestListBox extends React.Component {
  state = {
    RequestListTable: [],
    display: true,
    loadingDisplay: true,
    acceptLoading: false,
    rejectLoading: false,
  };

  handleAccept = async (reqEmail) => {
    await fetch("https://connectingworld-api.cyclic.app/accept-request", {
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
    await fetch("https://connectingworld-api.cyclic.app/reject-request", {
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
      newState.loadingDisplay = false;
      newState.rejectLoading = false;
      newState.acceptLoading = false;
      this.setState(newState);
    });
  };

  componentWillMount() {
    this.setData();
  }
  render() {
    if (this.props.mobile === true)
      return (
        <div className="RLMobOuterDiv">
          <div
            className={
              this.props.isDisplay
                ? "RequestListBoxMobMainDiv MobOpen"
                : "RequestListBoxMobMainDiv MobClose"
            }
          >
            <div className="RLHeadingDiv">
              <span className="RLMobHeading">Request List</span>
              <span className="RLMobCloseButton" onClick={this.props.closeBox}>
                &#10006;
              </span>
            </div>
            {this.state.loadingDisplay === true ? (
              <div className="RLLoadingDiv">
                <div className="Loading"></div>
              </div>
            ) : this.state.display === true ? (
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
                          let newState = { ...this.state };
                          newState.rejectLoading = true;
                          this.setState(newState);
                          this.handleReject(request.email);
                        }}
                      >
                        {window.innerWidth > 400 ? "Reject" : "x"}
                      </button>
                      <button
                        className="RLAcceptButton"
                        onClick={() => {
                          let newState = { ...this.state };
                          newState.acceptLoading = true;
                          this.setState(newState);
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
            {(this.state.acceptLoading === true ||
              this.state.rejectLoading === true) && (
              <div className="RLLoadingDiv">
                <div className="Loading"></div>
              </div>
            )}
          </div>
        </div>
      );
    else
      return (
        <div
          className={
            this.props.isDisplay
              ? "RequestListBoxMainDiv Open"
              : "RequestListBoxMainDiv Close"
          }
        >
          {this.state.loadingDisplay === true ? (
            <div className="RLLoadingDiv">
              <div className="Loading"></div>
            </div>
          ) : this.state.display === true ? (
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
                        let newState = { ...this.state };
                        newState.rejectLoading = true;
                        this.setState(newState);
                        this.handleReject(request.email);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="RLAcceptButton"
                      onClick={() => {
                        let newState = { ...this.state };
                        newState.acceptLoading = true;
                        this.setState(newState);
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
          {(this.state.acceptLoading === true ||
            this.state.rejectLoading === true) && (
            <div className="RLLoadingDiv">
              <div className="Loading"></div>
            </div>
          )}
        </div>
      );
  }
}

export default RequestListBox;
