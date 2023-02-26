// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();
const server = require("./server");

// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign
PORT = process.env.PORT ? process.env.PORT : 8080;

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`); // eslint-disable-line no-console
});

module.exports = server;
