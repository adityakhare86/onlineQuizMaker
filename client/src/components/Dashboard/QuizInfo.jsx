import React, { useState } from "react";
import Emoji from "../Layout/Emoji";
import DateUtil from "../../Utils/DateUtil";

const QuizInfo = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.id).then(() => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000); 
    });
  };

  return (
    <React.Fragment>
      <tr style={{}}>
        <th
          scope="row"
          className="counterCell"
          style={{
            fontFamily: `"Lexend Deca", sans-serif`,
            fontSize: "14px",
            fontWeight: "bold",
          }}
        ></th>
        <td
          className="option-name"
          style={{
            fontFamily: `"Lexend Deca", sans-serif`,
            color: "var(--quizcraft-bg-dark)",
          }}
        >
          {props.title}
        </td>
        <td
          style={{
            fontFamily: `"Roboto", sans-serif`,
            color: "dimgray",
          }}
        >
          {DateUtil.getFormatedDateTime(props.date)}
        </td>
        <td
          className="option-dropdown"
          style={{ color: "var(--quizcraft-bg-dark" }}
        >
          {props.participated}
        </td>
        <td
          className="option-dropdown"
          style={{ color: "var(--quizcraft-bg-dark" }}
        >
          {props.flawless}
        </td>
        <td
          style={{
            fontFamily: `"Lexend Deca", sans-serif`,
            fontSize: "14px",
            fontWeight: "bold",
            position: "relative", 
          }}
        >
          <span
            style={{
              margin: "8px",
              cursor: "pointer", 
            }}
            onClick={copyToClipboard} 
          >
            <Emoji emoji="🧲" />
          </span>
          {props.id}
          {showPopup && (
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "black",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
              }}
            >
              Code copied to your clipboard.
            </div>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default QuizInfo;
