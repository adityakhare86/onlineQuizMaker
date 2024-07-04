import React from "react";
import QuizCraftLogo from "../../assets/logo.png";

const Icon = (props) => {
  return (
    <React.Fragment>
      <img
        src={QuizCraftLogo}
        style={{
          width: props.size,
        }}
        alt="QuizCraft Logo"
      />
    </React.Fragment>
  );
};

export default Icon;
