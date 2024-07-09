import axios from "axios";
require("dotenv").config();

const QuizService = {
  getQuizzer: async (user_id, authToken) => { 
    return await axios
      .get("https://quiz-craft-be.vercel.app"+"/api/v1/quizzers/" + user_id, {
        headers: {
          "auth-token": authToken,
        },
      })
      .then((response) => {
        return { ...response.data };
      })
      .catch((err) => {
        console.log("Error throw by QuizService at getting Quizzer");
        console.log("Error", err);
        return false;
      });
  },
};

export default QuizService;
