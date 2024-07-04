import React from "react";
import Icon from "./Icon";

const Logo = () => {
  return (
    <React.Fragment>
      <Icon size="40px" />
      <span
        style={{
          fontFamily: `'Lexend Deca', sans-serif`,
          fontSize: "24px",
          color: "var(--quizcraft-light)",
          display: "inline-block",
          verticalAlign: "middle",
          paddingLeft: "8px",
        }}
      >
        QuizCraft
      </span>
    </React.Fragment>
  );
};

export default Logo;
