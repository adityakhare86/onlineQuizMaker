import React from "react";

const AuthError = (props) => {
  return (
    <span
      className="input-label"
      id="looks-like-mistake-text"
    >
      {props.text}
    </span>
  );
};

export default AuthError;
