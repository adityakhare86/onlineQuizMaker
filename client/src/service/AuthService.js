import axios from "axios";
require("dotenv").config();

const AuthService = {
  register: async (request) => {
    return await axios
      .post("https://quiz-craft-be.vercel.app"+"/api/v1/auth/registration", request)
      .then((response) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  },
  login: async (request) => {
    return await axios
      .post("https://quiz-craft-be.vercel.app"+"/api/v1/auth/login", request)
      .then((response) => {
        console.log(response);
        const authToken = response.headers["auth-token"];
        sessionStorage.setItem("quizcraft-authToken", authToken);
        return { ...response.data, authToken };
      })
      .catch((err) => {
        console.log("Error", err);
        return false;
      });
  },
  logout: (request) => {
    sessionStorage.clear();
  },
};

export default AuthService;
