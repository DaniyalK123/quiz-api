const Sequelize = require('sequelize');
const db = require('../../config/database');
const Question = require("../Question/model");

const QuizSchema = {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
  };
  
const Quiz = db.sequelize.define('quiz', QuizSchema);
Quiz.Question = Quiz.hasMany(Question)
module.exports = Quiz