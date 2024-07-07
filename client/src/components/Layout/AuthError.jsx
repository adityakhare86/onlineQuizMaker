import React from "react";

const AuthError = (props) => {
  return (
    <div className="row mt-4">
      <div className="col-sm-4 offset-sm-4">
        <span
          className="input-label"
          style={{
            color: "",
          }}
        >
          {props.text}
        </span>
      </div>
    </div>
  );
};

export default AuthError;
