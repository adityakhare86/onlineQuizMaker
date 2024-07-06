import React from "react";
import Emoji from "../Layout/Emoji";
import ToolTip from "./ToolTip";
import { Link } from "react-router-dom";

const Tools = (props) => {
  return (
    <div className={props.classes}>
      <div className="profile-name">{props.title}</div>
      <div className="profile-email">{props.subtitle}</div>
      <div className="row mt-4">
        <div className="card">
          <div className="tooltip-wrapper">
            <Link to="/quiz-builder">
              <button className="tool-button">
                <Emoji emoji="💀" /> Create Quiz
              </button>
            </Link>
            <ToolTip
              title="Create a new quiz!"
              description="Design and build a custom quiz for your audience."
            />
          </div>
        </div>
        <div className="card">
          <div className="tooltip-wrapper">
            <Link to="/quiz-fetcher">
              <button className="tool-button" id="attend-quiz-button">
                <Emoji emoji="⚔️" /> Attend Quiz
              </button>
            </Link>
            <ToolTip
              title="Test your knowledge!"
              description="You need to have a quiz code to be able to attend a quiz."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
