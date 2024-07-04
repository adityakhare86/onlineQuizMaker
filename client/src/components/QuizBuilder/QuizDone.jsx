import React, { useState } from "react";
import NavBar from "../Layout/NavBar";
import { Link } from "react-router-dom";

const QuizDone = (props) => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.location.state.quiz_id).then(() => {
      setCopySuccess("Quiz ID copied to clipboard!");
      setTimeout(() => setCopySuccess(""), 2000); // Hide the message after 1 second
    });
  };

  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={props.isLoggedIn}
        checkLogin={props.checkLogin}
        onLogout={props.onLogout}
      />
      <div className="container fluid">
        <div className="row">
          <div
            className="col-sm-12"
            style={{
              fontFamily: `'Lexend Deca', sans-serif`,
              fontSize: "36px",
              color: "var(--quizcraft-light)",
              marginTop: "30vh",
              textAlign: "center",
            }}
          >
            Your quiz has been created.
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-12"
            style={{
              fontFamily: `'Roboto', sans-serif`,
              fontSize: "18px",
              color: "var(--quizcraft-light-purple)",
              textAlign: "center",
            }}
          >
            Copy the Quiz ID and share.
          </div>
        </div>
        <div className="row mt-5">
          <div
            className="col-sm-12"
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: `'Lexend Deca', sans-serif`,
                fontSize: "22px",
                color: "var(--quizcraft-deep-purple)",
                padding: "1.4em",
                border: "2px solid var(--quizcraft-dark-purple)",
                borderRadius: "12px",
                margin: "auto",
                width: "fit-content",
                backgroundColor: "var(--quizcraft-light)",
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={copyToClipboard}
            >
              {props.location.state.quiz_id}{" "}
              <span role="img" aria-label="magnet">
                🧲
              </span>
            </div>
          </div>
        </div>
        {copySuccess && (
          <div className="row mt-2">
            <div
              className="col-sm-12"
              style={{
                fontFamily: `'Roboto', sans-serif`,
                fontSize: "14px",
                color: "black",
                backgroundColor: "white",
                textAlign: "center",
                padding: "0.5em",
                borderRadius: "8px",
                maxWidth: "300px",
                margin: "0 auto",
              }}
            >
              {copySuccess}
            </div>
          </div>
        )}
        <div className="row">
          <div
            className="col-sm-12 mt-5"
            style={{
              textAlign: "center",
            }}
          >
            <Link to="/dashboard">
              <span className="back-to-home ">
                <span role="img" aria-label="man-walking">
                  🚶
                </span>{" "}
                Go to Dashboard
              </span>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizDone;
