import React, { Component } from "react";
import NavBar from "../Layout/NavBar";
import { Redirect } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import QuizService from "../../service/QuizService";

class QuizTaker extends Component {
  constructor(props) {
    super(props);
    const { questions } = this.props.quiz;
    const answers = [];
    for (let i = 0; i < questions.length; i++) {
      answers.push({
        question_id: questions[i].id,
        answer: -1,
      });
    }

    this.state = {
      quiz: this.props.quiz,
      user: this.props.user,
      answers: answers,
    };
    sessionStorage.setItem("quiz-attending", this.state.quiz._id);
  }

  componentDidMount() {}

  handleSelectAnswer = (q_id, opt_id) => {
    const { answers } = this.state;
    const index = answers.findIndex((answer) => answer.question_id === q_id);
    answers[index].answer = opt_id;
    this.setState({ answers: [...answers] });
  };

  handleSubmit = () => {
    const user_id = this.state.user._id;
    const quiz_id = this.state.quiz._id;
    const request = {
      user_id: user_id,
      quiz_id: quiz_id,
      answers: [...this.state.answers],
    };
    QuizService.submitAnswer(request).then((response) => {
      if (response === false) {
        console.log("FAILED!");
      } else {
        this.props.history.push({
          pathname: "/quiz-taken",
          state: { quiz: response },
        });
      }
    });
  };

  render() {
    if (!this.props.checkLogin()) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    const { quiz } = this.state;

    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.props.isLoggedIn}
          checkLogin={this.props.checkLogin}
          onLogout={this.props.onLogout}
        />
        <div className="container-fluid" id="take-quiz-container">
          <div className="profile-name" id="take-quiz-title">{quiz.title}</div>
          <div className="profile-email" id="take-quiz-description">{quiz.description}</div>

          <div className="row mt-5">
            {quiz.questions.map((question) => (
              <QuizQuestion
                key={question.id}
                question={question}
                onSelectAnswer={this.handleSelectAnswer}
              />
            ))}
          </div>
          <div className="row mt-4 mb-4">
            <div
              className="col-sm-12"
              style={{
                textAlign: "center",
              }}
            >
              <button className="tool-button" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default QuizTaker;
