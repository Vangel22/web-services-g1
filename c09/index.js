const express = require("express");
const { getSection } = require("./pkg/config");
const { getForCity } = require("./handlers/weather");

const app = express();

app.get("/api/weather/:city", getForCity);

// server startup
app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
