const Sequelize = require("sequelize");
const db = require("../../config/database");
const Question = require("../Question/model");
const Answer = require("../Answer/model");

const QuestionAttemptSchema = {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
};

const QuestionAttempt = db.sequelize.define(
  "questionAttempt",
  QuestionAttemptSchema,
  { timestamps: false }
);
QuestionAttempt.Question = QuestionAttempt.belongsTo(Question);
QuestionAttempt.Answer = QuestionAttempt.belongsTo(Answer);
module.exports = QuestionAttempt;
