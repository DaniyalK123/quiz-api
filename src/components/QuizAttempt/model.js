const Sequelize = require('sequelize');
const db = require('../../config/database');
const Quiz  = require('../Quiz/model');
const QuestionAttempt = require("../QuestionAttempt/model")

const QuizAttemptSchema = {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    totalMarks: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    obtainedMarks: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
  };
  
const QuizAttempt = db.sequelize.define('quizAttempt', QuizAttemptSchema);
QuizAttempt.Quiz = QuizAttempt.belongsTo(Quiz);
QuizAttempt.QuestionAttempt = QuizAttempt.hasMany(QuestionAttempt);
module.exports = QuizAttempt;