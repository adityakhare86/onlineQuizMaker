const Joi = require("@hapi/joi");

const Quizzer = require("../model/Quizzer");

const QuizzerController = {
  createQuizzer: async (req, res, next) => {
    console.log(req.body);
    const { _id, name, email } = req.body;
    const quizzerSchema = Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    });

    
    try {
      const { error } = quizzerSchema.validate({ _id, name, email });
      if (error) {
        throw new Error(error.details[0].message);
      }

      const quizzer = new Quizzer({
        _id,
        name,
        email,
      });

      const savedQuizzer = await quizzer.save();
      return res.status(200).send(savedQuizzer);
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("Quizzer creation failed.");
    }
  },

  get: async (req, res, next) => {
    try {
      console.log(req.param);
      const quizzer = await Quizzer.findOne({ _id: req.params.id });
      if (quizzer) {
        const {
          _id,
          name,
          email,
          quizCurated,
          quizAttended,
          quizFlawless,
        } = quizzer;

        return res.status(200).send({
          _id,
          name,
          email,
          quizCurated,
          quizAttended,
          quizFlawless,
        });
      }
      return res.status(400).send("Invalid data given.");
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("Invalid data given.");
    }
  },
  findAll: async (req, res, next) => {
    try {
      const quizzers = await Quizzer.find();
      return res.status(200).send(quizzers);
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("DB Query failed.");
    }
  },
  incrementCuratedCount: async (user_id) => {
    try {
      const quzzier = await Quizzer.findByIdAndUpdate(user_id, {
        $inc: { quizCurated: 1 },
      });
      return quzzier;
    } catch (err) {
      console.log("Error", err);
      return false;
    }
  },
  incrementParticipationCount: async (user_id, flawless) => {
    try {
      const quizzer = await Quizzer.findById(user_id);

      quizzer.quizAttended++;
      quizzer.quizFlawless += flawless; // + 0 or 1

      const updatedQuizzer = await Quizzer.findByIdAndUpdate(user_id, quizzer);
      // const result1 = await Quizzer.findByIdAndUpdate(user_id, {
      //   $inc: { quizAttended: 1 },
      // });
      // const result2 = await Quizzer.findByIdAndUpdate(user_id, {
      //   $inc: { quizFlawless: flawless },
      // });
      return updatedQuizzer;
    } catch (err) {
      console.log("Error", err);
      return false;
    }
  },
};
module.exports = QuizzerController;
