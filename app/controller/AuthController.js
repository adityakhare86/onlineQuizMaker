const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

// database schema
const User = require("../model/User");
const Quizzer = require("../model/Quizzer");


const AuthController = {
  // validation schema
  registerUser: async (req, res, next) => {
    const registrationSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    try {
      // validating given data
      const { error } = registrationSchema.validate(req.body);
      if (error) return res.status(400).send("[validation error] Invalid data given.");

      // checking if already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) return res.status(400).send("User already exists");

      // create user
      const { name, email, password } = req.body;

      // hashing password
      const salt = bcrypt.genSaltSync();
      const hashedPass = bcrypt.hashSync(password, salt);

      const user = new User({
        name: name,
        email: email,
        password: hashedPass,
      });

      // save user
      const savedUser = await user.save();
      const { _id } = savedUser;

      const quizzerRegistrationSchema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      });
  
      const { error2 } = quizzerRegistrationSchema.validate({ _id, name, email });
      if (error2) {
        console.error("Quizzer couldn't be validated", error2);
        return res.status(408).send("Quizzer couldn't be validated");
      }
      try {
        const quizzer = new Quizzer({
          _id: _id,
          name: name,
          email: email,
        });
        const savedQuizzer = await quizzer.save();
        console.log("Quizzer saved successfully:", savedQuizzer);
      } catch (err) {
        console.error("Quizzer creation error: ", err);
        return res.status(409).send("Quizzer couldn't be created");
      }

      // send a successful response
      return res.status(201).send("user and quizzer created successfully");
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },

  loginUser: async (req, res, next) => {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    try {
      // validating given data
      const { error } = loginSchema.validate(req.body);
      if (error) return res.status(400).send("[validation error] Invalid Credentials.");

      // checking if does not exist
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("User does not exist!");

      // checking if password is valid
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send("Invalid Credentials!");

      // create and assign a jwt token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      const { _id, name, email } = user.toObject();
      return res.header("auth-token", token).status(200).send({ _id, name, email });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  },

  verifyToken: (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      return res.status(400).send("Invalid Token");
    }
  },
};

module.exports = AuthController;
