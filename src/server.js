const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./components/routes");
const { createResponse } = require("./utils");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors());

app.use("/api", routes);
app.get("*", function (req, res) {
  res.status(404).json(createResponse(false, "Not found", [404]));
});

module.exports = app;
