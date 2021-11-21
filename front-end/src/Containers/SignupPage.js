import React from "react";
import Navbar from "../components/navbar";

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <Navbar parent={{ login: false, signup: true }} />
      </div>
    );
  }
}

export default SignupPage;
