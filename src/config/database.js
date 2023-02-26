const Sequelize = require('sequelize');

const sequelize = new Sequelize("mysql://user1:password@localhost:3306/QuizDB");

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize
    .sync()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

module.exports = { sequelize };