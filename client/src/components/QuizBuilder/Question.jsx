import React from "react";
import Emoji from "../Layout/Emoji";
import Option from "./Option";

const Question = (props) => {
  const handleTitleChange = (e) => {
    props.onTitleChange(props.question.id, e.target.value);
  };

  const handleOptionChange = (opt_id, value) => {
    props.onOptionChange(props.question.id, opt_id, value);
  };

  const handleOptionRemove = (opt_id) => {
    props.onOptionRemove(props.question.id, opt_id);
  };

  const handleSelectAnswer = (e) => {
    props.onSelectAnswer(props.question.id, parseInt(e.target.value));
  };

  const { question } = props;
  return (
      <div className="question-container">
        <div className="question-and-select-answer-container">
          <input
            type="text"
            className="profile-name input-question-title"
            placeholder="Question ?"
            value={question.title}
            onChange={handleTitleChange}
          />
          {question.options.map((option) => (
            <Option
              key={option.id}
              id={option.id}
              value={option.value}
              onChange={handleOptionChange}
              onDelete={handleOptionRemove}
            />
          ))}
          <div className="select-answer-container">
            <label className="option-label">[Answer]</label>
            <select
              defaultValue=""
              className="option-dropdown"
              style={{
                width: "max-content",
                marginTop: ".2em",
                marginLeft: ".5em",
                color: "var(--quizcraft-bg-dark)",
              }}
              onChange={handleSelectAnswer}
              >
              <option value="" disabled hidden>
                Select Answer
              </option>
              {question.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.id + 1 + ": " + option.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="question-changes-container">
          <button
            className="remove-button"
            onClick={() => props.onRemove(question.id)}
          >
            <Emoji emoji="🗑️" /> Remove
          </button>
          <button
            className="add-button"
            onClick={() => props.onAddOption(question.id)}
          >
            <Emoji emoji="✔️" /> Add Option
          </button>
        </div>
      </div>
  );
};

export default Question;
