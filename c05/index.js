const express = require("express");
const { getSection } = require("./pkg/config");

const app = express();

// middlewares
app.use(express.json());

// routes -  GET, POST, PUT, PATCH, DELETE

// server startup
app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
