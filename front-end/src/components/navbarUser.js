import React from "react";
import Logo from "../media/Logo.svg";
import LogoWithoutText from "../media/LogoWithoutText.svg";
import SearchBox from "./searchBox";
import MenuImg from "../media/menu.svg";
import Loading from "./loading";
import RequestListBox from "./requestListBox";
import MapStats from "./mapStats";
import { Link } from "react-router-dom";
import "../stylesheets/navbarUser.css";
class NavbarUser extends React.Component {
  state = {
    requestListDisplay: false,
    requestListDisplayMobile: false,
    peopleNearYouDisplayMobile: false,
    getInTouchDisplayMobile: false,
    menuDisplay: null,
    logoutLoadingDisplay: false,
  };

  menuDisplayHandle = () => {
    let newState = { ...this.state };
    if (newState.menuDisplay === null) newState.menuDisplay = true;
    else newState.menuDisplay = !newState.menuDisplay;
    this.setState(newState);
  };

  getList = async () => {
    let data = [];
    await fetch("https://connectingworld-api.cyclic.app/user-request-list", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        data = responseJson;
      })
      .catch((error) => {
        console.log("error");
      });
    return data;
  };

  handleRequestListDisplay = () => {
    let newState = { ...this.state };
    newState.requestListDisplay = !this.state.requestListDisplay;
    this.setState(newState);
  };

  handleRequestListDisplayMobile = () => {
    let newState = { ...this.state };
    newState.requestListDisplayMobile = !this.state.requestListDisplayMobile;
    this.setState(newState);
  };

  peopleNearYouDisplayMobile = () => {
    let newState = { ...this.state };
    newState.peopleNearYouDisplayMobile =
      !this.state.peopleNearYouDisplayMobile;
    this.setState(newState);
  };

  getInTouchDisplayMobile = () => {
    let newState = { ...this.state };
    newState.getInTouchDisplayMobile = !this.state.getInTouchDisplayMobile;
    this.setState(newState);
  };

  logoutButtonHandle = async () => {
    let newState = { ...this.state };
    newState.logoutLoadingDisplay = true;
    this.setState(newState);

    await fetch("https://connectingworld-api.cyclic.app/logout", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let newState = { ...this.state };
        newState.logoutLoadingDisplay = false;
        this.setState(newState);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="NavbarUserDiv">
          <div className="NULogoDiv">
            <Link to="/">
              {window.innerWidth > 400 ? (
                <img src={Logo} alt="Logo" className="NULogo" />
              ) : (
                <img src={LogoWithoutText} alt="Logo" className="NULogo" />
              )}
            </Link>
          </div>
          <div className="NUSearchDiv">
            <SearchBox />
          </div>
          <div className="NUButtonsDiv">
            <button
              className={
                this.state.requestListDisplay
                  ? "NURequestListButton button active"
                  : "NURequestListButton button"
              }
              onClick={this.handleRequestListDisplay}
            >
              Request List
            </button>
            <RequestListBox
              isDisplay={this.state.requestListDisplay}
              getList={this.getList}
              mobile={false}
            />
            <button
              className="NULogoutButton button"
              onClick={this.logoutButtonHandle}
            >
              Logout
            </button>
          </div>
          <div className="MenuDiv">
            <a
              className={
                this.state.menuDisplay === true
                  ? "MenuOpen Menu NUMenu"
                  : "MenuClose Menu NUMenu"
              }
              onClick={this.menuDisplayHandle}
            >
              <img src={MenuImg} alt="Menu" />
            </a>
          </div>
        </div>
        <div
          className={
            this.state.menuDisplay
              ? "NUMenuItemsDiv NUMenuItemsDivOpen"
              : this.state.menuDisplay === null
              ? "NUMenuItemsInitial"
              : "NUMenuItemsDiv NUMenuItemsDivClose"
          }
        >
          <span
            className={
              this.state.requestListDisplay
                ? "NURequestListItem NUItem active"
                : "NURequestListItem NUItem"
            }
            onClick={this.handleRequestListDisplayMobile}
          >
            Request List
          </span>
          <span className="NUItem" onClick={this.peopleNearYouDisplayMobile}>
            People Near You
          </span>
          <span className="NUItem" onClick={this.getInTouchDisplayMobile}>
            Get In Touch
          </span>
          <span
            className="NULogoutItem NUItem"
            onClick={this.logoutButtonHandle}
          >
            Logout
          </span>
        </div>
        {this.state.requestListDisplayMobile && (
          <RequestListBox
            isDisplay={this.state.requestListDisplayMobile}
            getList={this.getList}
            mobile={true}
            closeBox={this.handleRequestListDisplayMobile}
          />
        )}
        {(this.state.peopleNearYouDisplayMobile === true ||
          this.state.getInTouchDisplayMobile === true) && (
          <MapStats
            mobile={true}
            PNYStatus={this.state.peopleNearYouDisplayMobile}
            PNYClose={this.peopleNearYouDisplayMobile}
            GITStatus={this.state.getInTouchDisplayMobile}
            GITClose={this.getInTouchDisplayMobile}
          />
        )}
        {this.state.logoutLoadingDisplay && <Loading />}
      </React.Fragment>
    );
  }
}

export default NavbarUser;
