import React from "react";
import RequestListTable from "../data/requestListTable.json";
import UsersTable from "../data/usersTable.json";
import "../stylesheets/requestListBox.css";
class RequestListBox extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.isDisplay
            ? "RequestListBoxMainDiv Open"
            : "RequestListBoxMainDiv Close"
        }
      >
        {RequestListTable.map((request) => {
          let name = "";
          for (let u of UsersTable) {
            if (u.email === request.toEmail) {
              name = u.name;
            }
          }
          let index = RequestListTable.indexOf(request);
          return (
            <div className="RLRequestDiv" key={index}>
              <div className="RLTextDiv">
                <p className="RLName">{name}</p>
                <p className="RLEmail">{"Email: " + request.toEmail}</p>
              </div>
              <div className="RLButtonsDiv">
                <button className="RLRejectButton">Reject</button>
                <button className="RLAcceptButton">Accept</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default RequestListBox;
