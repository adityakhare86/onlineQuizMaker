import React from "react";
import QuizOption from "./QuizOption";

const QuizQuestion = (props) => {
  const handleSelectAnswer = (e) => {
    props.onSelectAnswer(props.question.id, parseInt(e.target.value));
  };

  const { question } = props;
  return (
        <div className="col-sm-10 quiz-question-container">
          <div className="profile-name">{question.title}</div>
            {question.options.map((option) => (
              <QuizOption key={option.id} id={option.id} value={option.value} />
            ))}
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
  );
};

export default QuizQuestion;
