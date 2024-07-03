const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");
const QuizzerController = require("../controller/QuizzerController");

router.get("/", AuthController.verifyToken, (req, res, next) => {
  res.send("Hello From AUTH!");
});

// user login
router.post("/login", async (req, res, next) => {
  await AuthController.loginUser(req, res, next);
});

// register new user
router.post("/registration", async (req, res, next) => {
  const user = await AuthController.registerUser(req, res, next);
  if (user) {
    req.body = user;
    await QuizzerController.createQuizzer(req, res, next);
  }
});

module.exports = router;
