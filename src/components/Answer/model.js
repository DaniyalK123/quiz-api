const Sequelize = require("sequelize");
const db = require("../../config/database");

const AnswerSchema = {
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
  isCorrect: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
};
const Answer = db.sequelize.define("answer", AnswerSchema, {
  timestamps: false,
});
module.exports = Answer;
