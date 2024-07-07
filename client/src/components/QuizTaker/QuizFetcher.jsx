import React, { Component } from "react";
import NavBar from "../Layout/NavBar";
import { Link, Redirect } from "react-router-dom";
import Emoji from "../Layout/Emoji";
import QuizService from "../../service/QuizService";
import QuizHeader from "./QuizHeader";
import ToolTip from "../Dashboard/ToolTip";

class QuizFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizCode: "",
      quiz: null,
      error: false,
    };
  }

  handleQuizCodeInput = (e) => {
    this.setState({ quizCode: e.target.value, error: false });
  };

  handleFindQuiz = () => {
    if (this.state.quizCode.length === 0) {
      this.setState({ error: true });
      return;
    }
    QuizService.findById(this.state.quizCode).then((response) => {
      if (response === false) {
        this.setState({ error: true });
      } else {
        this.setState({ quiz: response });
        this.props.onQuizFetch(response);
      }
    });
  };

  render() {
    if (!this.props.checkLogin()) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.props.isLoggedIn}
          checkLogin={this.props.checkLogin}
          onLogout={this.props.onLogout}
        />
        <div className="quiz-fetcher-container">
            <div className="profile-name" id="enter-quiz-code">Search for a Quiz</div>
            <div className="quiz-fetcher-search-container">
              <div className="small-container">
                <input
                  className="quiz-code-input"
                  type="text"
                  spellCheck="false"
                  placeholder="Enter quiz code"
                  value={this.state.quizCode}
                  onChange={this.handleQuizCodeInput}
                />
                <button className="tool-button" onClick={this.handleFindQuiz}>
                  <Emoji emoji="🔎" /> Find Quiz
                </button>
              </div>
              <div className="fetched-quizzes-list-container">
                {this.state.error && (
                <div id="no-quiz-found">
                  No quiz found, please enter a valid quiz code.
                </div>
              )}
              {!this.state.error && this.state.quiz && (
                <>
                  <QuizHeader
                    title={this.state.quiz.title}
                    description={this.state.quiz.description}
                  />
                  <div className="tooltip-wrapper">
                    <Link to="/quiz-taker">
                      <button className="tool-button">
                        <Emoji emoji="⚔️" /> Proceed To Battle
                      </button>
                    </Link>
                  </div>
                </>
              )}
              </div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}

export default QuizFetcher;
