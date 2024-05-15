const express = require("express");
const { getSection } = require("./pkg/config");
require("./pkg/db");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home"); // ejs
});

// server startup
app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
