const express = require("express");
const { getSection } = require("./pkg/config");

const app = express();

// server startup
app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
