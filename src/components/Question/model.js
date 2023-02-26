const Sequelize = require("sequelize");
const db = require("../../config/database");
const Answer = require("../Answer/model");

const QuestionSchema = {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isMandatory: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

const Question = db.sequelize.define("question", QuestionSchema, {
  timestamps: false,
});
Question.Answer = Question.hasMany(Answer);
module.exports = Question;
