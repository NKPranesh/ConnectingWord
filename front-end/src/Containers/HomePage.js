import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="button">Sign Up</button>
        </Link>
        <Link to="/userpage">
          <button className="button">User Page</button>
        </Link>
      </div>
    );
  }
}

export default HomePage;
