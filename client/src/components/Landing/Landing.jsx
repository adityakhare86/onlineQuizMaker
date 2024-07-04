import React from "react";
import Icon from "../Layout/Icon";
import NavBar from "../Layout/NavBar";

const Landing = (props) => {
  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={props.isLoggedIn}
        checkLogin={props.checkLogin}
        onLogout={props.onLogout}
      />
      <div className="container-fluid bg">
        <div className="" style={{ textAlign: "center", marginTop: "10vh" }}>
          <Icon size="240px" />
        </div>
        <div className="jumbo">A Simplistic Quiz Builder</div>
        <div className=" jumbo-subtitle">
          Create and take quizzes, share with people,
          <br />
          analyze statistics in a convenient way.
        </div>
        <div className="mt-5" style={{ textAlign: "center" }}>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Landing;
