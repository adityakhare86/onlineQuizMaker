import React, { Component } from "react";
import NavBar from "../Layout/NavBar";
import Question from "./Question";
import Emoji from "../Layout/Emoji";
import QuizService from "../../service/QuizService";
import { Redirect } from "react-router-dom";

class QuizBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      type: "AMATEUR",
      questions: [],
      errorMessage: "",  // add error message state
    };
  }

  handleResetAll = (e) => {
    this.setState({ title: "", description: "", type: "AMATEUR", questions: [], errorMessage: "" });
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value, errorMessage: "" });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value, errorMessage: "" });
  };

  handleAddQuestion = (e) => {
    const { questions } = this.state;
    const id = questions.length === 0 ? 0 : questions[questions.length - 1].id + 1;
    const title = "";
    const options = [];
    const answer = null;  // change default answer to null
    questions.push({ id, title, options, answer });
    this.setState({ questions: questions, errorMessage: "" });
  };

  copyQuestion = (question) => {
    const { id, title, answer } = question;
    const options = [...question.options];
    return { id, title, answer, options };
  };

  handleQuestionTitleChange = (id, value) => {
    const { questions } = this.state;
    const index = questions.findIndex((question) => question.id === id);
    questions[index].title = value;
    this.setState({ questions: questions, errorMessage: "" });
  };

  handleQuestionAnswerChange = (id, value) => {};

  handleRemoveQuestion = (id) => {
    const newQuestions = this.state.questions.filter(
      (question) => question.id !== id
    );
    this.setState({ questions: [...newQuestions], errorMessage: "" });
  };

  handleQuestionAddOption = (q_id) => {
    const { questions } = this.state;
    const index = questions.findIndex((question) => question.id === q_id);
    const question = { ...questions[index] };
    const { options } = question;
    const opt_id = options.length === 0 ? 0 : options[options.length - 1].id + 1;
    const option = { id: opt_id, value: "" };
    options.push(option);
    question.options = [...options];
    questions[index] = { ...question };
    this.setState({ questions: questions, errorMessage: "" });
  };

  handleOptionChange = (q_id, opt_id, value) => {
    const { questions } = this.state;
    const index = questions.findIndex((question) => question.id === q_id);
    const question = { ...questions[index] };
    const { options } = question;
    const option_index = options.findIndex((option) => option.id === opt_id);
    options[option_index].value = value;
    question.options = [...options];
    questions[index] = { ...question };
    this.setState({ questions: questions, errorMessage: "" });
  };

  handleRemoveOption = (q_id, opt_id) => {
    const { questions } = this.state;
    const index = questions.findIndex((question) => question.id === q_id);
    const question = { ...questions[index] };
    const { options } = question;
    const newOptions = [];
    let counter = 0;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.id === opt_id) continue;
      option.id = counter++;
      newOptions.push(option);
    }
    question.options = [...newOptions];
    questions[index] = { ...question };
    this.setState({ questions: questions, errorMessage: "" });
  };

  handleSelectAnswer = (q_id, opt_id) => {
    const { questions } = this.state;
    const index = questions.findIndex((question) => question.id === q_id);
    const question = { ...questions[index] };
    question.answer = opt_id;
    questions[index] = { ...question };
    this.setState({ questions: questions, errorMessage: "" });
  };

  handleSubmitQuiz = () => {
    const { questions } = this.state;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (question.options.length === 0) {
        this.setState({ errorMessage: `Question ${i + 1} has no options.` });
        return;
      }
      if (question.answer === null) {
        this.setState({ errorMessage: `Question ${i + 1} has no selected answer.` });
        return;
      }
    }

    QuizService.submit(this.state).then((response) => {
      if (response === false) {
        this.setState({ errorMessage: "Failed to submit the quiz." });
      } else {
        const { _id } = response;
        this.props.history.push({
          pathname: "/quiz-done",
          state: { quiz_id: _id },
        });
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
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-sm-8 offset-sm-2 section">
              <input
                className="profile-name"
                id="input-quiz-title"
                placeholder="Quiz Title"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              <input
                className="profile-email input-quiz-desc mt-1"
                placeholder="Click to add quiz description"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </div>
          </div>
          <div className="row mt-5">
            {this.state.questions.map((question) => (
              <Question
                key={question.id}
                question={question}
                onTitleChange={this.handleQuestionTitleChange}
                onRemove={this.handleRemoveQuestion}
                onAddOption={this.handleQuestionAddOption}
                onOptionChange={this.handleOptionChange}
                onOptionRemove={this.handleRemoveOption}
                onSelectAnswer={this.handleSelectAnswer}
              />
            ))}
          </div>

          {/* add quiz button  */}
          <div className="row mt-4 mb-4">
            <div
              className="col-sm-12"
              style={{
                textAlign: "center",
              }}
            >
              <button className="tool-button" id="add-question-button"
              onClick={this.handleAddQuestion}>
                <Emoji emoji="➕" /> Add Question
              </button>
              <button className="tool-button" id="reset-quiz-button"
              onClick={this.handleResetAll}>
                <Emoji emoji="❌" /> Reset Quiz
              </button>
              <button className="tool-button" onClick={this.handleSubmitQuiz}>
                <Emoji emoji="✔️" /> Submit Quiz
              </button>
            </div>
          </div>
          {this.state.errorMessage && (
            <div className="row mt-4">
              <div className="col-sm-8 offset-sm-2 alert alert-danger">
                {this.state.errorMessage}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default QuizBuilder;
