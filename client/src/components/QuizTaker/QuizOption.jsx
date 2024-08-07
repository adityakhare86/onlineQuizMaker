import React from "react";

const QuizOption = (props) => {
  return (
    <div className="col-sm-12">
      <div className="row">
        <div className="col-sm-12">
          <div className="row option-section">
            <div className="card">
              <label className="option-label" id="give-quiz-option">{props.id + 1}</label>
            </div>
            <div className="card">
              <input
                className="option-input"
                id="quiz-question-option"
                type="text"
                value={props.value}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOption;
