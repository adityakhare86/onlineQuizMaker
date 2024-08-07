import React from "react";
import NavBar from "../Layout/NavBar";
import { Link, Redirect } from "react-router-dom";

const QuizTaken = (props) => {
  const { quiz } = props.location.state;
  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={props.isLoggedIn}
        checkLogin={props.checkLogin}
        onLogout={props.onLogout}
      />
      <div className="quiz-done-page-container">
          <div className="solved-question-container"
            style={{
              fontFamily: `'Lexend Deca', sans-serif`,
              fontSize: "36px",
              color: "var(--quizcraft-light)",
              textAlign: "center",
            }}
          >
            You solved {quiz.solved} out of {quiz.total_questions}.
          </div>
          <div
            className="col-sm-12"
            style={{
              fontFamily: `'Roboto', sans-serif`,
              fontSize: "18px",
              color: "var(--blue-grade5)",
              textAlign: "center",
            }}
          >
            Your response has been successfully submitted.
        </div>
            <Link to="/dashboard">
              <div id="quiz-submit-go-to-dash">
                Go to Dashboard
              </div>
            </Link>
      </div>
    </React.Fragment>
  );
};

export default QuizTaken;
